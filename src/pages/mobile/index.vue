<template>
  <div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tab v-if="isShowMobileCommonModule"></tab>
    <login @closeDialog="closeLoginDialog" :isShowLoginDialog="isShowLoginDialog"></login>
    <loading v-show="loadingState"></loading>
  </div>
</template>
<script>
  import '@/common/js/mobile-extend'
  import loading from '@/components/loading/loading'
  import tab from 'MComponents/tab/tab'
  import login from '@/components/login/login'
  import {checkLogin, loginDialog} from '@/common/js/mixin'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [checkLogin, loginDialog],
    data() {
      return {
        transitionName: '',
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'loadingState', 'isShowMobileCommonModule', 'isShowLoginDialog'])
    },
    created() {
      this._setShowCommonModule(window.location.pathname)
    },
    methods: {
      _isShow(path) {
        return /\/mobile\/activity\/\w+/.test(path)
      },
      _setShowCommonModule(path) {
        if (this._isShow(path)) {
          this.SET_IS_SHOW_MOBILE_COMMON_MODULE(false)
        } else {
          this.SET_IS_SHOW_MOBILE_COMMON_MODULE(true)
        }
      },
      ...mapMutations([
        'SET_IS_SHOW_MOBILE_COMMON_MODULE'
      ])
    },
    watch: {
      '$route'(to, from) {
        this._setShowCommonModule(to.path)
      },
      isLogin(val) {
        if (val) {
          this.closeLoginDialog()
        }
      }
    },
    components: {
      loading,
      tab,
      login
    }
  }
</script>
<style lang="stylus" scoped></style>
