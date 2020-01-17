<template>
  <div class="sports">
    <div class="banner">
      <img class="gif" src="./img/r-t-gif.gif" alt="">
      <div class="sports-wrapper wrapper">
        <div class="item" v-for="item in itemList">
          <img :src="item.img" alt="">
          <div class="mask">
            <game-api :factoryFun="item.api" :reqData="item.reqData">
              <el-button type="warning">立即投注</el-button>
            </game-api>
          </div>
        </div>
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
            img: require('./img/s-p-sb.png'),
            title: '沙巴体育',
            api: apiGame.sbLogin,
          },
          {
            img: require('./img/s-p-pb.png'),
            title: '平博体育',
            api: apiGame.PBUserLogin,
          },
          {
            img: require('./img/s-p-im.png'),
            title: 'IM体育',
            api: apiGame.imLogin,
          },
          {
            img: require('./img/s-p-fy.png'),
            title: '泛亚电竞',
            api: apiGame.fanyaLogin,
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      toggleImage() {
        this.isShowImage = !this.isShowImage
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
  .banner
    height 1000px
    background url(./img/r-t-bg.jpg) no-repeat center
    clearfix()
    text-align center
    .gif
      margin-top 430px
  .sports-wrapper
    margin 70px auto 0
    .item
      float left
      margin 0 15px 15px 0
      width 270px
      height 370px
      position relative
      overflow hidden
      cursor pointer
      img
        width 100%
      .bottom
        position absolute
        bottom 0
        left 0
        width 100%
        background rgba(0,0,0,.7)
        height 100px
        line-height 100px
        color $color-light
        text-align center
        font-size 20px
      .mask
        position absolute
        bottom 0
        left 0
        width 100%
        height 100%
        background rgba(0,0,0,.7)
        display flex
        align-items center
        justify-content center
        transition all .3s ease-in
        opacity 0
        button
          font-size 16px
      &:hover .mask
        opacity 1


</style>