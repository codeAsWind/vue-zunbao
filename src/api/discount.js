import {ajaxFactory} from './ajaxFactory'

//getYouHuiConfig 优惠查询
function getYouHuiConfig(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getYouHuiConfig', data))
}

//getSelfYouHuiObject 自助存送
function getSelfYouHuiObject(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getSelfYouHuiObject', data))
}

//getOnekeyData 自助存送
function getOnekeyData(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getOnekeyData', data))
}

//oneKeyXimaNew 一键返水
function oneKeyXimaNew(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/oneKeyXimaNew', data))
}

//queryPTLosePromoReccords 救援金
function queryPTLosePromoReccords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryPTLosePromoReccords', data))
}

//transferInforCoupon 存送优惠券
function transferInforCoupon(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforCoupon', data))
}

//transferInforRedCoupon 红包优惠券
function transferInforRedCoupon(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedCoupon', data))
}

//checkActivityInfo 获取免费筹码
function checkActivityInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkActivityInfo', data))
}

//applyActivity 领取免费筹码
function applyActivity(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/applyActivity', data))
}

//queryBetOfPlatform 本月投注额
function queryBetOfPlatform(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryBetOfPlatform', data))
}

//checkUpgrade 检查升级
function checkUpgrade(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkUpgrade', data))
}

//获取生日礼金及id
function checkBirthday(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkBirthday', data))
}

//领取生日礼金
function birthdayActivityInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/birthdayActivityInfo', data))
}

// 领取救援金
function optLosePromo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/optLosePromo', data))
}


export default {
  getYouHuiConfig,
  getSelfYouHuiObject,
  getOnekeyData,
  oneKeyXimaNew,
  queryPTLosePromoReccords,
  transferInforCoupon,
  transferInforRedCoupon,
  checkActivityInfo,
  applyActivity,
  queryBetOfPlatform,
  checkUpgrade,
  checkBirthday,
  birthdayActivityInfo,
  optLosePromo

}