<template>
  <div class="game-lobby">
    <v-header :data="headData" @leftIconClick="commonBack" @rightIconClick="openMenu"></v-header>

    <div class="wrapper">
      <div class="search-input-wrapper">
        <search-input width="100%" @search="_searchInput"></search-input>
      </div>
      <div class="jackpot-wrapper">
        <v-jackpot :options="jackpotList[1]"></v-jackpot>
      </div>

      <!--游戏列表-->
      <div class="game-list-wrapper">
        <game-list v-show="filterList.length" :filterList="filterList"></game-list>
        <no-result v-show="!filterList.length"></no-result>
      </div>
    </div>

    <game-menu @search="_search" @closeMenu="closeMenu" :isShow="isShow"></game-menu>

  </div>
</template>

<script>
  import VJackpot from '@/components/v-jackpot/v-jackpot'
  import SearchInput from '@/components/search-input/search-input'
  import GameList from 'MComponents/game-list/game-list'
  import NoResult from '@/components/no-result/no-result'
  import GameMenu from 'MComponents/game-menu/game-menu'
  import {commonBack, gameLobby, menu} from '@/common/js/mixin'

  export default {
    mixins: [commonBack, gameLobby, menu],
    data() {
      return {
        headData: {
          title: '游戏大厅',
          leftIcon: 'arrowr',
          rightIcon: 'filter'
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      }
    },
    watch: {},
    components: {VJackpot, SearchInput, NoResult, GameList, GameMenu}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .game-lobby
    background #eee
    min-height 90vh
    mobile-wrapper()
    clearfix()
    .wrapper
      margin-top 74px
    .search-input-wrapper
      padding 10px
      position fixed
      z-index 99
      top 50px
      left 0
      width 100%
      background rgba(0,0,0,.7)
    .jackpot-wrapper
      margin-top 10px
      height 40px
      background: url(./img/dt-jatbg.png) no-repeat
      background-size: cover
      line-height 40px
      padding-left 20%
      border-radius 20px
    .game-list-wrapper
      margin-top 20px

</style>