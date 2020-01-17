<template>
  <div class="header">
    <!--top-->
    <div class="top">
      <div class="wrapper top-wrapper">
        <!--左公告-->
        <div class="notice" @mouseover="noticeSubState = true" @mouseout="noticeSubState = false">
          <marquee onmouseover="this.stop()" onmouseout="this.start()" loop="infinite" scrollamount="3" behavior=""
                   direction="">
            <router-link v-for="(item,index) in noticeList" to="/news-page">{{(index+1)+'、'+item.title}}</router-link>
          </marquee>
          <i class="iconfont icon-arrowdown-copy arrow scale-big"></i>
          <div v-show="noticeSubState" class="notice-sub">
            <div v-for="item in noticeList.slice(0,2)" class="item">
              <h3>
                <span>{{item.title}}</span>
                <span>{{item.time}}</span>
              </h3>
              <div>
                {{item.content}}
              </div>
            </div>
            <div class="center">
              <router-link to="/news-page">
                <el-button size="small" type="warning" class="small-btn">浏览更多</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <!--未登录-->
        <div v-if="!isLogin" class="top-right-wrapper is-logOut">
          <form>
            <input type="text" autocomplete v-model="userFormData.loginName" placeholder="用户名">
            <input type="password" autocomplete v-model="userFormData.passWord" placeholder="密码">
            <a class="style-btn" href="javascript:;" @click="login()">登录</a>
            <router-link to="/register" class="style-btn register-btn">免费注册</router-link>
            <router-link class="color-intersperse" to="/safe-center">
              <i class="iconfont icon-yusan01"></i> 忘记密码
            </router-link>
            <router-link class="color-intersperse" to="/site-map">
              <i class="iconfont icon-huojian"></i> 快速网址
            </router-link>
          </form>
        </div>
        <!--已登录-->
        <div v-if="isLogin && !isAgent" class="top-right-wrapper is-login">
          <div class="account">
            <span style="cursor: pointer"><span>账户：{{userInfo.loginname}}</span> <i class="iconfont icon-arrowdown-copy scale-big"></i></span>
            <div class="sub-menu">
              <router-link to="/user">
                <i class="iconfont icon-xiazai"></i>个人中心
              </router-link>
              <router-link to="/user/discounts">
                <i class="iconfont icon-zizhu"></i>自助优惠
              </router-link>
              <router-link to="/user/account-list">
                <i class="iconfont icon-qingdan1"></i>账户清单
              </router-link>
              <a href="javascript:;" @click="logOut">
                <i class="iconfont icon-tuichu"></i>退出游戏
              </a>
            </div>
          </div>
          <span class="split"></span>
          <span>
            余额：<b class="color-intersperse">{{balance || userInfo.credit}} </b>
            <i @click="getGameMoney" class="iconfont icon-shuaxin refresh"></i>
          </span>
          <span class="split"></span>
          <router-link to="/user/deposit">充值</router-link>
          <span class="split"></span>
          <router-link to="/user/withdraw">提现</router-link>
          <span class="split"></span>
          <div class="sign">
            <router-link to="/user/sign-lottery">签到</router-link>
            <div class="sub-menu">
              <p>签到金额：</p>
              <p class="sign-money color-intersperse">{{signAmount}}元</p>
              <el-button @click="doSignRecord" type="warning">签到</el-button>
              <p>签到领取彩金~</p>
            </div>
          </div>
          <span class="split"></span>
          <router-link class="msg" to="/user/letter">消息 <i v-if="!isRead" class="badge"></i></router-link>
          <span class="split"></span>
          <router-link class="color-intersperse" to="/site-map">
            <i class="iconfont icon-huojian"></i> 快速网址
          </router-link>
        </div>
        <!--代理登录-->
        <div v-if="isAgent" class="top-right-wrapper agent-header">
          <span>
            欢迎回来：
            <span class="color-intersperse">{{userInfo.loginname}}</span>
          </span>
          <span>
            老虎机账户
            <span class="color-intersperse">{{slotAmount}} </span>
            <i @click="getUserStatus" class="iconfont icon-shuaxin refresh"></i>
          </span>
          <span>
            其它账户
            <span class="color-intersperse">{{balance}} </span>
            <i @click="getGameMoney" class="iconfont icon-shuaxin refresh"></i>
          </span>
          <router-link to="/agent-manage">
            <el-button type="warning" size="small">代理中心</el-button>
          </router-link>
          <router-link class="msg" to="/agent-manage/letter">消息 <i v-if="!isRead" class="badge"></i></router-link>
          <a href="javascript:;" @click="logOut">
            退出
          </a>
          <router-link class="color-intersperse" to="/site-map">
            <i class="iconfont icon-huojian"></i> 快速网址
          </router-link>
        </div>

      </div>

    </div>
    <!--导航-->
    <div class="nav">
      <div class="wrapper">
        <!--logo-->
        <router-link class="logo" to="/index">
          <img :src="logo" alt="">
        </router-link>

        <!--主导航-->
        <ul class="main-nav">
          <li>
            <router-link to="/index">
              <span>首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/slots">
              <img class="hot" src="./img/hot-icon.png" alt="">
              <span>老虎机游戏</span>
            </router-link>
            <div class="sub-nav">
              <router-link v-if="_isRouterLink(item.path)" :to="{path:item.path}" v-for="item in subNav.slots">
                <div class="icon-box"><img :src="item.imageUrl" alt=""></div>
                <span>{{item.text}}</span>
              </router-link>
              <a v-if="!_isRouterLink(item.path)" @click="jumpGame(item.path)" href="javascript:;"
                 v-for="item in subNav.slots">
                <div class="icon-box"><img :src="item.imageUrl" alt=""></div>
                <span>{{item.text}}</span>
              </a>
            </div>
          </li>
          <li>
            <router-link to="/real">
              <span>真人娱乐</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sports">
              <span>体育电竞</span>
            </router-link>
          </li>
          <li>
            <router-link to="/fish-classify">
              <span>捕鱼游戏</span>
            </router-link>
          </li>
          <li>
            <router-link to="/chess">
              <span>棋牌游戏</span>
            </router-link>
          </li>
          <li>
            <game-api :factoryFun="apiGame.vrLogin"><a href="javascript:;">VR彩票</a></game-api>
          </li>
          <li>
            <router-link to="/promotion">
              <img class="new" src="./img/new-icon.png" alt="">
              <span>优惠活动</span>
            </router-link>
          </li>
          <li>
            <router-link to="/download">
              <span>APP下载</span>
            </router-link>
            <!--<a href="javascript:;">-->
              <!--<span>APP下载</span>-->
              <!--<i class="iconfont icon-user icon-arrow-nav"></i>-->
            <!--</a>-->
            <!--<div class="sub-nav-download">-->
              <!--<div class="wr">-->
                <!--<p>-->
                  <!--<i class="iconfont icon-android"></i>-->
                  <!--<i class="iconfont icon-ios"></i>-->
                <!--</p>-->
                <!--<img width="100" src="./img/zbEwm.png" alt="">-->
              <!--</div>-->
            <!--</div>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/user'
  import apiGame from '@/api/game'
  import {login, logOut, playGame, getGameMoney, queryPoints} from "@/common/js/mixin"
  import gameApi from '@/components/game-api/game-api'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [login, logOut, playGame, getGameMoney, queryPoints],
    data() {
      return {
        apiGame,
        noticeList: [],//公告信息
        userFormData: { //登录数据
          loginName: '',
          passWord: ''
        },
        logo: require('@/common/image/newlogo.png'),//logo
        subNav: {
          slots: [
            {
              text: 'PT游戏',
              path: '/slots/pt',
              imageUrl: require('./img/slot/logopt.png')
            }, {
              text: 'SW游戏',
              path: '/slots/sw',
              imageUrl: require('./img/slot/logosky.png')
            }, {
              text: 'MG游戏',
              path: '/slots/mg',
              imageUrl: require('./img/slot/logomg.png')
            },
            {
              text: 'DT游戏',
              path: '/slots/dt',
              imageUrl: require('./img/slot/logodt.png')
            }, {
              text: 'PNG游戏',
              path: '/slots/png',
              imageUrl: require('./img/slot/logopng.png')
            }, {
              text: 'QT游戏',
              path: '/slots/qt',
              imageUrl: require('./img/slot/logoqt.png')
            },
            {
              text: 'NT游戏',
              path: '/slots/nt',
              imageUrl: require('./img/slot/logont.png')
            },
            {
              text: 'BBIN游戏',
              path: 'BBinGame',
              imageUrl: require('./img/slot/logobbin.png')
            }
          ]
        },//子菜单
        isRead: true,//默认全部已读
        noticeSubState: false
      }
    },
    computed: {
      ...mapGetters([
        'isAgent',
        'isLogin',
        'userInfo',
        'signAmount',
        'slotAmount'
      ])
    },
    created() {
      this._getNotice() //获取公告信息
      this._isLoginChangeCallback()//初始化加载项
    },
    methods: {
      //签到
      doSignRecord() {
        api.doSignRecord().then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'success',
              message: res.data
            })
            this._querySignAmount()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //刷新老虎机账户余额
      getUserStatus() {
        api.getUserStatus().then((res) => {
          if (this.ERR_OK === res.code) {
            this.SET_SLOT_AMOUNT(res.data)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //跳转游戏
      jumpGame() {
        this.playGame(apiGame.bbinLogin, {gameKind: 'game', gameCode: '', mode: 'pc'})
      },
      //初始化加载项
      _isLoginChangeCallback() {
        if (this.isLogin) {
          this._querySignAmount() //查询签到余额
          this._getGuestbookCountNew()//查询用户最新消息
          this._queryPoints()
        }
      },
      //查询用户最新消息
      _getGuestbookCountNew() {
        api.getGuestbookCountNew().then((res) => {
          if (this.ERR_OK === res.code) {
            if (Number(res.data)) {//有未读消息，表示未读
              this.isRead = false //未读
              this.SET_UNREAD_MESSAGE(Number(res.data))
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //查询签到余额
      _querySignAmount() {
        api.querySignAmount({_: new Date()}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.SET_SIGNAMOUNT(res.data)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      //公告信息
      _getNotice() {
        api.getNotice({pageIndex: 1, pageSize: 5}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.noticeList = res.data.records
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      _isRouterLink(str) {
        return str.includes('/')
      },
      ...mapMutations([
        'SET_USERINFO',
        'SET_SIGNAMOUNT',
        'SET_UNREAD_MESSAGE',
        'SET_SLOT_AMOUNT'
      ])
    },
    watch: {
      isLogin() {
        this._isLoginChangeCallback()
      }
    },
    components: {
      gameApi
    }
  }
</script>

<style lang="stylus" scoped src="./header.styl"></style>