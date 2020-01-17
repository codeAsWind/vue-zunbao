import store from '@/store'

export default (to, from, next) => {
  if (to.path === '/mobile/user' || to.path === '/mobile/integral') {
    if (store.getters.isLogin) {
      //开启loading态
      store.commit('SET_LOADINGSTATE', true)
      next()
    } else {
      next({path: '/mobile/login'})
    }
  } else {
    //开启loading态
    store.commit('SET_LOADINGSTATE', true)
    next()
  }


}
