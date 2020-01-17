import {ajaxFactory} from './ajaxFactory'


//notice
function getNotice(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllNews', data))
}

//login
function login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/login', data))
}

//logOut
function logOut(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/logOut', data))
}

// checkLogin
function checkLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkLogin', data))
}

//getuser 查询用户信息
function getUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUser', data))
}

//查询代理账户老虎机账户余额
function getUserStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserStatus', data))
}

//makeCall
function makeCall(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/makeCall', data))
}

//register
function register(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/register', data))
}


// 存款通道
function getPayWay(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pay_way', data))
}

// 秒存
function getNewdeposit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getNewdeposit', data))
}

// 通用存款
function commonDeposit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pay_api', data))
}

// 久安充值
function recharge(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/recharge', data))
}

// 签到余额查询
function querySignAmount(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/querySignAmount', data))
}

// 签到
function doSignRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/doSignRecord', data))
}

// 用户最新消息
function getGuestbookCountNew(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getGuestbookCountNew', data))
}

// 查询客服二维码
function queryQrcode(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryQrcode', data))
}


// getBankInfoList 获取绑定的银行卡
function getBankInfoList(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBankInfoList', data))
}

// withdrawTwo 提款
function withdrawTwo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/withdrawTwo', data))
}

// unBindBankinfo 解绑银行卡
function unBindBankinfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/unBindBankinfo', data))
}

//getWithDrawBankStatus 获取提款银行状态
function getWithDrawBankStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getWithDrawBankStatus', data))
}

// getUserBalance UET余额
function getUserBalance(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserBalance', data))
}

// searchBankno 获取银行账号
function searchBankno(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchBankno', data))
}

// getUserToken 获取token
function getUserToken(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserToken', data))
}

// getGameMoney
function getGameMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getGameMoney', data))
}

// queryPoints
function queryPoints(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryPoints', data))
}

// queryProfit
function queryProfit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryProfit', data))
}

//查询红包账户
function queryRedRainMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryRedRainMoney', data))
}

//主账户转红包转账
function updateGameMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/updateGameMoney', data))
}

//红包转账转游戏账户
function transferInforRedRain(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedRain', data))
}

// 转账给好友
function transferInforRedRaintoUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedRaintoUser', data))
}

// 修改基本资料
function changeInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/changeInfo', data))
}

// 修改密码
function changePwd(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/changePwd', data))
}

// 获取银行卡信息
function getBankInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBankInfo', data))
}

// 绑定银行卡
function mainbandingBankno(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/mainbandingBankno', data))
}

// 站内信列表
function getMessageByUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getMessageByUser', data))
}

// 信件详情
function readMsg(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/readMsg', data))
}

// 发件箱
function saveBookDate(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/saveBookDate', data))
}

// 已签到列表查询
function findSignrecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findSignrecord', data))
}

// 一键回归
function oneKeyGameMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/oneKeyGameMoney', data))
}

//获得久安链接
function redirectUrl(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/redirectUrl', data))
}

// 短信找回密码
function getbackPwdByDx(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getbackPwdByDx', data))
}

// 邮箱找回密码
function getbackPwdByEmail(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getbackPwdByEmail', data))
}

// 短信找回账号
function getForgetAccbySms(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getForgetAccbySms', data))
}

//邮箱信找回账号
function getForgetAccbyEmail(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getForgetAccbyEmail', data))
}

//自助解冻账号
function unlockAccountByInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/unlockAccountByInfo', data))
}


export default {
  getNotice,
  login,
  logOut,
  getUser,
  getUserStatus,
  checkLogin,
  makeCall,
  register,
  getPayWay,
  getNewdeposit,
  commonDeposit,
  querySignAmount,
  doSignRecord,
  getGuestbookCountNew,
  queryQrcode,
  getBankInfoList,
  withdrawTwo,
  unBindBankinfo,
  getWithDrawBankStatus,
  getUserBalance,
  searchBankno,
  getUserToken,
  getGameMoney,
  queryPoints,
  queryProfit,
  queryRedRainMoney,
  transferInforRedRain,
  updateGameMoney,
  transferInforRedRaintoUser,
  changeInfo,
  changePwd,
  getBankInfo,
  mainbandingBankno,
  getMessageByUser,
  readMsg,
  saveBookDate,
  findSignrecord,
  oneKeyGameMoney,
  recharge,
  redirectUrl,
  getbackPwdByDx,
  getbackPwdByEmail,
  getForgetAccbySms,
  getForgetAccbyEmail,
  unlockAccountByInfo,
}
