<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div style="margin-top:20px" class="tab-content">
      <!--存送优惠券-->
      <div v-if="currentIdx ===0">
        <div class="input-group">
          <span class="label">尊宝账户</span>
          <div>
            <select v-model="coupon.couponType">
              <option value="">请选择账户</option>
              <option v-for="item in platformList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <span class="label">转账金额</span>
          <div>
            <input v-model="coupon.couponRemit" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">存送优惠券代码</span>
          <div>
            <input v-model="coupon.couponCode" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="transferInforCoupon" type="danger">提交</el-button>
          </div>
        </div>

        <div class="tips">
          <h3>存送优惠券说明：</h3>
          <p>
            1.不限平台使用，请选择正确的游戏平台填写优惠代码，确认提交，红利金额会自动添加到您指定的游戏平台里。

            <br>2.PT/PNG/QT/NT/DT/MG/SW平台存送优惠券，QT/NT/PNG/DT/MG/SW请转入老虎机钱包游戏，需要游戏帐户低于5元才能使用存送优惠券，达到相应的有效投注额要求或老虎机游戏帐户低于5元，才能再次进行相应老虎机平台户内转帐。

            <br>3.存送优惠券有效期为30天，请您在有效期内进行使用。

            <br>4.如何得到存送优惠券，请留意尊宝国际最新的相关优惠信息。

            <br>5.优惠卷会以邮件的方式发至您的站内信。
          </p>
        </div>

      </div>

      <!--红包优惠券-->
      <div v-if="currentIdx ===1">
        <div class="input-group">
          <span class="label">尊宝账户</span>
          <div>
            <select v-model="redCoupon.couponType">
              <option value="">请选择账户</option>
              <option v-for="item in platformList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <span class="label">优惠代码</span>
          <div>
            <input v-model="redCoupon.couponCode" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="transferInforRedCoupon" type="danger">提交</el-button>
          </div>
        </div>

        <div class="tips">
          <h3>存送优惠券说明：</h3>
          <p>
            1.PT/PNG/QT/NT/DT/MG/SW平台红包优惠券，QT/NT/PNG/DT/MG/SW请转入老虎机钱包游戏，需要游戏帐户低于5元才能使用

            <br>2.使用红包优惠券无需进行存款，优惠券有相应的流水倍数，须达到限定投注额或是账户小于五元，才可进行户内转账。
            <br>3.不限平台使用，请选择正确的游戏平台填写优惠代码，确认提交，红利金额会自动添加到您指定的游戏平台里。

            <br>4.PT/PNG/QT/NT/DT/MG/SW平台存送优惠券，QT/NT/PNG/DT/MG/SW请转入老虎机钱包游戏，需要游戏帐户低于5元才能使用存送优惠券，达到相应的有效投注额要求或老虎机游戏帐户低于5元，才能再次进行相应老虎机平台户内转帐。

            <br>5.存送优惠券有效期为30天，请您在有效期内进行使用。

            <br>6.如何得到存送优惠券，请留意尊宝国际最新的相关优惠信息。

            <br>7.优惠卷会以邮件的方式发至您的站内信。
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import api from '@/api/discount'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '存送优惠券'
          },
          {
            text: '红包优惠券'
          }
        ],
        currentIdx: 0,
        platformList: [
          {
            text: 'PT账户',
            value: 'pt'
          },
          {
            text: '老虎机钱包账户',
            value: 'slot'
          },
          {
            text: 'AGIN账户',
            value: 'agin'
          },
        ],
        coupon: {
          couponType: '',
          couponRemit: '',
          couponCode: '',
        },
        redCoupon: {
          couponType: '',
          couponCode: ''
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
      //存送优惠券
      transferInforCoupon() {
        let {couponType, couponRemit, couponCode} = this.coupon
        if (!couponType) {
          this.$message({
            type: 'warning',
            message: '请选择账户'
          })
          return
        }
        if (!couponRemit) {
          this.$message({
            type: 'warning',
            message: '请输入转账金额'
          })
          return
        }
        if (!couponCode) {
          this.$message({
            type: 'warning',
            message: '请输入优惠券代码'
          })
          return
        }
        api.transferInforCoupon(this.coupon).then((res) => {
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
      //红包优惠券
      transferInforRedCoupon() {
        let {couponType, couponCode} = this.redCoupon
        if (!couponType) {
          this.$message({
            type: 'warning',
            message: '请选择账户'
          })
          return
        }
        if (!couponCode) {
          this.$message({
            type: 'warning',
            message: '请输入优惠券代码'
          })
          return
        }
        api.transferInforRedCoupon(this.redCoupon).then((res) => {
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
      selectItem(idx) {
        this.currentIdx = idx
      },

    },
    watch: {},
    components: {
      tabTitle
    }

  }
</script>

<style lang="stylus" scoped>

</style>