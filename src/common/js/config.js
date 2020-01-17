export default {
  ERR_OK: '0',//成功状态码
  ERR_OK_OTHER: '10000',
  timeout: 10000, //请求超时
  reqHeaders: {"Content-Type": "application/json;charset=utf-8"},//请求头
  serviceLink: 'https://chatai.zb251.com/chat/chatClient/chatbox.jsp?companyID=9043&configID=17',
  serviceEmail: 'kefu@zb970.com',
  agentEmail: 'aff@zb970.com',
  complaintEmail: 'ceo@zb970.com',
  qq: ['3417826417', '2511847099', '2657614538'],
  Skype: '9129752651',
  wxServiceEwm: require('@/common/image/wx-service-ewm.jpg'),
  zbAppEwm: require('@/common/image/zb-app.png'),
  zbOfficialWebsite: require('@/common/image/zbOfficialWebsite.jpg'),
  role: 'MONEY_CUSTOMER',//登录方
  //支付
  PAYWAY: { //支付通道
    jiuAnDZ: 16,
    zfbSM: 1,
    wxSM: 2,
    jiuAnZF: 12,
    meiTuan: 14,
    yinLian: 13,
    qq: 7,
    jD: 10,
    online: 3,
    fastPay: 4,
    otherSM: 9,
    cardPay: 5,
    allPay: 8,
    //自定义秒存通道，用字符串替代，用于数据处理，也可作为该项通道的唯一id使用
    phoneWYPay: '__phoneWYPay__',//手机网银
    zfbTransformPay: '__zfbTransformPay__',//支付宝转账
    wxzzPay: '__wxzzPay__',//微信转账

  },
  //转账账户
  accountList: [
    {
      value: 'self',
      text: '主账户'
    },
    {
      value: 'newpt',
      text: 'PT账户'
    },
    {
      value: 'slot',
      text: '老虎机钱包账户'
    },
    {
      value: 'agin',
      text: 'AG账户'
    },
    {
      value: 'qd',
      text: '签到余额'
    },
    {
      value: 'ebetapp',
      text: 'EBet真人账户'
    },
    {
      value: 'sba',
      text: '沙巴体育账户'
    },
    {
      value: 'mwg',
      text: 'MWG帐户'
    },
    {
      value: 'qqdk',
      text: '存款全勤奖账户'
    },
    {
      value: 'chess',
      text: '棋乐游账户'
    },
    {
      value: 'vr',
      text: 'vr彩票账户'
    },
    {
      value: 'kyqp',
      text: '开元棋牌账户'
    },
    {
      value: 'fanya',
      text: '泛亚电竞账户'
    },
    {
      value: 'im',
      text: 'IM体育账户'
    },
    {
      value: 'pb',
      text: '平博体育账户'
    },
    {
      value: 'bbin',
      text: 'BBIN账户'
    },
    {
      value: 'fish',
      text: '钱来捕鱼账户'
    },
    {
      value: 'live',
      text: 'MG真人账户'
    },
    {
      value: 'bit',
      text: '秒赢账户'
    },
  ],
  // 使用公共分页器标识
  paginationMark: {
    searchPtCommissions: '__searchPtCommissions__',//日结佣金
    rescueMoney: '__rescueMoney__',//救援金
    searchagprofit: '__searchagprofit__',//会员输赢
    searchsubuserProposal: '__searchsubuserProposal__',//会员存款
    withdraw: '__withdraw__',//会员提款
    vipBackwater: '__vipBackwater__',//会员返水
    vipPromo: '__vipPromo__',//会员优惠
    offlineMembers:'__offlineMembers__',//下线会员
  },
  userInfo: {//用户信息
    loginname: '',
    level: '',
    account: '',
    birthday: '',
    creditdaydate: '',
    email: '',
    phone: '',
    qq: '',
    credit: '',
    microchannel: '',//微信
    creditday: '',
    role: '',
    accountName: ''
  },
  //积分商城 商品类型
  integral:{
    phoneFee:'phoneFee',//手机话费
    phoneData:'phoneData',//手机流量
    physical:'physical',//实物奖品
    coupon:'coupon',//优惠券
    money:'money',//彩金
  },
  //游戏线路
  COMMON_GAME_LINE:[
    {name: "全部", value: ""},
    {name: "单线", value: "1-1"},
    {name: "5-10线", value: "05-10"},
    {name: "15-20线", value: "15-20"},
    {name: "25-30线", value: "25-30"},
    {name: "40线", value: "40"},
    {name: "更多", value: "MORE"},
  ],
  promotion:{
    TYPE_ALL:'',
    TYPE_SLOT:'slot',
    TYPE_REAL:'real',
    TYPE_SPORT:'sport',
    TYPE_PHONE:'phone',
    TYPE_OLD:'old',
    TIME:'2017-04-01至2019-04-01'
  }
}
