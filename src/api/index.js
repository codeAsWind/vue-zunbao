import {ajaxFactory} from './ajaxFactory'

//checkConfigSystem
function checkConfigSystem(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkConfigSystem', data))
}

//banner
function getBannerData(data) {
  return Promise.resolve(ajaxFactory('post', '/api/banner', data))
}

//getShabSetting
function getShabSetting(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getShabSetting', data))
}

//getUserToken
function getUserToken(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserToken', data))
}

//获得久安链接
function redirectUrl(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/redirectUrl', data))
}

//addAgent
function addAgent(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addAgent', data))
}

//validateCodeForIndex
function validateCodeForIndex(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/validateCodeForIndex', data))
}

//电影
function getMoneyTime(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getMoneyTime', data))
}
//申请电影
function addUserMovie(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addUserMovie', data))
}



export default {
  checkConfigSystem,
  getBannerData,
  getShabSetting,
  getUserToken,
  addAgent,
  validateCodeForIndex,
  getMoneyTime,
  addUserMovie,
  redirectUrl
}
