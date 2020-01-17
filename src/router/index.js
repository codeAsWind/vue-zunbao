import Vue from 'vue'
import Router from 'vue-router'
import maps from './map'
import beforeEach from './hook/beforeEach'
import afterEach from './hook/afterEach'

let error404 = () => import('@/pages/error/404')

Vue.use(Router)

const router = new Router({
  mode: 'history', //路由的 history 模式
  base:'/',
  linkActiveClass: 'active',
  routes: maps.concat([
    {
      path: "/404",
      component: error404
    },
    {
      path: "*",
      redirect: '/404',
    }
  ]),

})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
