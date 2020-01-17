<template>
  <div>
    <div class="input-group">
      <span class="label">会员等级</span>
      <div>
        <input readonly disabled :value="userInfo.level | level" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label">筹码金额</span>
      <div>
        <input readonly disabled v-model="amount" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label"></span>
      <div>
        <el-button @click="applyActivity" type="danger">立即领取</el-button>
      </div>
    </div>

    <div class="tips">
      <h3>
        温馨提示：
      </h3>
      <p>
        1.忠实会员及以上会员，每月可领取一次VIP免费筹码。

        <br>2.免费筹码以您领取时的VIP等级来进行派发。

        <br>3.免费筹码领取后，直接添加到尊宝主帐户。

        <br>4.免费筹码无需流水即可提款。

        <br>5.领取过程中有任何疑问，请咨询24小时在线客服。

        <br>6.会员当月未收到免费筹码，需要在一个月内找在线客服申请，例:2月未收到需要在3月31日23:59:59前申请，逾时视同放弃
      </p>
    </div>

  </div>
</template>

<script>
  import api from '@/api/discount'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        amount: 0
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      this._checkActivityInfo()
    },
    methods: {
      //领取筹码
      applyActivity() {
        api.applyActivity({
          titleId: 'vipmonthfree',
          platform: '',
          entrance: 'pc',
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
      },
      //查询筹码
      _checkActivityInfo() {
        api.checkActivityInfo({titleId: 'vipmonthfree'}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.amount = res.data.amount
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>

</style>