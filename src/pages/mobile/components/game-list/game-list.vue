<template>
  <div class="game-list">
    <div class="item" v-for="item in filterList">
      <div class="pic">
        <img v-lazy="item.imageUrl" alt="">
        <div class="mask">
          <p class="zh-name">{{item.gameCName}}</p>
          <p class="favorite">
            <span @click="toggleFavorite(item)" v-html="getFavoriteIcon(item)"></span>
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="btn-group">
          <mt-button class="btn" size="small" v-if="item.gameStatus!=='2'" type="primary" @click="tryGame(item)">试玩游戏</mt-button>
          <mt-button class="btn" size="small" v-if="item.gameStatus!=='1'" type="danger" @click="playTrueGame(item)">进入游戏</mt-button>
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
      width 48.5%
      float: left
      margin 0 3% 15px 0
      background $color-light
      overflow hidden
      cursor pointer
      transition all .2s ease-in
      &:nth-of-type(2n)
        margin-right 0
      .pic
        height 118px
        position relative
        img
          width 100%
          height 100%
        .mask
          position absolute
          left 0
          bottom 0
          width 100%
          color $color-light
          line-height 30px
          background rgba(0, 0, 0, .7)
          display flex
          justify-content space-between
          padding 0 5px
          .zh-name
            width 54%
            no-wrap()

      .bottom
        padding 10px 0
        text-align center
        button
          display block
          margin 0 auto 10px
          &:last-child
            margin-bottom 0

</style>