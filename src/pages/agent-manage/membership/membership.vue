<template>
  <div>
    <tab-title :isRouter="true" :tab-title-list="tabTitleList"></tab-title>
    <div class="border-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'

  const rootLink = '/agent-manage/membership/'
  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '会员输赢',
            router: rootLink + 'searchagprofit'
          },
          {
            text: '会员存款',
            router: rootLink + 'searchsubuserProposal'
          },
          {
            text: '会员提款',
            router: rootLink + 'withdraw'
          },
          {
            text: '会员返水',
            router: rootLink + 'vipBackwater'
          },
          {
            text: '会员优惠',
            router: rootLink + 'vipPromo'
          }
        ],
      }
    },
    computed: {},
    created() {},
    methods: {},
    watch: {},
    components: {tabTitle}

  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .search-filter
    margin-bottom 20px
    .input-group .label + div
      margin 0
</style>