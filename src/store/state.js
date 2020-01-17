import {loadLoginState,loadAgentState,loadUserInfo} from '@/common/js/cache'
const state = {
  isLogin: loadLoginState(), //登陆状态
  isAgent:loadAgentState(),//代理登录状态
  userInfo:loadUserInfo(),//用户信息
  isShowCommonModule:true,//默认显示公共模块
  isShowMobileCommonModule:true,//默认显示公共模块 手机端
  isShowLoginDialog:false,//是否显示登录模块
  slotAmount:0,//代理账号 老虎机账户余额
  points:0,
  signAmount:0,//签到余额
  uetAmount:0,//UET余额
  loadingState:false,//加载状态
  favoriteGameList:[],//游戏收藏列表(id集合)
  unReadMessageNum:0,//未读消息
  juanTokenData:{
    juanDT: '',//久安大厅
    juanDeposit: '',//存款
    juanWithdrawal:'',//提款
    juanActivity: '',//活动
    qrCode: ''//二维码
  }
}

export default state
