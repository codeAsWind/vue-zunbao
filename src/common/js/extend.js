import Vue from 'vue'
import config from '@/common/js/config'
import VueLazyload from 'vue-lazyload'
// 全局过滤器
import filters from './filters'

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('@/common/image/loading.jpg')
})

//定义共享属性
Vue.prototype.ERR_OK = config.ERR_OK
Vue.prototype.ERR_OK_OTHER = config.ERR_OK_OTHER


//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
