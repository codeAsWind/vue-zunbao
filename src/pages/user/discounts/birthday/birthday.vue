<template>
  <div>
    <div class="input-group">
      <span class="label">会员生日</span>
      <div>
        <router-link  v-if="!userInfo.birthday" to="/user/account-settings">
          <el-button type="primary">去完善资料</el-button>
        </router-link>
        <input v-if="userInfo.birthday" readonly disabled :value="userInfo.birthday | Date('yyyy-MM-dd')" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label">会员等级</span>
      <div>
        <input readonly disabled :value="userInfo.level | level" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label">生日礼金</span>
      <div>
        <input readonly disabled v-model="amount" type="text">
      </div>
    </div>

    <div class="input-group">
      <span class="label"></span>
      <div>
        <el-button :disabled="!userInfo.birthday" @click="birthdayActivityInfo" type="danger">立即领取</el-button>
      </div>
    </div>

    <div class="tips">
      <h3>
        温馨提示：
      </h3>
      <p>
        1.请注意每年您生日的前后三天可以进行自助领取礼金，例如5月12日生日，可在5月9-15日领取，逾期无法进行补发。

        <br>2.生日礼金无需流水直接派发至您的主账户里。

        <br>3.若有任何疑问请咨询在线客服。
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
        amount: '',
        id: '',
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      this._checkBirthday()
    },
    methods: {
      birthdayActivityInfo() {
        api.birthdayActivityInfo({id: this.id}).then((res) => {
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
      _checkBirthday() {
        api.checkBirthday().then((res) => {
          if (this.ERR_OK === res.code) {
            if (res.data.id) {
              this.id = res.data.id
              this.amount = res.data.amount
            } else {
              this.$message({
                type: 'info',
                message: res.data
              })
            }
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