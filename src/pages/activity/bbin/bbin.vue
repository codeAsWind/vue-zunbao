<template>
  <div class="bbin">
    <common-nav></common-nav>
    <div class="main">
      <p class="go-bbin">
        <game-api :factoryFun="api.bbinLogin" :reqData="reqData"></game-api>
      </p>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import gameApi from '@/components/game-api/game-api'
  import api from '@/api/game'

  export default {
    data() {
      return {
        api,
        reqData:{
          gameKind:'live',
          mode:'pc',
          gameCode:''
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {commonNav, commonFooter,gameApi}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .bbin
    .main
      height 1905px
      background url('./img/bbin.jpg') no-repeat center top
    .go-bbin
      max-width 1912px
      width 100%
      margin 0 auto
      clearfix()
      span
        cursor pointer
        display block
        width 300px
        height 70px
        margin 550px 0 0 53.5%

</style>