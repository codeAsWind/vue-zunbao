<template>
  <div class="integral">

    <div class="banner">
      <div class="header-wrapper">
        <user-info-component :isLogin="isLogin"></user-info-component>
        <winner-notice ref="winnerNotice" @getLotteryPrize="winnerNews" :isLogin="isLogin"></winner-notice>
        <luck-lottery
            @winnerNews="winnerNews"
            :allLuckyDrawPresent="allLuckyDrawPresent"
            :isLogin="isLogin">
        </luck-lottery>
      </div>
    </div>

    <!--商品列表-->
    <div class="goods-list-wrapper wrapper">
      <div class="tab">
            <span v-for="item in tabs" @click="selectItem(item)"
                  :class="{active:currentCategory===item.value}">{{item.text}}</span>
      </div>
      <div class="goods-title">
        <span>会员积分兑换值：</span>
        <div class="category-btn">
              <span v-for="item in values" :class="{active:currentPriceRage===item.value}"
                    @click="selectPriceRage(item)">{{item.text}}</span>
        </div>
      </div>

      <div class="goods-list" v-if="filterPointPresents.length">
        <div @click="goToDetailPage(item)" class="item" v-for="item in filterPointPresents">
          <div class="pic">
            <img v-lazy="item.imageUrl" alt="">
          </div>
          <div class="bottom">
            <p class="name">{{item.name}}</p>
            <p>现积分：<span class="red">{{item.vipSaveRange}}</span></p>
            <p v-if="item.range!==item.vipSaveRange" class="old">原积分：{{item.vipSaveRange}}</p>
          </div>
          <div class="mask">
            立即兑换
          </div>
        </div>
      </div>
      <no-result text="暂无结果" v-if="!filterPointPresents.length"></no-result>
    </div>

    <!--中奖喜讯弹框 - 手机领取-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhone"
        width="30%"
        :before-close="handleClose">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}}</span></h3>
        <div>手机号：<input maxlength="11" v-model="dialogData.userInput.phone" type="text"/></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('dialogVisiblePhone')">取 消</el-button>
          <el-button type="primary" @click="receivePhonePrize(dialogData.getPrize)">领 取</el-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 实物领取-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhysical"
        width="30%">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}} {{dialogData.getPrize.resultProperty}}</span></h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('dialogVisiblePhysical')">取 消</el-button>
          <el-button type="primary" @click="receivePrizePhysical(dialogData.getPrize)">领 取</el-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 优惠券-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleCoupon"
        width="30%">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.resultProperty}}</span> 请查看站内信</h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('dialogVisibleCoupon')">继续抽奖</el-button>
          <el-button type="primary" @click="receivePrizeCoupon(dialogData.getPrize)">去查看</el-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 彩金-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleMoney"
        width="30%">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}}</span> 请刷新余额查看</h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog('dialogVisibleMoney')">继续抽奖</el-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 其它-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleOther"
        width="30%">
      <div>
        <h3 class="red">很遗憾，大奖与您擦肩而过</h3>
        <p>大奖在后面，继续抽抽抽，我要抽到大奖出现！</p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog('dialogVisibleOther')">再抽一次</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import api from '@/api/integral'
  import userInfoComponent from './components/user-info/user-info'
  import winnerNotice from './components/winner-notice/winner-notice'
  import luckLottery from './components/luck-lottery/luck-lottery'
  import NoResult from '@/components/no-result/no-result'
  import {mapGetters} from 'vuex'
  import config from '@/common/js/config'
  import validtorReg from '@/common/js/validtor'

  export default {
    data() {
      return {
        // 所有抽奖奖品
        allLuckyDrawPresent: [],
        // 中奖弹框喜讯数据
        dialogData: {
          dialogVisiblePhone: false,
          dialogVisiblePhysical: false,
          dialogVisibleCoupon: false,
          dialogVisibleMoney: false,
          dialogVisibleOther: false,
          getPrize: {},
          userInput: {
            phone: ''
          }
        },
        // 所有兑换商品
        allPointsPresents: [],
        // 商品分类
        tabs: [
          {
            text: '彩金福利兑换',
            value: 'other'
          },
          {
            text: '礼品兑换',
            value: 'physical'
          }
        ],
        // 商品当前分类
        currentCategory: 'other',
        // 价格
        values: [
          {
            text: '全部',
            value: 0,
          },
          {
            text: '10000以上',
            value: 10000,
          },
          {
            text: '50000以上',
            value: 50000,
          },
          {
            text: '100000以上',
            value: 100000,
          }
        ],
        currentPriceRage: 0,
      }
    },
    computed: {
      filterPointPresents() {//条件过滤后的奖品
        return this.allPointsPresents.filter((item) => {
          return (this.currentCategory === 'physical' ? (item.type === this.currentCategory) : (item.type !== 'physical'))
            && (parseInt(item.vipSaveRange) >= this.currentPriceRage)
        })
      },
      ...mapGetters([
        'isLogin',
        'points'
      ])
    },
    created() {
      this._getAllLuckyDrawPresent()
      this._getAllPointsPresents()
    },
    methods: {
      // 去详情页
      goToDetailPage(item) {
        this.$router.push({
          path: '/integral/detail',
          query: {
            item: JSON.stringify(item)
          }
        })
      },
      //选择价格
      selectPriceRage(item) {
        this.currentPriceRage = item.value
      },
      // 商品分类
      selectItem(item) {
        this.currentCategory = item.value
      },
      //中奖弹框
      winnerNews(item) {
        this.dialogData.getPrize = item
        let {phoneFee, phoneData, physical, coupon, money,} = config.integral
        let {type} = item
        if (type === phoneFee || type === phoneData) {
          this.openDialog('dialogVisiblePhone')
        } else if (type === physical) {
          this.openDialog('dialogVisiblePhysical')
        } else if (type === coupon) {
          this.openDialog('dialogVisibleCoupon')
        } else if (type === money) {
          this.openDialog('dialogVisibleMoney')
        } else {
          this.openDialog('dialogVisibleOther')
        }

      },
      // 领取手机奖品
      receivePhonePrize(item) {
        let phone = this.dialogData.userInput.phone
        if (!validtorReg.phoneReg.test(phone)) {
          this.$message({
            type: 'warning',
            message: '手机格式有误'
          })
          return
        }
        let reqData = {
          json: JSON.stringify({
            id: item.id,
            phone
          }),
          token: '',
          addressId: ''
        }
        api.completeLuckyDrawRecord(reqData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.closeDialog('dialogVisiblePhone')
            let h = this.$createElement
            this.$msgbox({
              type: 'success',
              title: '温馨提示',
              message: h('div', null, [
                h('span', {style: 'color:red'}, item.name),
                h('span', null, ' 领取成功，请稍后在手机上查收')
              ])
            }).catch(e => e)
            if (item.obj) {
              //修改按钮状态为 已领取
              this.$refs.winnerNotice.updateData()
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      // 领取实物奖品
      receivePrizePhysical(item) {
        this.$router.push({
          path: '/integral/exchangePage',
          query: {
            itemData:JSON.stringify(item),
            comeFrom: 'luckyLottery'
          }
        })
        this.closeDialog('dialogVisiblePhysical')
      },
      //领取优惠券奖品
      receivePrizeCoupon() {
        this.$router.push('/user/letter')
        this.closeDialog('dialogVisibleCoupon')
      },
      openDialog(attr) {
        this.dialogData[attr] = true
      },
      closeDialog(attr) {
        this.dialogData[attr] = false
      },
      // 获取所有抽奖奖品
      _getAllLuckyDrawPresent() {
        api.getAllLuckyDrawPresent().then((res) => {
          if (this.ERR_OK === res.code) {
            this.allLuckyDrawPresent = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      // 获取所有商品
      _getAllPointsPresents() {
        api.getAllPointsPresents().then((res) => {
          if (this.ERR_OK === res.code) {
            this.allPointsPresents = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
    },
    components: {
      NoResult,
      winnerNotice,
      luckLottery,
      userInfoComponent,
    }
  }
</script>
<style lang="stylus" scoped src="./integral-index.styl"></style>