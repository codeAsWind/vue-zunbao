<template>
  <div class="help-self">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <m-list :list="list" @selectItem="selectItem"></m-list>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  const rootLink = '/mobile/help-self/'
  import MList from 'MComponents/m-list/m-list'

  export default {
    data() {
      return {
        headData: {
          title: '自助安全中心',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
        list: [
          {
            text: '忘记密码',
            id: 'forgetPwd',
            path: rootLink + 'forget-pwd'
          },
          {
            text: '忘记账号',
            id: 'forgetAccount',
            path: rootLink + 'forget-account'
          },
          {
            text: '解冻账号',
            id: 'unBindAccount',
            path: rootLink + 'unbind-account'
          },
          {
            text: '解绑银行卡',
            id: 'unBindCard',
            path: rootLink + 'unbind-card'
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/service')
      },
      selectItem(item) {
        this.$router.push({
          path: item.path
        })
      }
    },
    watch: {
      $route(to, from) {
        let title = to.meta.title
        if (title) {
          this.headData.title = title
        }
      }
    },
    components: {MList}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .help-self
    mobile-wrapper()
  .sub-page
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    padding 50px 10px 70px
    background #fff
</style>