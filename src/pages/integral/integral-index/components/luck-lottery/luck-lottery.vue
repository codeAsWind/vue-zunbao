<template>
  <div>
    <div class="lucky-lottery">
      <div class="lotto-box">
        <div class="lotto-item" :class="{active:idx === index}" v-for="(item,index) in allLuckyDrawPresent">
          <img v-lazy="item.imageUrl" alt="">
          <p>{{item.title}}</p>
        </div>
        <div @click="startLuckyDraw" class="lotto-item lotto-btn">
          <div>
            <h3>点击抽奖</h3>
            <p v-if="isLogin" style="font-size:16px">{{luckyDrawCostPonit}}分</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginDialog, property, queryPoints} from '@/common/js/mixin'
  import api from '@/api/integral'

  export default {
    mixins: [loginDialog, property, queryPoints],
    data() {
      return {
        luckyDrawCostPonit: 0,//积分消耗值
        canClick: true,//默认可点击
        timer: null,//启动游戏定时器
        endTimer: null,//游戏结束定时器
        confirmTimer: null,//确保视图正确定时器
        goodNewsTimer: null,//弹出喜讯定时器
        idx: 0//游戏起始位置
      }
    },
    props: {
      allLuckyDrawPresent: {
        type: Array,
        default: []
      },
      isLogin: {
        type: Boolean,
        default: false
      },
      points: {
        type: Number,
        default: 0
      }
    },
    computed: {
      //抽奖奖品id集合
      lottoList() {
        if (this.allLuckyDrawPresent.length) {
          return this.allLuckyDrawPresent.map((item) => {
            return item.id
          })
        }
      }
    },
    created() {
      this.mark = null
      this._luckyDrawCost()
    },
    methods: {
      startLuckyDraw() {
        // 是否登录
        if (!this.isLogin) {
          this.openLoginDialog()
          return
        }

        //首次点击
        if (!this.mark) {
          this.mark = true
          let h = this.$createElement
          this.$msgbox({
            title: '温馨提示',
            message: h('p', null, [
              h('span', null, '每次抽奖将消耗 '),
              h('span', {style: 'color:red'}, this.luckyDrawCostPonit),
              h('span', null, ' 积分')
            ])
          }).catch(e => e)
          return
        }

        //积分不够
        if (!this._canPlayLotto()) {
          let h = this.$createElement
          this.$msgbox({
            title: '温馨提示',
            message: h('p', null, '积分不够啦，快去充值赚积分吧'),
            confirmButtonText: '充值赚积分'
          }).then((action) => {
            if (action === 'confirm') {
              this.$router.push('/user/deposit')
            }
          }).catch(e => e)
          return
        }

        if (this.canClick) {
          this.canClick = false
          api.luckyDraw().then((res) => {
            if (this.ERR_OK === res.code) {
              //间隔时间 (不能取值50,dom渲染机制)
              let interval = 40
              //圈数
              let circleNum = 4
              //奖品数量
              let proNum = 8
              // 中奖列表
              let resultArray = []
              for (let i = 0; i < proNum; i++) {
                resultArray.push(interval * proNum * circleNum + i * interval)
              }
              //中奖结果索引
              let resultIdx = this.lottoList.indexOf(res.data.luckyDrawPresentId)
              //中奖结果
              let result = resultArray[resultIdx]
              //奖品类型
              let type = res.data.luckyDrawPresentType
              //奖品属性值转换
              let resultProperty = this._filterAttrVal(type, res.data.property)

              // 启动游戏
              this.timer = setInterval(() => {
                this.idx++
                if (this.idx === proNum) {
                  this.idx = 0
                }
              }, interval)

              //指定时间结束游戏
              this.endTimer = setTimeout(() => {
                // 游戏结束
                clearInterval(this.timer)
                //释放定时器
                this.endTimer = null
                //按钮状态恢复
                this.canClick = true

                // 弹出中奖喜讯
                this.goodNewsTimer = setTimeout(() => {
                  this._winnerNews(res.data.name, resultProperty, type, res.data.id, null, res.data.imgUrl)
                  //释放定时器
                  this.goodNewsTimer = null
                }, 500)
                // 确保视图正确
                this.confirmTimer = setTimeout(() => {
                  this.idx = resultIdx
                  this.confirmTimer = null
                }, interval)
                //更新积分
                this._queryPoints()
              }, result)
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
              this.canClick = true
            }
          })
        }
      },
      // 获取积分消耗
      _luckyDrawCost() {
        api.luckyDrawCost().then((res) => {
          if (this.ERR_OK === res.code) {
            this.luckyDrawCostPonit = parseInt(res.data.luckyDrawCost)
          }
        })
      },
      //是否可以抽奖
      _canPlayLotto() {
        return this.points > this.luckyDrawCostPonit
      },
      // 中奖喜讯弹框
      _winnerNews(name, resultProperty, type, id, obj, imageUrl) {
        this.$emit('winnerNews', {name, resultProperty, type, id, obj, imageUrl})
      }
    },
    watch: {
      isLogin(val){
        if(val){
          this._luckyDrawCost()
        }
      }
    },
    components: {}

  }
</script>

<style src="./luck-lottery.styl" lang="stylus" scoped>

</style>