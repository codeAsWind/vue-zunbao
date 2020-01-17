<template>
  <div class="game-list">
    <div class="item" v-for="item in filterList">
      <div class="pic">
        <img v-lazy="item.imageUrl" alt="">
      </div>
      <div class="bottom">
        <p class="zh-name">{{item.gameCName}}</p>
        <p class="en-name">{{item.gameEName}}</p>
        <p class="favorite">
          <span @click="toggleFavorite(item)" v-html="getFavoriteIcon(item)"></span>
        </p>
        <div class="btn-group">
          <el-button v-if="item.gameStatus!=='2'" type="warning" @click="tryGame(item)">试玩游戏</el-button>
          <el-button v-if="item.gameStatus!=='1'" type="danger" @click="playTrueGame(item)">进入游戏</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {gameList} from '@/common/js/mixin'
  export default {
    mixins: [gameList],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .game-list
    clearfix()
    .item
      width 228px
      float: left
      margin 0 15px 15px 0
      padding 10px
      border 1px solid $color-border-gray
      background $color-light
      overflow hidden
      cursor pointer
      text-align center
      transition all .2s ease-in
      &:hover
        transform translate3d(0, -4px, 0)
      &:nth-of-type(5n)
        margin-right 0
      .zh-name
        no-wrap()
        font-size 16px
      .en-name
        no-wrap()
      img
        width 100%
        height 200px
      .bottom
        line-height 24px
        padding 10px 0
        background $-color-light-bg
      .favorite
        font-size 15px
        color $color-intersperse
      .btn-group
        display flex
        justify-content center
        margin-top 6px
      .el-button
        font-size 14px

</style>