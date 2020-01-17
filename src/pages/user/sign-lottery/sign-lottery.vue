<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <!--签到中心-->
      <div v-if="currentIdx===0">
        <div class="center">
          <el-button @click="doSignRecord" type="danger" :disabled="isSignToday">{{isSignToday?'已签到':'立即签到'}}</el-button>
          <span style="margin-left:10px">今日已领取 <span class="red">{{getSignAmount}}</span> 元</span></div>
        <div class="sign-wrapper">
          <sign :arrDate="arrDate"></sign>
        </div>
      </div>
      <!--签到说明-->
      <div v-if="currentIdx===1">
        <div class="table">
          <el-table
              stripe
              border
              :data="tableData"
              style="width: 100%">
            <el-table-column
                v-for="item in headList"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
          </el-table>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1、激活要求，单月达到存款要求后可以进行签到帐户转入游戏帐户。

            <br>2、所有签到奖金流水需要10倍。

            <br>3、签到金每次转入游戏帐户提款不得超过最大上限。

            <br>4、签到奖金每月最后一日的23:59:59秒自动清理，请及时进行游戏。

            <br>5、禁止套利行为，如有发现立即关闭帐户。

            <br>6、签到彩金需转入PT/老虎机钱包（DT、MG、QT、NT、PNG、SW），任一平台进行游戏。

            <br>7、转入游戏额度不能低于10元
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import sign from '@/components/sign/sign'
  import api from '@/api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '签到中心'
          },
          {
            text: '签到说明'
          },
        ],
        currentIdx: 0,
        headList: [
          {
            label: '等级',
            prop: 'level'
          },
          {
            label: '每日签到',
            prop: 'sign'
          },
          {
            label: '激活要求',
            prop: 'condition'
          },
          {
            label: '签到金最高提款',
            prop: 'maxMoney'
          }
        ],
        tableData: [
          {
            level: '普通会员',
            sign: '4元',
            condition: '240元',
            maxMoney: '588元',
          },
          {
            level: '青铜VIP',
            sign: '10元',
            condition: '600元',
            maxMoney: '3888元',
          },
          {
            level: '白银VIP',
            sign: '12元',
            condition: '700元',
            maxMoney: '5888元',
          },
          {
            level: '黄金VIP',
            sign: '14元',
            condition: '800元',
            maxMoney: '8888元',
          },
          {
            level: '白金VIP',
            sign: '16元',
            condition: '900元',
            maxMoney: '12888元',
          },
          {
            level: '钻石VIP',
            sign: '18元',
            condition: '1000元',
            maxMoney: '21888元',
          },
          {
            level: '王者VIP',
            sign: '20元',
            condition: '1200元',
            maxMoney: '38888元',
          },
        ],
        arrDate: [],
        isSignToday:false,
        getSignAmount:0
      }
    },
    computed: {
      ...mapGetters(['signAmount'])
    },
    created() {
      this._findSignrecord()
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
      doSignRecord(){
        api.doSignRecord().then((res)=>{
          if(this.ERR_OK === res.code){
            this.$message({
              type:'info',
              message:res.data
            })
            this._findSignrecord()
          }else{
            this.$message({
              type:'warning',
              message:res.message
            })
          }
        })
      },
      _findSignrecord() {
        api.findSignrecord({
          _: Math.random().toFixed(5)
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            let today = new Date().getDate()
            this.arrDate = res.data.map((item) => {
              let day = new Date(item.timeStr).getDate()
              if(day === today){//今日是否已签到
                this.isSignToday = true
                this.getSignAmount = item.amount
              }
              return day
            })
          }else{
            this.$message({
              type:'warning',
              message:res.message
            })
          }
        })
      }
    },
    watch: {
      signAmount(){
        this._findSignrecord()
      }
    },
    components: {tabTitle, sign}

  }
</script>

<style lang="stylus" scoped>
.sign-wrapper
  margin-top 20px
</style>