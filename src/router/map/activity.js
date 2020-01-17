let vip = () => import('@/pages/activity/vip/vip.vue')
let movie = () => import('@/pages/activity/movie/movie.vue')
let national = () => import('@/pages/activity/national/national.vue')
let bbin = () => import('@/pages/activity/bbin/bbin.vue')
let casino = () => import('@/pages/activity/casino/casino.vue')
let upgrade = () => import('@/pages/activity/upgrade/upgrade.vue')
let jiuAn = () => import('@/pages/activity/jiu-an/jiu-an.vue')
let vipBirthday = () => import('@/pages/activity/vip-birthday/vip-birthday.vue')

export default [
  {
    path: '/activity/vip',
    component: vip
  },
  {
    path: '/activity/movie',
    component: movie
  },
  {
    path: '/activity/national',
    component: national
  },
  {
    path: '/activity/national',
    component: national
  },
  {
    path: '/activity/bbin',
    component: bbin
  },
  {
    path: '/activity/casino',
    component: casino
  },
  {
    path: '/activity/upgrade',
    component: upgrade
  },
  {
    path: '/activity/jiu-an',
    component: jiuAn
  },
  {
    path: '/activity/vip-birthday',
    component: vipBirthday
  }
]