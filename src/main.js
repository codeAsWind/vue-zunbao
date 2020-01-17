import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './registerServiceWorker'

//公共资源模块
import '@/common/js/extend'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
