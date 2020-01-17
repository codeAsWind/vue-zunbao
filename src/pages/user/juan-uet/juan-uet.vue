<template>
  <div class="input-group">
    <span class="label">
      我的UET金额
    </span>
    <div class="jiuAn-wallet">
      <h3>
        <span class="red">{{uetAmount}}</span>
        <span class="margin">UET</span>
        <i class="iconfont icon-shuaxin refresh" @click="refresh"></i>
        <a @click="redirectUrl(mode)" class="red" href="javascript:;" target="_blank">点击快速买币 <span class="link">(交易送币)</span></a>
      </h3>
    </div>
  </div>
</template>

<script>
  import api from '@/api/user'
  import {mapGetters, mapMutations} from 'vuex'
  import {getUserBalance,redirectUrl} from '@/common/js/mixin'

  export default {
    mixins: [getUserBalance,redirectUrl],
    data() {
      return {}
    },
    props: {
      mode: {
        type: Number,
        default: 1,
      }
    },
    computed: {
      ...mapGetters([
        'juanTokenData', 'uetAmount'
      ])
    },
    created() {
      this.getUserBalance()
      this._getUserToken()
    },
    methods: {
      refresh() {
        this.getUserBalance()
      },
      //获取久安二维码
      _getUserToken() {
        api.getUserToken().then((res) => {
          if (this.ERR_OK_OTHER === res.code) {
            let juanTokenData = {
              qrCode: res.data.qrCode
            }
            this.SET_JUAN_DATA(juanTokenData)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      ...mapMutations([
        'SET_JUAN_DATA', 'SET_UET_AMOUNT'
      ])
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  .refresh
    cursor pointer
</style>