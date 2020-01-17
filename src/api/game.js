import {ajaxFactory} from './ajaxFactory'

//gameList
function getAllGames(data) {
  return Promise.resolve(ajaxFactory('post', '/api/game/gameConfig/list', data))
}

function getDtJackpot(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/dtJackpot', data))
}


function bbinLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/bbinLogin', data))
}

function vrLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/vrLogin', data))
}

function gameAginRedirect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameAginRedirect', data))
}

function gameMGLive(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGLive', data))
}

function getEbetToken(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getEbetToken', data))
}

function sbLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/sbLogin', data))
}

function PBUserLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/PBUserLogin', data))
}

function imLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/imLogin', data))
}

function fanyaLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/fanyaLogin', data))
}

function gameAginBuyuRedirect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameAginBuyuRedirect', data))
}

function mwgLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/mwgLogin', data))
}

function gameLoginDTFish(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameLoginDTFish', data))
}

function kyqpLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/kyqpLogin', data))
}

function cg761Login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/cg761Login', data))
}

function bitGameUserLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/bitGameUserLogin', data))
}

// 老虎机 QT
function gameQTForTp(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameQTForTp', data))
}

//PNG
function gamePNGFlashForTp(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePNGFlashForTp', data))
}

//SW
function gameLoginPtSky(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameLoginPtSky', data))
}

//PT
function loginGame(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/loginGame', data))
}

//NT
function loginNT(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/loginNT', data))
}

//TTG
function ttLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/ttLogin', data))
}

//DT
function gameLoginDT(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameLoginDT', data))
}

//MG
function gameMGS(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGS', data))
}

//MG -- mobile
function gameMGS4H5Desktop(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGS4H5Desktop', data))
}

//MG -- 3RD
function gameMGS43RD(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGS43RD', data))
}

//更新游戏收藏状态
function saveOrUpdateGameStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/saveOrUpdateGameStatus', data))
}

//查询游戏收藏状态
function queryGameStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryGameStatus', data))
}


export default {
  getAllGames,
  getDtJackpot,
  bbinLogin,
  vrLogin,
  gameLoginDTFish,
  kyqpLogin,
  cg761Login,
  mwgLogin,
  gameAginBuyuRedirect,
  fanyaLogin,
  imLogin,
  PBUserLogin,
  sbLogin,
  getEbetToken,
  gameMGLive,
  gameAginRedirect,
  bitGameUserLogin,
  gameQTForTp,
  gamePNGFlashForTp,
  gameLoginPtSky,
  loginGame,
  loginNT,
  ttLogin,
  gameLoginDT,
  gameMGS4H5Desktop,
  gameMGS,
  gameMGS43RD,
  saveOrUpdateGameStatus,
  queryGameStatus
}
