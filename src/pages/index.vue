<template>
  <div id="app">
    <v-header v-if="isShowCommonModule"></v-header>
    <transition name="">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <v-footer v-if="isShowCommonModule"></v-footer>
    <v-sidebar v-if="isShowCommonModule"></v-sidebar>
    <login @closeDialog="closeLoginDialog" :isShowLoginDialog="isShowLoginDialog"></login>
    <loading v-if="loadingState"></loading>
  </div>
</template>
<script>

  import '@/common/js/pc-extend'
  import VHeader from '@/components/v-header/v-header'
  import VFooter from '@/components/v-footer/v-footer'
  import VSidebar from '@/components/v-sidebar/v-sidebar'
  import login from '@/components/login/login'
  import loading from '@/components/loading/loading'
  import {checkLogin, loginDialog} from '@/common/js/mixin'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [checkLogin, loginDialog],
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'loadingState',
        'isShowCommonModule',
        'isShowLoginDialog'
      ])
    },
    created() {
      this._setShowCommonModule(window.location.pathname)
    },
    methods: {
      _isShow(path) {
        return path.includes('/activity') || path.includes('/404') || path.includes('/mobile')
      },
      _setShowCommonModule(path) {
        if (this._isShow(path)) {
          this.SET_IS_SHOW_COMMON_MODULE(false)
        } else {
          this.SET_IS_SHOW_COMMON_MODULE(true)
        }
      },
      ...mapMutations([
        'SET_IS_SHOW_COMMON_MODULE'
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
      VHeader,
      VFooter,
      VSidebar,
      loading,
      login
    }

  }
</script>
