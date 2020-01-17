<template>
  <div>
    <div class="input-group">
      <span class="label">选择平台</span>
      <div>
        <select v-model="selectedPlatform">
          <option value="">请选择平台</option>
          <option v-for="item in platformList" :value="item.value">{{item.text}}</option>
        </select>
      </div>
    </div>

    <div class="input-group">
      <span class="label">存送优惠类型</span>
      <div>
        <select v-model="selectedDiscountType" name="">
          <option v-for="item in discountTypeList" :value="item.id">{{item.aliasTitle}}</option>
        </select>
      </div>
    </div>

    <div class="input-group">
      <span class="label">转账金额</span>
      <div>
        <input v-model="amount" type="text">
      </div>
    </div>

    <div class="input-group">
      <span class="label">红利金额</span>
      <div>
        <input readonly disabled v-model="giftMoney" type="text">
      </div>
    </div>

    <div class="input-group">
      <span class="label">流水倍数</span>
      <div>
        <input readonly disabled v-model="betMultiples" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label"></span>
      <div>
        <el-button @click="getSelfYouHuiObject" type="danger">提交</el-button>
      </div>
    </div>
    <div class="tips">
      <h3>
        温馨提示：
      </h3>
      <p>
        1.每日00:00-01:00为系统结算时间，短时间内无法使用。<br>

        2.存送优惠申请后系统会自动发放到您相应的游戏平台，请登入并查看游戏。<br>

        3.请您确认您选择优惠的平台，执行优惠后将不可撤销！<br>

        4.老虎机钱包账户"支持QT、NT、PNG、SW、DT、MG、若要游玩以上平台请将额度转入老虎机钱包账户”即可
      </p>
    </div>
  </div>
</template>

<script>
  import api from '@/api/discount'
  import {unique} from '@/common/js/util'

  export default {
    data() {
      return {
        platformList: [
          {
            value: '6001',
            text: 'PT存送优惠'
          },
          {
            value: '6009',
            text: '老虎机钱包优惠'
          },
          {
            value: '6008',
            text: 'AG真人存送优惠'
          },
        ],//平台列表
        allDiscountTypeList: [],//所有存送优惠类型列表
        discountTypeList: [],//存送优惠类型列表
        selectedPlatform: '',//选择平台值
        amount: '',//金额
        giftMoney: '',//红利金额
        selectedDiscountType: '',//存送优惠值
        betMultiples: '',//流水
      }
    },
    computed: {},
    created() {
      this._getYouHuiConfig()
    },
    methods: {
      // 提交自助存送
      getSelfYouHuiObject() {
        if (!this.selectedPlatform) {
          this.$message({
            type: 'warning',
            message: '请选择存送优惠平台'
          })
          return
        }

        if (!this.selectedDiscountType) {
          this.$message({
            type: 'warning',
            message: '请选择存送优惠类型'
          })
          return
        }

        if (!this.amount) {
          this.$message({
            type: 'warning',
            message: '请输入金额'
          })
          return
        }
        if (this.discountTypeList.length) {
          let discountObj = this.discountTypeList.find((item) => {
            return item.id === this.selectedDiscountType
          })
          api.getSelfYouHuiObject({
            id: discountObj.id,
            titleId: discountObj.titleId,
            platformId: this.selectedPlatform,
            remit: this.giftMoney
          }).then((res) => {
            if (this.ERR_OK === res.code) {
              this.$message({
                type: 'info',
                message: res.data
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择存送优惠类型'
          })
        }

      },
      //获取所有存送优惠类型
      _getYouHuiConfig() {
        api.getYouHuiConfig().then((res) => {
          if (this.ERR_OK === res.code) {
            this.allDiscountTypeList = res.data
            this.platformList = this.allDiscountTypeList.map((item) => {
              return {
                value: item.platformId,
                text: item.platformName
              }
            })
            this.platformList = unique(this.platformList, 'value')
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
    },
    watch: {
      selectedPlatform(val) {
        this.discountTypeList = this.allDiscountTypeList.filter((item) => {
          return item.platformId === val
        })
        this.discountTypeList.length && (this.selectedDiscountType = this.discountTypeList[0].id)
      },
      selectedDiscountType() {
        if (this.discountTypeList.length) {
          //计算流水
          let discountObj = this.discountTypeList.find((item) => {
            return item.id === this.selectedDiscountType
          })
          this.betMultiples = discountObj.betMultiples
        }
      },
      amount(val) {
        if (!val) return
        if (this.discountTypeList.length) {
          //计算红利
          let discountObj = this.discountTypeList.find((item) => {
            return item.id === this.selectedDiscountType
          })
          this.giftMoney = (val * (discountObj.percent) > (discountObj.limitMoney) ? (discountObj.limitMoney) : val * (discountObj.percent)) || 0
          console.log(this.giftMoney)
        }
      }
    },
    components: {}

  }
</script>

<style lang="stylus" scoped>

</style>