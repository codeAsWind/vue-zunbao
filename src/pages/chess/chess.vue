<template>
  <div class="chess">
    <div class="banner">
      <el-carousel :interval="4000" height="450px">
        <el-carousel-item :style="_bannerImage(item.src)" v-for="item in slides" :key="item.title"></el-carousel-item>
      </el-carousel>
    </div>
    <div class="game-content">
      <div class="tab-type">
        <div class="wrapper tab-type-wrapper">
          <span @click="selectItem(idx,item.type)" :class="{active:currentIdx === idx}" v-for="(item,idx) in tabs">
            <img :src="item.img" alt="">{{item.text}}
          </span>
        </div>
      </div>
      <div class="game-list-wrapper wrapper">
        <div class="item" v-for="item in filterList">
          <div class="pic"><img :src="item.img" alt=""></div>
          <div class="bottom">
            <p>{{item.title}}</p>
            <el-button @click="playGameCommon(item)" type="warning" round plain>立即游戏</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const TYPE_kY = 'ky'
  const TYPE_761 = 'poker761'
  const TYPE_MW = 'mw'
  import apiGame from '@/api/game'
  import {playGame} from "@/common/js/mixin"

  export default {
    mixins: [playGame],
    data() {
      return {
        slides: [
          {
            src: require('./img/c-bg1.jpg')
          },
          {
            src: require('./img/c-bg2.jpg')
          },
        ],
        tabs: [
          {
            img: require('./img/c-logo1.png'),
            text: '开元棋牌',
            type: TYPE_kY
          },
          {
            img: require('./img/c-logo2.png'),
            text: '761CITY棋牌',
            type: TYPE_761
          },
          {
            img: require('./img/c-logo3.png'),
            text: '大满贯棋牌',
            type: TYPE_MW
          }
        ],
        currentIdx: 0,
        currentType: TYPE_kY,
        allGames: [
          {
            img: require('./img/ky/01.png'),
            title: '抢庄牛牛',
            gameCode: 830,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/02.png'),
            title: '炸金花',
            gameCode: 220,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/03.png'),
            title: '极速炸金花',
            gameCode: 230,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/04.png'),
            title: '德州扑克',
            gameCode: 620,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/05.png'),
            title: '通比牛牛',
            gameCode: 870,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/06.png'),
            title: '二八杠',
            gameCode: 720,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/07.png'),
            title: '抢庄牌九',
            gameCode: 730,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/08.png'),
            title: '三公',
            gameCode: 860,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/09.png'),
            title: '幸运五张',
            gameCode: 380,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/10.png'),
            title: '十三水',
            gameCode: 630,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/11.png'),
            title: '斗地主',
            gameCode: 610,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/12.png'),
            title: '押庄龙虎',
            gameCode: 900,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/13.png'),
            title: '欢乐红包',
            gameCode: 880,
            type: TYPE_kY
          },
          {
            img: require('./img/ky/14.png'),
            title: '二十一点',
            gameCode: 600,
            type: TYPE_kY
          },


          {
            img: require('./img/poker761/01.jpg'),
            title: '德州扑克',
            gameCode: 'texas',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/02.jpg'),
            title: '牛牛',
            gameCode: 'bull',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/03.jpg'),
            title: '百人牛牛',
            gameCode: 'hundredbull',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/04.jpg'),
            title: '飞禽走兽',
            gameCode: 'animal',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/05.jpg'),
            title: '欢乐三十秒',
            gameCode: 'baccarat',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/06.jpg'),
            title: '奔驰宝马',
            gameCode: 'carbrand',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/07.jpg'),
            title: '看牌抢庄',
            gameCode: 'bull/rob',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/08.jpg'),
            title: '龙虎',
            gameCode: 'doratora',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/09.jpg'),
            title: '抢庄牛牛',
            gameCode: 'bull/mrob',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/10.jpg'),
            title: '通比牛牛',
            gameCode: 'bull/fair',
            type: TYPE_761
          },
          {
            img: require('./img/poker761/11.jpg'),
            title: '炸金花',
            gameCode: 'zjh',
            type: TYPE_761
          },


          {
            img: require('./img/mw/pk.jpg'),
            title: '扑克',
            gameCode: 22,
            type: TYPE_MW
          },
          {
            img: require('./img/mw/nn.jpg'),
            title: '牛牛',
            gameCode: 139,
            type: TYPE_MW
          },
          {
            img: require('./img/mw/ddz.jpg'),
            title: '斗地主',
            gameCode: 20,
            type: TYPE_MW
          }

        ],
      }
    },
    computed: {
      filterList() {
        return this.allGames.filter((item) => {
          return item.type === this.currentType
        })
      },
    },
    methods: {
      playGameCommon(item) {
        let api = null
        if (item.type === TYPE_kY) {
          api = apiGame.kyqpLogin
        }
        if (item.type === TYPE_761) {
          api = apiGame.cg761Login
        }
        if (item.type === TYPE_MW) {
          api = apiGame.mwgLogin
        }
        this.playGame(api, {gameCode: item.gameCode})

      },
      selectItem(idx, type) {
        this.currentIdx = idx
        this.currentType = type
      },
      _bannerImage(src) {
        return {
          background: `url(${src}) center`,
          backgroundSize: 'cover'
        }
      }
    },
    components: {}
  }
</script>

<style src="./chess.styl" lang="stylus" scoped>

</style>