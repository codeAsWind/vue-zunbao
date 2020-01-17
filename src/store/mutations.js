import * as types from './mutation-types'
import {saveLoginState,saveAgentState,saveUserInfo,savaThirdPay} from '@/common/js/cache'

const mutations = {
  [types.SET_LOGIN](state, flag) {
    state.isLogin = saveLoginState(flag)
  },

  [types.SET_AGENT_LOGIN](state, flag) {
    state.isAgent = saveAgentState(flag)
  },

  [types.SET_USERINFO](state, flag) {
    state.userInfo = saveUserInfo(flag)
  },

  [types.SET_IS_SHOW_COMMON_MODULE](state, flag) {
    state.isShowCommonModule = flag
  },

  [types.SET_IS_SHOW_MOBILE_COMMON_MODULE](state, flag) {
    state.isShowMobileCommonModule = flag
  },

  [types.SET_IS_SHOW_LOGIN_DIALOG](state, flag) {
    state.isShowLoginDialog = flag
  },

  [types.SET_SLOT_AMOUNT](state, flag) {
    state.slotAmount = flag
  },

  [types.SET_POINTS](state, flag) {
    state.points = flag
  },

  [types.SET_SIGNAMOUNT](state, flag) {
    state.signAmount = flag
  },

  [types.SET_UET_AMOUNT](state, flag) {
    state.uetAmount = flag
  },

  [types.SET_LOADINGSTATE](state, flag) {
    state.loadingState = flag
  },

  [types.SET_FAVORITE_GAME_LIST](state, flag) {
    state.favoriteGameList = flag
  },

  [types.SET_UNREAD_MESSAGE](state, flag) {
    state.unReadMessageNum = flag
  },

  [types.SET_JUAN_DATA](state, flag) {
    state.juanTokenData = flag
  },



}

export default mutations
