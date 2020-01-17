<template>
  <div class="game-type wrapper">
    <router-link to="/slots/pt">PT 老虎机</router-link>
    <router-link to="/slots/dt">DT 老虎机</router-link>
    <router-link to="/slots/sw">SW 老虎机</router-link>
    <router-link to="/slots/mg">MG 老虎机</router-link>
    <router-link to="/slots/qt">QT 老虎机</router-link>
    <router-link to="/slots/png">PNG 老虎机</router-link>
    <router-link to="/slots/nt">NT 老虎机</router-link>
    <a @click="playGame(apiGame.bbinLogin,{gameKind:'game',gameCode:'',mode:'pc'})" href="javascript:;">
      BBIN 老虎机
    </a>

  </div>
</template>

<script>
  import apiGame from '@/api/game'
  import {playGame} from '@/common/js/mixin'

  export default {
    mixins: [playGame],
    data() {
      return {
        apiGame
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .game-type
    background $color-light
    border-bottom 1px solid $color-border-gray
    display flex
    a
      flex 1
      line-height 60px
      text-align center
      transition all .1s ease-in
      border-bottom 2px solid transparent
      &.active,&:hover
        font-weight 600
        color $color-primary
        border-bottom 2px solid $color-primary

</style>