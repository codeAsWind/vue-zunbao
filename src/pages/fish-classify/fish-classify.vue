<template>
  <div class="fish">
    <div class="item-list">
      <div class="item" v-for="item in itemList">
        <div class="pic">
          <img :src="item.img" alt="">
        </div>
        <game-api :factoryFun="item.api" :reqData="item.reqData" class="el-button el-button--primary is-plain is-round">
          开始游戏
        </game-api>
        <p>
          <router-link v-if="!_isHttpUrl(item.path)" class="el-button el-button--primary is-plain is-round"
                       :to="{path:item.path}">下载手机客户端
          </router-link>
          <a class="el-button el-button--primary is-plain is-round" v-if="_isHttpUrl(item.path)" :href="item.path">下载手机客户端</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import apiGame from '@/api/game'
  import gameApi from '@/components/game-api/game-api'
  export default {
    data() {
      return {
        itemList: [
          {
            img: require('./img/aglogo.png'),
            api: apiGame.gameAginBuyuRedirect,
            path: '/index'
          },
          {
            img: require('./img/wmlogo.png'),
            api: apiGame.mwgLogin,
            path: 'https://www.666wins.com/as-lobby/mob/qrcode1_cn.html',
            reqData: {gameCode: 1051}
          },
          {
            img: require('./img/swlogo.png'),
            api: apiGame.gameLoginPtSky,
            path: '/index',
            reqData: {gameCode: 'sw_fufish_intw',mode:'real',lobby:'/fish-classify'}
          }
        ]
      }
    },
    methods: {
      _isHttpUrl(string) {
        return /^http/.test(string)
      }
    },
    components: {
      gameApi
    }

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .fish
    height 800px
    background: url(./img/fishbanner.jpg) no-repeat center top
    clearfix()
    .item-list
      width 790px
      margin 400px auto 100px
    .item
      float left
      margin-right 80px
      &:last-child
        margin-right 0
      .pic
        width 210px
        height 210px
        background url(./img/paopao.png)
        background-size cover
        display flex
        align-items center
        justify-content center
        img
          animation: a-float 2.4s linear infinite
      .el-button
        display block
        font-size 16px
        background rgba(255, 255, 255, .1)
        color $color-light
        margin-top 30px
        &:hover
          background transparent

  @keyframes a-float {
    0%, 100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(10%);
    }
    75% {
      transform: translateY(-10%);
    }
  }
</style>