<template>
  <div>
    <v-header
        @closeDownload="closeDownload"
        @rightIconClick="openService"
        @leftIconClick="openMenu"
        :data="headData">
    </v-header>

    <div class="index-main" :class="{paddingTop:headData.download}">
      <!--banner-->
      <banner :bannerList="bannerList"></banner>

      <!--公告-->
      <notice></notice>

      <!--登录注册已登录状态按钮等-->
      <btn-group :isLogin="isLogin"></btn-group>

      <!--网页版游戏-->
      <index-game></index-game>
    </div>

    <!--菜单-->
    <v-menu @closeMenu="closeMenu" :isShow="isShow"></v-menu>
  </div>
</template>

<script>
  import api from '@/api/index'
  import VMenu from 'MComponents/menu/menu'
  import notice from './notice/notice'
  import btnGroup from './btn-group/btn-group'
  import indexGame from './index-game/index-game'
  import banner from './banner/banner'
  import {menu} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [menu],
    data() {
      return {
        headData: {
          title: '',
          leftIcon: 'menu',
          rightIcon: 'kefu1',
          logo: require('@/common/image/newlogo.png'),
          download: true
        },
        bannerList: [],
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
      this._getBannerItems() //加载banner
    },
    methods: {
      // 关闭下载提示
      closeDownload() {
        this.headData.download = false
      },
      // 打开客服
      openService() {
        this.$router.push('/mobile/service')
      },
      // 获取banner
      _getBannerItems() {
        api.getBannerData().then((res) => {
          if (res.code === this.ERR_OK) {
            this.bannerList = res.data
          }
        })
      },

    },
    components: {
      VMenu, notice, btnGroup, indexGame, banner
    }
  }
</script>

<style lang="stylus" src="./index.styl" scoped>


</style>