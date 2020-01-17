import Vue from 'vue'
import VHeader from 'MComponents/v-header/v-header'
import fastclick from 'fastclick'
import {
  Header, Toast,MessageBox,Button
} from 'mint-ui'

import {Pagination} from 'element-ui'
Vue.use(Pagination)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component('v-header', VHeader)

Vue.prototype.$toast = Toast
Vue.prototype.$message = Toast
Vue.prototype.$msgbox = MessageBox
fastclick.attach(document.body)
import 'mint-ui/lib/style.css'
import '@/common/stylus/index.styl'