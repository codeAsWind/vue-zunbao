<template>
  <div class="main-wrapper">
    <div class="banner">
      <!--奖池-->
      <div class="jackpot-wrapper">
        <div class="wrapper">
          <div class="item" v-for="item in jackpotList">
            <div>
              <p>
                <span class="symbol">CNY</span>
                <v-jackpot :options="item"></v-jackpot>
              </p>
              <p class="title">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper game-wrapper">
      <!--游戏平台列表-->
      <platform></platform>
      <div class="game-list-content">
        <!--搜索-->
        <div class="search-wrapper">
          <div class="search-box">
            <span class="label">搜索游戏：</span>
            <search-input @search="_searchInput"></search-input>
          </div>
          <el-button @click="getFavoriteGameList" type="primary">我的收藏</el-button>
        </div>
        <!--游戏类型-->
        <v-filter @search="_search"></v-filter>

      </div>
      <div class="game-list-wrapper">
        <game-list v-show="filterList.length" :filterList="filterList"></game-list>
        <no-result v-show="!filterList.length"></no-result>
      </div>
    </div>
  </div>
</template>

<script>
  import VJackpot from '@/components/v-jackpot/v-jackpot'
  import Platform from '@/components/platform/platform'
  import VFilter from '@/components/v-filter/v-filter'
  import SearchInput from '@/components/search-input/search-input'
  import GameList from '@/components/game-list/game-list'
  import NoResult from '@/components/no-result/no-result'

  import {gameLobby} from '@/common/js/mixin'

  export default {
    mixins:[gameLobby],
    components: {
      VJackpot,
      Platform,
      VFilter,
      SearchInput,
      GameList,
      NoResult
    }
  }
</script>

<style src="./game-lobby.styl" scoped lang="stylus"></style>
