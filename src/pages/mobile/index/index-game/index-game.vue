<template>
  <div>
    <div class="game-wrapper">
      <div class="game-title">
        <i class="iconfont icon-laohuji"></i>
        <span>网页版游戏</span>
      </div>

      <div class="game-tab">
        <span :class="{active:currentType === item.type}" @click="selectItem(item)"
              v-for="(item) in tabList">{{item.text}}</span>
      </div>

      <div class="game-list">
        <div @click="allPlayGame(item)" class="item" v-for="item in filterList">
          <div class="pic">
            <img v-lazy="item.src" alt="">
          </div>
          <p>{{item.text}}</p>
        </div>
      </div>

      <!--下载中心-->
      <div class="game-title download-title">
        <i class="iconfont icon-xiazai1"></i>
        <span>下载中心</span>
      </div>

      <div class="game-list download-list">
        <div @click="download(item)" class="item" v-for="item in downloadList">
          <div class="pic">
            <img v-lazy="item.src" alt="">
          </div>
          <p>{{item.text}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  const TYPES = {
    slot: 'slot',
    fishPoker: 'fishPoker',
    real: 'real'
  }
  import apiGame from '@/api/game'
  import {playGame} from '@/common/js/mixin'
  import {getMobilePlatform} from '@/common/js/util'

  export default {
    mixins: [playGame],
    data() {
      return {
        tabList: [
          {
            text: '老虎机游戏',
            type: TYPES.slot
          },
          {
            text: '捕鱼&棋牌',
            type: TYPES.fishPoker
          },
          {
            text: '真人体育彩票',
            type: TYPES.real
          },
        ],
        currentType: TYPES.slot,
        gameList: [
          {
            src: require('./img/ptn.png'),
            text: 'PT国际版',
            type: TYPES.slot,
            category: 'ptn'
          },
          {
            type: TYPES.slot,
            src: require('./img/pt.jpg'),
            text: 'PT老虎机',
            category: 'pt'
          },
          {
            type: TYPES.slot,
            src: require('./img/ptsw.png'),
            text: 'SW老虎机',
            category: 'sw'
          },
          {
            type: TYPES.slot,
            src: require('./img/mg.jpg'),
            text: 'MG老虎机',
            category: 'mg'
          },
          {
            type: TYPES.slot,
            src: require('./img/dt.jpg'),
            text: 'DT老虎机',
            category: 'dt'
          },
          {
            type: TYPES.slot,
            src: require('./img/png.jpg'),
            text: 'PNG老虎机',
            category: 'png'
          },
          {
            type: TYPES.slot,
            src: require('./img/qt.jpg'),
            text: 'QT老虎机',
            category: 'qt'
          },
          {
            type: TYPES.slot,
            src: require('./img/nt.jpg'),
            text: 'NT老虎机',
            category: 'nt'
          },
          {
            type: TYPES.slot,
            src: require('./img/cq9.png'),
            text: 'CQ9老虎机',
            category: 'cq9'
          },
          {
            type: TYPES.slot,
            src: require('./img/bbin-slot.png'),
            text: 'BBIN老虎机',
            category: 'BBIN'
          },
          //捕鱼棋牌
          {
            type: TYPES.fishPoker,
            src: require('./img/ag2.jpg'),
            text: 'AG捕鱼',
            api: apiGame.gameAginBuyuRedirect,
          },
          {
            type: TYPES.fishPoker,
            src: require('./img/mwg-by.png'),
            text: '千炮捕鱼',
            api: apiGame.mwgLogin,
            reqData: {gameCode: 1051}
          },
          {
            type: TYPES.fishPoker,
            src: require('./img/rk.png'),
            text: '棋乐游',
            api: apiGame.cg761Login,
            reqData: {gameCode: ''}
          },
          {
            type: TYPES.fishPoker,
            src: require('./img/kyqp.png'),
            text: '开元棋牌',
            api: apiGame.kyqpLogin,
            reqData: {gameCode: ''}
          },

          //真人
          {
            type: TYPES.real,
            src: require('./img/ag.jpg'),
            text: 'AG真人',
            api: apiGame.gameAginRedirect,
          },
          {
            type: TYPES.real,
            src: require('./img/web-ebet.png'),
            text: 'EBET真人',
            api: apiGame.getEbetToken,
          },
          {
            type: TYPES.real,
            src: require('./img/pb-sport.png'),
            text: '平博体育',
            api: apiGame.PBUserLogin,
          },
          {
            type: TYPES.real,
            src: require('./img/sbsport.png'),
            text: '沙巴体育',
            api: apiGame.sbLogin,
          },
          {
            type: TYPES.real,
            src: require('./img/bbin-live.png'),
            text: 'BBIN真人',
            api: apiGame.bbinLogin,
            reqData: {
              gameKind: 'live',
              mode: 'h5',
              gameCode: ''
            }
          },
          {
            type: TYPES.real,
            src: require('./img/mg-live.png'),
            text: 'MG真人',
            api: apiGame.gameMGLive,
          },
          {
            type: TYPES.real,
            src: require('./img/fy-sport.png'),
            text: '泛亚电竞',
            api: apiGame.fanyaLogin,
          },
          {
            type: TYPES.real,
            src: require('./img/im-sport.png'),
            text: 'IM体育',
            api: apiGame.imLogin,
          },
          {
            type: TYPES.real,
            src: require('./img/vr-cai.png'),
            text: 'VR彩票',
            api: apiGame.vrLogin
          },
          {
            type: TYPES.real,
            src: require('./img/live-bit.png'),
            text: '秒赢',
            api: apiGame.bitGameUserLogin,
            reqData: {
              gameCode: ''
            }
          },
        ],
        downloadList: [
          {
            src: require('./img/p_dt.jpg'),
            text: 'DT老虎机',
            category: 'DT'
          },
          {
            src: require('./img/p_ag2.jpg'),
            text: 'AG捕鱼下载',
            category: 'AGFish'
          },
          {
            src: require('./img/p_ag.jpg'),
            text: 'AG真人',
            category: 'AGReal'
          },
          {
            src: require('./img/mwg-by.png'),
            text: '千炮捕鱼',
            category: 'MWG'
          },
          {
            src: require('./img/web-ebet.png'),
            text: 'EBET真人',
            category: 'EBET'
          },
          {
            src: require('./img/hyg.png'),
            text: '钱来捕鱼',
            category: 'HYG'
          },
        ]
      }
    },
    computed: {
      filterList() {
        return this.gameList.filter(item => item.type === this.currentType)
      },
    },
    created() {
    },
    methods: {
      // 下载
      download(item) {

        if (item.category === 'DT') {
          let url = ''
          if (getMobilePlatform() === 'Android') {
            url = 'http://down.dreamtech.asia/ZUNBAO/android.html'
          } else {
            url = 'http://down.dreamtech.asia/ZUNBAO/ios.html'
          }
          window.location.href = url
        }
        if (item.category === 'AGFish') {
          window.location.href = 'http://hunter2.agmjs.com/'
        }
        if (item.category === 'AGReal') {
          window.location.href = 'http://agmbet.com'
        }

        if (item.category === 'MWG') {
          this.playGame(apiGame.mwgLogin, {gameCode: 1051})
        }

        if (item.category === 'EBET') {
          window.location.href = 'https://www.ebetapp.com/zunbao'
        }
        if (item.category === 'HYG') {
          let url = ''
          if (getMobilePlatform() === 'Android') {
            url = 'https://downfish.onlinegame.vip/ZB/android.html'
          } else {
            url = 'https://downfish.onlinegame.vip/ZB/ios.html'
          }
          window.location.href = url
        }
      },
      //进入游戏
      allPlayGame(item) {
        if (item.type === TYPES.slot) {
          if (item.category === 'BBIN') {
            this.playGame(apiGame.bbinLogin, {gameKind: 'game', gameCode: '', mode: 'h5'})
            return
          }
          this.$router.push(`/mobile/slots/${item.category}?openMobile`)
        } else {
          this.playGame(item.api, item.reqData)
        }
      },
      selectItem(item) {
        this.currentType = item.type
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .game-wrapper
    background $color-light
    padding 15px 10px
    .game-title
      font-size 16px
      &.download-title
        margin 15px 0 10px
      i
        font-size 22px
        vertical-align middle
        margin-right 5px
        color $color-blue-mobile
    .game-tab
      display flex
      justify-content space-between
      margin 10px 0
      span
        background $color-blue-mobile
        color $color-light
        width 32%
        display block
        line-height 30px
        text-align center
        border-radius 15px
        &.active
          background $color-danger
    .game-list
      clearfix()
      .item
        float left
        width 32%
        margin-right 2%
        text-align center
        margin-bottom 10px
        &:nth-of-type(3n)
          margin-right 0
        img
          width 100%
        p
          margin-top 5px
</style>