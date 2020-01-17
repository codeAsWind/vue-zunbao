<template>
  <div class="game-menu-wrapper">
    <div v-if="isShow" class="mask" @click="closeMenu"></div>
    <transition name="slider-right">
      <div v-if="isShow" class="menu-wrapper">

        <div class="tab-header">
          <tab-card :list="list" @selectTabItem="selectTabItem" :currentIdx="currentIdx"></tab-card>
        </div>
        <div class="tab-content">
          <!--老虎机-->
          <div class="filters" v-if="currentIdx === 0">

            <div class="common-type game-platform">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <router-link class="item" v-for="item in platformList"
                             :to="{path:`/mobile/slots/${item.path}?openMobile`}">{{item.text}}
                </router-link>
                <a class="item" @click="playGame(apiGame.bbinLogin,{gameKind:'game',gameCode:'',mode:'h5'})"
                   href="javascript:;">BBIN</a>
              </div>
            </div>

            <div class="common-type" v-if="item.list[category] && item.list[category].length"
                 v-for="item in filterTypeList">
              <h3 class="tit red">{{item.title}}</h3>
              <div class="item-list">
                <a
                    href="javascript:;"
                    @click="search(obj,item)"
                    class="item"
                    v-for="(obj) in item.list[category]"
                    :class="{active: obj.value === item.active}">
                  {{obj.name}}
                </a>
              </div>
            </div>

          </div>

          <!--真人-->
          <div v-if="currentIdx === 1">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in realList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

          <!--捕鱼-->
          <div v-if="currentIdx === 2">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in fishList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

          <!--体育-->
          <div v-if="currentIdx === 3">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in sportsList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

        </div>

        <div class="bottom">
          <span @click="reset">重置</span>
          <span @click="closeMenu">完成</span>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
  import apiGame from '@/api/game'
  import {playGame, gameFilter} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  import TabCard from 'MComponents/tab-card/tab-card'

  export default {
    mixins: [playGame, gameFilter],
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        apiGame,
        platformList: [
          {
            text: 'PT国际版',
            path: 'ptn',
          },
          {
            text: 'PT',
            path: 'pt',
          },
          {
            text: 'SW',
            path: 'sw',
          },
          {
            text: 'DT',
            path: 'dt',
          },
          {
            text: 'MG',
            path: 'mg',
          },
          {
            text: 'PNG',
            path: 'png',
          },
          {
            text: 'QT',
            path: 'qt',
          },
          {
            text: 'NT',
            path: 'nt',
          },
          {
            text: 'CQ9',
            path: 'cq9',
          },
        ],
        //真人列表
        realList:[
          {
            text:'EBET',
            api: apiGame.getEbetToken,
          },
          {
            text:'AG真人',
            api: apiGame.gameAginRedirect,
          },
          {
            text:'棋乐游',
            api: apiGame.cg761Login,
            reqData: {gameCode: ''}
          },
          {
            text:'开元棋牌',
            api: apiGame.kyqpLogin,
            reqData: {gameCode: ''}
          },
          {
            text:'BBIN真人',
            api: apiGame.bbinLogin,
            reqData: {
              gameKind: 'live',
              mode: 'h5',
              gameCode: ''
            }
          },
        ],
        //捕鱼
        fishList:[
          {
            text:'AG捕鱼',
            api: apiGame.gameAginBuyuRedirect,
          },
          {
            text:'千炮捕鱼',
            api: apiGame.mwgLogin,
            reqData: {gameCode: 1051}
          },
        ],
        //体育
        sportsList:[
          {
            text:'沙巴体育',
            api: apiGame.sbLogin,
          },
          {
            text:'平博体育',
            api: apiGame.PBUserLogin,
          },
          {
            text:'IM体育',
            api: apiGame.imLogin,
          },
          {
            text:'泛亚电竞',
            api: apiGame.fanyaLogin,
          },
        ],
        list: [
          {
            text: '老虎机'
          },
          {
            text: '真人平台'
          },
          {
            text: '捕鱼王'
          },
          {
            text: '体育平台'
          },
        ],
        currentIdx: 0
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {

    },
    methods: {
      closeMenu() {
        this.$emit('closeMenu')
      },
      selectTabItem(idx) {
        this.currentIdx = idx
      }
    },
    components: {
      TabCard
    }
  }
</script>

<style lang="stylus" src="./game-menu.styl" scoped></style>
