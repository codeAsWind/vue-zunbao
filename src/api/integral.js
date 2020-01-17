import {ajaxFactory} from './ajaxFactory'

//查询所有抽奖奖品
function getAllLuckyDrawPresent(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllLuckyDrawPresent', data))
}

//查询所哟兑换奖品
function getAllPointsPresents(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllPointsPresents', data))
}

//queryPoints
function queryPoints(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryPoints', data))
}

//getLevelSave
function getLevelSave(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getLevelSave', data))
}

//pointsRecord
function pointsRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pointsRecord', data))
}

//领取抽奖奖品
function completeLuckyDrawRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/completeLuckyDrawRecord', data))
}

//handleAddress
function handleAddress(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/handleAddress', data))
}

//积分消耗
function luckyDrawCost(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/luckyDrawCost', data))
}

//抽奖
function luckyDraw(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/luckyDraw', data))
}

//兑换
function pointsExchange(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pointsExchange', data))
}


export default {
  getAllLuckyDrawPresent,
  getAllPointsPresents,
  queryPoints,
  getLevelSave,
  pointsRecord,
  completeLuckyDrawRecord,
  handleAddress,
  luckyDrawCost,
  luckyDraw,
  pointsExchange

}
