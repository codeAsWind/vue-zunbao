<template>
  <div class="main-wrapper">
    <div class="wrapper user-wrapper">
      <user-header></user-header>
      <v-wrapper>
        <div slot="tab-wrapper">
          <tab-menu-router :menuList="menuList"></tab-menu-router>
        </div>
        <div slot="right-wrapper">
          <div class="content-wrapper">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </v-wrapper>

    </div>
  </div>
</template>

<script>
  import userHeader from './user-header/user-header'
  import VWrapper from '@/components/wrapper/wrapper'
  import TabMenuRouter from '@/components/tab-menu-router/tab-menu-router'
  import {mapGetters} from 'vuex'

  const rootRouter = '/user/'
  export default {
    data() {
      return {
        menuList: [
          {
            text: '个人中心',
            router: rootRouter + 'user-center',
            icon: 'xiazai'
          },
          {
            text: '充值',
            router: rootRouter + 'deposit',
            icon: 'chongzhi0101',
            // backgroundColor:'#f56c6c'
          },
          {
            text: '提款',
            router: rootRouter + 'withdraw',
            icon: 'icon-test',
            // backgroundColor:'#ef8934'
          },
          {
            text: '转账',
            router: rootRouter + 'transform',
            icon: 'zhuanzhang',
            // backgroundColor:'#67c23a'
          },
          {
            text: '自助优惠',
            router: rootRouter + 'discounts',
            icon: 'zizhu'
          },
          {
            text: 'APP彩金',
            router: rootRouter + 'app-handsel',
            icon: 'jinbi'
          },
          {
            text: '红包转账',
            router: rootRouter + 'redPacket-transform',
            icon: 'tuikuan'
          },
          {
            text: '账户设置',
            router: rootRouter + 'account-settings',
            icon: 'shezhi'
          },
          {
            text: '签到有奖',
            router: rootRouter + 'sign-lottery',
            icon: 'qiandao'
          },
          {
            text: '账户清单',
            router: rootRouter + 'account-list',
            icon: 'qingdan1'
          },
          {
            text: '站内信',
            router: rootRouter + 'letter',
            icon: 'youxiang'
          },
        ],
        currentIdx: 0
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
      if (!this.isLogin) {
        this.$router.push('/index')
      }
    },
    methods: {},
    watch: {
      isLogin(val) {
        if (!val) {
          this.$router.push('/index')
        }
      }
    },
    components: {
      userHeader,
      VWrapper,
      TabMenuRouter,
    }
  }
</script>

<style src="./user.styl" lang="stylus"></style>
