import agent from './agent'
import user from './user'
import activity from './activity'
import mobile from './mobile'

let index = () => import('@/pages/index.vue')
let indexPage = () => import('@/pages/index/index.vue')

let gameLobby = () => import('@/pages/game-lobby/game-lobby.vue')
let real = () => import('@/pages/real/real.vue')
let sports = () => import('@/pages/sports/sports.vue')
let fishClassify = () => import('@/pages/fish-classify/fish-classify.vue')
let chess = () => import('@/pages/chess/chess.vue')
let promotion = () => import('@/pages/promotion/promotion.vue')
let about = () => import('@/pages/about/about.vue')

let register = () => import('@/pages/register/register.vue')
let welcome = () => import('@/pages/register/welcome.vue')

let integral = () => import('@/pages/integral/index.vue')
let integralIndex = () => import('@/pages/integral/integral-index/integral-index.vue')
let integralDetail = () => import('@/pages/integral/integral-detail/integral-detail.vue')
let integralExchange = () => import('@/pages/integral/integral-exchange/integral-exchange.vue')

let mapSite = () => import('@/pages/site-map/site-map.vue')
let safeCenter = () => import('@/pages/safe-center/safe-center.vue')
let newsPage = () => import('@/pages/news-page/news-page.vue')
let welfare = () => import('@/pages/welfare/welfare.vue')
let service = () => import('@/pages/service/service.vue')

let download = () => import('@/pages/download/download.vue')

let agentPage = () => import('@/pages/agent-page/agent-page.vue')


export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    redirect:'/index-page',
    component: index,
    children: [
      {
        path:'/index-page',
        component:indexPage
      },
      {
        path: '/slots',
        redirect: '/slots/pt'
      },
      {
        path: '/slots/:type',
        component: gameLobby
      },
      {
        path: '/real',
        component: real
      },
      {
        path: '/fish-classify',
        component: fishClassify
      },
      {
        path: '/chess',
        component: chess
      },
      {
        path: '/promotion',
        component: promotion
      },
      {
        path: '/register',
        component: register
      },
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/about',
        component: about
      },

      {
        path: '/safe-center',
        component: safeCenter
      },
      {
        path: '/news-page',
        component: newsPage
      },
      {
        path: '/welfare',
        component: welfare
      },
      {
        path: '/service',
        component: service
      },

      {
        path: '/agent',
        component: agentPage
      },
      {
        path: '/sports',
        component: sports
      },
      {
        path: '/site-map',
        component: mapSite
      },
      {
        path: '/download',
        component: download
      },
      {
        path: '/integral',
        redirect: '/integral/index',
        component: integral,
        children: [
          {
            path: 'index',
            component: integralIndex
          },
          {
            path: 'detail',
            name: 'detailPage',
            component: integralDetail
          },
          {
            path: 'exchangePage',
            name: 'exchangePage',
            component: integralExchange
          }
        ]
      },
      ...agent,
      ...user,
      ...activity,
    ]
  },
  ...mobile
]
