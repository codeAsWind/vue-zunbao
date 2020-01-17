// 游戏
import gameApi from '@/components/game-api/game-api'
import VJackpot from '@/components/v-jackpot/v-jackpot.vue'
import GameList from '@/components/game-list/game-list'
import api from '@/api/index'
import apiGame from '@/api/game'
import config from '@/common/js/config'
import {mapGetters} from 'vuex'
import {redirectUrl} from '@/common/js/mixin'

export default {
  mixins:[redirectUrl],
  data() {
    return {
      apiGame,
      config,
      //banner
      slides: [],
      //奖池
      options: {
        startNum: 301518148,//开始数
        endNum: 30151814800000,//结束数
        stepNum: 0.01,//每次增加
        step: 50,//变频
        styleObj: {
          fontSize: '86px',
          color: '#404268',
        },
      },
      // 左侧导航
      navItems: [
        {
          text: 'VIP专区',
          icon: 'VIP',
          path: '/activity/vip',
          new: true
        },
        {
          text: '积分商城',
          icon: 'jifenshangcheng',
          path: '/integral',
          new: true
        },
        {
          text: '代理加盟',
          icon: 'zhaoshangdaili',
          path: '/agent'
        },
        {
          text: '官方公众号',
          icon: 'guanfangrenzheng',
          path: '#foot'
        },
        {
          text: '尊宝电影院',
          icon: 'dianyingyuan',
          path: '/activity/movie'
        },
        {
          text: '客服中心',
          icon: 'kefu',
          path: '/service'
        }
      ],
      // 老虎机
      slotList: [
        {
          icon: require('./img/p-pt.jpg'),
          img: require('./img/i-pt.png'),
          path: '/slots/pt'
        },
        {
          icon: require('./img/p-dt.jpg'),
          img: require('./img/i-dt.png'),
          path: '/slots/dt'
        },
        {
          icon: require('./img/p-mg.jpg'),
          img: require('./img/i-mg.png'),
          path: '/slots/mg'
        },
        {
          icon: require('./img/p-png.jpg'),
          img: require('./img/i-png.png'),
          path: '/slots/png'
        },

      ],
      // 推荐游戏
      filterList: [//游戏列表
        {
          "productCode": "yl",
          "productName": null,
          "createTime": 1537944349000,
          "createUser": "l8test",
          "updateTime": 1537944349000,
          "updateUser": "l8test",
          "id": 50,
          "gameId": "IDSBloodQueenHTML5Desktop",
          "gameCode": "IDSBloodQueenHTML5Desktop",
          "gameCName": "嗜血女王",
          "gameEName": "Blood Queen",
          "gameLine": "05-10",
          "imageUrl": "https://new.shzibeisy.com/game/20180926_1537944341140.jpg",
          "gameStatus": "3",
          "gameCategory": "MG",
          "gameTerminal": "3RD",
          "gameType": "SLO",
          "gameStyle": "GIR",
          "gameTag": "NEW,HOT",
          "gameLanguage": "zh",
          "gameSort": 0,
          "recommendIndex": 5,
          "popularityIndex": 1000,
          "jackpotFlag": "N",
          "recommendFlag": "N",
          "deleteFlag": "N",
          "description": "",
          "gameLineLabel": "05-10线",
          "gameStatusLabel": "试玩/真钱",
          "gameCategoryLabel": "MG老虎机",
          "gameTerminalLabel": "电脑端",
          "gameTypeLabel": "电动吃角子",
          "gameStyleLabel": "少女",
          "recommendIndexLabel": "五星",
          "jackpotFlagLabel": "否",
          "recommendFlagLabel": "否",
          "deleteFlagLabel": "已上架"
        },
        {
          "productCode": "yl",
          "productName": null,
          "createTime": 1537511855000,
          "createUser": "l8test",
          "updateTime": 1537511855000,
          "updateUser": "l8test",
          "id": 40,
          "gameId": "bwzq5x25",
          "gameCode": "bwzq5x25",
          "gameCName": "比武招亲",
          "gameEName": "Joust for a spouse",
          "gameLine": "25-30",
          "imageUrl": "https://new.shzibeisy.com/game/20180921_1537511849616.jpg",
          "gameStatus": "3",
          "gameCategory": "DT",
          "gameTerminal": "MOBILE",
          "gameType": "SLO",
          "gameStyle": "GIR",
          "gameTag": "SM",
          "gameLanguage": "zh_cn",
          "gameSort": 4,
          "recommendIndex": 5,
          "popularityIndex": 9996,
          "jackpotFlag": "Y",
          "recommendFlag": "N",
          "deleteFlag": "N",
          "description": "",
          "gameLineLabel": "25-30线",
          "gameStatusLabel": "试玩/真钱",
          "gameCategoryLabel": "DT老虎机",
          "gameTerminalLabel": "手机端",
          "gameTypeLabel": "电动吃角子",
          "gameStyleLabel": "少女",
          "recommendIndexLabel": "五星",
          "jackpotFlagLabel": "是",
          "recommendFlagLabel": "否",
          "deleteFlagLabel": "已上架"
        },
        {
          "productCode": "yl",
          "productName": null,
          "createTime": 1537511727000,
          "createUser": "l8test",
          "updateTime": 1537511727000,
          "updateUser": "l8test",
          "id": 38,
          "gameId": "camgirl5x25",
          "gameCode": "camgirl5x25",
          "gameCName": "心动女主播",
          "gameEName": "Sexy Camgirl",
          "gameLine": "25-30",
          "imageUrl": "https://new.shzibeisy.com/game/20180921_1537511724895.jpg",
          "gameStatus": "3",
          "gameCategory": "DT",
          "gameTerminal": "MOBILE",
          "gameType": "SLO",
          "gameStyle": "GIR",
          "gameTag": "SM,HOT",
          "gameLanguage": "zh_CN",
          "gameSort": 3,
          "recommendIndex": 5,
          "popularityIndex": 9997,
          "jackpotFlag": "N",
          "recommendFlag": "N",
          "deleteFlag": "N",
          "description": "",
          "gameLineLabel": "25-30线",
          "gameStatusLabel": "试玩/真钱",
          "gameCategoryLabel": "DT老虎机",
          "gameTerminalLabel": "手机端",
          "gameTypeLabel": "电动吃角子",
          "gameStyleLabel": "少女",
          "recommendIndexLabel": "五星",
          "jackpotFlagLabel": "否",
          "recommendFlagLabel": "否",
          "deleteFlagLabel": "已上架"
        },
        {
          "productCode": "yl",
          "productName": null,
          "createTime": 1537511630000,
          "createUser": "l8test",
          "updateTime": 1537511630000,
          "updateUser": "l8test",
          "id": 36,
          "gameId": "dessert5x20",
          "gameCode": "dessert5x20",
          "gameCName": "快乐甜品",
          "gameEName": "Happy Dessert Time",
          "gameLine": "MORE",
          "imageUrl": "https://new.shzibeisy.com/game/20180921_1537511627160.jpg",
          "gameStatus": "1",
          "gameCategory": "DT",
          "gameTerminal": "MOBILE",
          "gameType": "SLO",
          "gameStyle": "CAR",
          "gameTag": "NEW",
          "gameLanguage": "zh_CN",
          "gameSort": 2,
          "recommendIndex": 5,
          "popularityIndex": 9998,
          "jackpotFlag": "N",
          "recommendFlag": "N",
          "deleteFlag": "N",
          "description": "",
          "gameLineLabel": "更多",
          "gameStatusLabel": "试玩",
          "gameCategoryLabel": "DT老虎机",
          "gameTerminalLabel": "手机端",
          "gameTypeLabel": "电动吃角子",
          "gameStyleLabel": "卡通",
          "recommendIndexLabel": "五星",
          "jackpotFlagLabel": "否",
          "recommendFlagLabel": "否",
          "deleteFlagLabel": "已上架"
        },
        {
          "productCode": "yl",
          "productName": null,
          "createTime": 1537511549000,
          "createUser": "l8test",
          "updateTime": 1537511549000,
          "updateUser": "l8test",
          "id": 34,
          "gameId": "sweethouse",
          "gameCode": "sweethouse",
          "gameCName": "甜蜜糖果屋",
          "gameEName": "Sweet House",
          "gameLine": "25-30",
          "imageUrl": "https://new.shzibeisy.com/game/20180921_1537511545451.png",
          "gameStatus": "3",
          "gameCategory": "DT",
          "gameTerminal": "MOBILE",
          "gameType": "SLO",
          "gameStyle": "CAR",
          "gameTag": "BIG,NEW",
          "gameLanguage": "zh_CN",
          "gameSort": 1,
          "recommendIndex": 5,
          "popularityIndex": 9999,
          "jackpotFlag": "N",
          "recommendFlag": "N",
          "deleteFlag": "N",
          "description": "",
          "gameLineLabel": "25-30线",
          "gameStatusLabel": "试玩/真钱",
          "gameCategoryLabel": "DT老虎机",
          "gameTerminalLabel": "手机端",
          "gameTypeLabel": "电动吃角子",
          "gameStyleLabel": "卡通",
          "recommendIndexLabel": "五星",
          "jackpotFlagLabel": "否",
          "recommendFlagLabel": "否",
          "deleteFlagLabel": "已上架"
        },
      ],
      //弹框数据
      indexAlertData: {
        list: '',
        tips: ''
      },
      isShowIndexAlertDialog: true,
      sbData: {},//沙巴体育
      advantageList:[
        {
          src:require('./img/advantage/b-nav-1.jpg'),
          href:'/slots/pt',
          title:'老虎机平台'
        },
        {
          src:require('./img/advantage/b-nav-2.jpg'),
          href:'/real',
          title:'真人视讯'
        },
        {
          src:require('./img/advantage/b-nav-3.jpg'),
          href:'/sports',
          title:'体育投注'
        },
        {
          src:require('./img/advantage/b-nav-4.jpg'),
          href:config.serviceLink,
          title:'在线客服'
        },
        {
          src:require('./img/advantage/b-nav-5.jpg'),
          href:'',
          title:'客服邮箱'
        },
        {
          src:require('./img/advantage/b-nav-6.jpg'),
          href:'',
          title:'微信客服'
        },
        {
          src:require('./img/advantage/b-nav-7.jpg'),
          href:'',
          title:'服务优势'
        },
      ],
      isShowAdvantage:false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this._getBannerData()
    this._checkConfigSystem()
    this._getShabSetting()
  },
  methods: {
    // 跳久安大厅
    goToJiuAn() {
      if (!this.isLogin) {
        window.open('https://9anwallet.com/index')
        return
      }
      this.redirectUrl(1)
    },
    //沙巴体育
    _getShabSetting() {
      api.getShabSetting().then((res) => {
        if (res.code === this.ERR_OK) {
          this.sbData = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //首页弹框信息
    _checkConfigSystem() {
      api.checkConfigSystem({
        typeNo: 'type003',
        itemNo: '001'
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          // res.data = "首页公告#1. 使用久安定制存款加赠1.5%,【快速买卖】进行交易再送10万币送完为止！\u003cbr/\u003e2.【9月17号限时存送优惠】『存30送21』『存100送50』『存500送160』3选1\u003cbr/\u003e3. 填写智能客服问卷调查 , 如您的建议采纳 , 即可获得惊喜彩金!\u003cbr/\u003e4. MG真人隆重登场，高质感游戏体验火热上线 !\u003cbr/\u003e温馨提示：\u003cbr/\u003e 1.禁止多账号套限时，首存，等其他优惠，一经发现将扣除盈利\u003cbr/\u003e2.请务必在每次充值前都要在官网获取收款账户在进行充值！如果没有确认账号充值到停用账户，皆不受理#\t"
          let flag = res.data.split('#')[1]
          this.indexAlertData.list = flag.split('温馨提示：')[0]
          this.indexAlertData.tips = '温馨提示：' + flag.split('温馨提示：')[1]
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //获取banner数据
    _getBannerData() {
      api.getBannerData().then((res) => {
        if (res.code === this.ERR_OK) {
          this.slides = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //获取导航icon
    _getIconClass(icon) {
      return `icon-${icon}`
    },
    _bannerImage(src) {
      return {
        background: `url(${src}) center`,
        backgroundSize: 'cover'
      }
    },
    _isHttpUrl(string) {
      return /^http/.test(string)
    }
  },
  components: {
    VJackpot,
    GameList,
    gameApi
  }
}