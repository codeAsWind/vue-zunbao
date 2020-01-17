<template>
  <div class="agent-manage-wrapper wrapper">
    <div class="banner"></div>
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
</template>

<script>
  import VWrapper from '@/components/wrapper/wrapper'
  import TabMenuRouter from '@/components/tab-menu-router/tab-menu-router'
  import {mapGetters} from 'vuex'

  const rootRouter = '/agent-manage/'
  export default {
    data() {
      return {
        rootRouter: '',
        menuList: [
          {
            text: '代理中心',
            router: rootRouter + 'agent-center',
            icon: 'zhaoshangdaili'
          },
          {
            text: '日结佣金',
            router: rootRouter + 'day-commission',
            icon: 'jinbi'
          },
          {
            text: '会员账务',
            router: rootRouter + 'membership',
            icon: 'qingdan1'
          },
          {
            text: '额度记录',
            router: rootRouter + 'quota',
            icon: 'declare'
          },
          {
            text: '下线会员',
            router: rootRouter + 'offline-members',
            icon: 'zhaoshangdaili'
          },
          {
            text: '申请提款',
            router: rootRouter + 'withdrawal',
            icon: 'icon-test'
          },
          {
            text: '账户设置',
            router: rootRouter + 'account-settings',
            icon: 'shezhi'
          },
          {
            text: '站内信',
            router: rootRouter + 'letter',
            icon: 'youxiang'
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['isAgent'])
    },
    created() {
      if (!this.isAgent) {
        this.$router.push('/index')
      }
    },
    methods: {},
    watch: {
      isAgent(val) {
        if (!val) {
          this.$router.push('/index')
        }
      }
    },
    components: {VWrapper, TabMenuRouter}

  }
</script>

<style lang="stylus" scoped>
  .banner
    height 120px
    background url(./agentManage.png) no-repeat center
    margin-top 20px
</style>