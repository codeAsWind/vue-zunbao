import store from '@/store'

export default (to, from) => {
  //关闭loading态
  store.commit('SET_LOADINGSTATE',false)
}

