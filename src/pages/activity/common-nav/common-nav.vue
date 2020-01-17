<template>
  <div class="common-nav">
    <div class="wrapper">
      <router-link class="logo" to="/">
        <img :src="logo" alt="">
      </router-link>
      <div class="right-wrapper">
        <div class="menu-list">
          <a v-if="_isHttpUrl(item.path)" v-for="item in menuList" :href="item.path" target="_blank">{{item.text}}</a>
          <router-link v-if="!_isHttpUrl(item.path)" v-for="item in menuList" :to="{path:item.path}">{{item.text}}</router-link>
          <el-button v-if="!isLogin" type="warning" @click="openLoginDialog">登录</el-button>
          <el-button v-if="isLogin" type="warning" @click="logOut">退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {logOut,loginDialog} from '@/common/js/mixin'
  export default {
    mixins:[logOut,loginDialog],
    data() {
      return {
        logo: require('@/common/image/newlogo.png'),
        menuList: [
          {
            text: '久安钱包',
            path: '/activity/jiu-an'
          },
          {
            text: '尊宝电影院',
            path: '/activity/movie'
          },
          {
            text: '签到送彩金',
            path: '/activity/upgrade'
          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    created() {
    },
    methods: {
      _isHttpUrl(string) {
        return /^http/.test(string)
      },

    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .common-nav
    height 100px
    background #1c1c1c
    line-height 100px
    .wrapper
      clearfix()
      .logo
        float left
      .right-wrapper
        float right
      .menu-list
        a
          color $color-light
          font-size 16px
          padding 0 30px
          margin 0 20px
          display block
          float left
          transition all .3s ease-in
          &:hover,&.active
            color $color-intersperse

</style>