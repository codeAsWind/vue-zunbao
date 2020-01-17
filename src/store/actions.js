import * as types from './mutation-types'
import {saveLoginState,saveUserInfo} from '@/common/js/cache'

export function setLoginState({commit}, flag) {
  commit(types.SET_LOGIN, saveLoginState(flag))
}

export function setUserInfo({commit}, flag) {
  commit(types.SET_USERINFO, saveUserInfo(flag))
}


