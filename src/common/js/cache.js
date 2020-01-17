import storage from 'good-storage'
import config from '@/common/js/config'

const IS_LOGIN_KEY = '__isLogin__'
const IS_AGENT_KEY = '__isAgent__'
const USER_INFO_KEY = '__userInfo__'


export function loadLoginState() {
  return storage.session.get(IS_LOGIN_KEY, false)
}

export function loadAgentState() {
  return storage.session.get(IS_AGENT_KEY, false)
}

export function loadUserInfo() {
  return storage.session.get(USER_INFO_KEY, config.userInfo)
}


export function saveLoginState(isLogin) {
  storage.session.set(IS_LOGIN_KEY, isLogin)
  return isLogin
}

export function saveAgentState(isAgent) {
  storage.session.set(IS_AGENT_KEY, isAgent)
  return isAgent
}

export function saveUserInfo(userInfo) {
  storage.session.set(USER_INFO_KEY, userInfo)
  return userInfo
}

