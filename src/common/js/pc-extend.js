import Vue from 'vue'
// 按需载入 element-ui组件 http://element-cn.eleme.io/#/zh-CN
import {
  Dialog,
  Message,
  MessageBox,
  Loading,
  Carousel,
  CarouselItem,
  Pagination,
  Button,
  Table,
  TableColumn,
  DatePicker
} from 'element-ui'

Vue.use(Loading.directive)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)

//定义共享方法
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$loading = Loading.service
Vue.prototype.$prompt = MessageBox.prompt

//全局样式
import '../../../theme/index.css'
import '@/common/stylus/index.styl'