let index = () => import('@/pages/mobile/index.vue')
let indexPage = () => import('@/pages/mobile/index/index.vue')
let noticePage = () => import('@/pages/mobile/notice-page/notice-page.vue')
let gameLobby = () => import('@/pages/mobile/game-lobby/game-lobby.vue')
let login = () => import('@/pages/mobile/login/login.vue')
let aboutUs = () => import('@/pages/mobile/about-us/about-us.vue')
let service = () => import('@/pages/mobile/service/service.vue')
let register = () => import('@/pages/mobile/register/register.vue')
let welcome = () => import('@/pages/mobile/register/welcome.vue')
let lineText = () => import('@/pages/mobile/line-text/line-text.vue')


// 活动专题
let activity = () => import('@/pages/mobile/activity/activity.vue')
let vip = () => import('@/pages/activity/vip/vip.vue')
let movie = () => import('@/pages/activity/movie/movie.vue')
let national = () => import('@/pages/activity/national/national.vue')
let bbin = () => import('@/pages/activity/bbin/bbin.vue')
let casino = () => import('@/pages/activity/casino/casino.vue')
let upgrade = () => import('@/pages/activity/upgrade/upgrade.vue')
let jiuAn = () => import('@/pages/activity/jiu-an/jiu-an.vue')
let vipBirthday = () => import('@/pages/activity/vip-birthday/vip-birthday.vue')

// 自助中心
let helpSelf = () => import('@/pages/mobile/help-self/help-self.vue')
let helpSelfForgetPwd = () => import('@/pages/mobile/help-self/forget-pwd.vue')
let helpSelfForgetAccount = () => import('@/pages/mobile/help-self/forget-account.vue')
let helpSelfUnBindAccount = () => import('@/pages/mobile/help-self/unbind-account.vue')
let helpSelfUnBindCard = () => import('@/pages/mobile/help-self/unbind-card.vue')


// 积分商城
let integral = () => import('@/pages/mobile/integral/integral.vue')

// 个人中心
let user = () => import('@/pages/mobile/user/user.vue')
let deposit = () => import('@/pages/mobile/user/deposit/deposit.vue')
let sign = () => import('@/pages/mobile/user/sign/sign.vue')


export default [
  {
    path: '/mobile',
    redirect: '/mobile/index',
    component: index,
    children: [
      {
        path: 'index',
        component: indexPage
      },
      {
        path: 'notice-page',
        component: noticePage
      },
      {
        path: 'slots',
        redirect: 'slots/pt'
      },
      {
        path: 'slots/:type',
        component: gameLobby
      },
      {
        path: 'login',
        component: login
      },
      {
        path: 'about-us',
        component: aboutUs
      },
      {
        path: 'service',
        component: service
      },

      {
        path: 'activity',
        component: activity
      },
      {
        path: 'help-self',
        component: helpSelf,
        meta: {
          title: '自助安全中心'
        },
        children: [
          {
            path: 'forget-pwd',
            component: helpSelfForgetPwd,
            meta: {
              title: '忘记密码'
            }
          },
          {
            path: 'forget-account',
            component: helpSelfForgetAccount,
            meta: {
              title: '忘记账号'
            }
          },
          {
            path: 'unbind-account',
            component: helpSelfUnBindAccount,
            meta: {
              title: '自助解冻账号'
            }
          },
          {
            path: 'unbind-card',
            component: helpSelfUnBindCard,
            meta: {
              title: '解绑银行卡'
            }
          },

        ]
      },
      {
        path: 'line-test',
        component: lineText
      },


      {
        path: 'integral',
        component: integral
      },

      {
        path: 'register',
        component: register
      },
      {
        path: 'welcome',
        component: welcome
      },

      {
        path: 'user',
        component: user,
        children: [
          {
            path: 'deposit',
            component: deposit
          },
          {
            path: 'sign',
            component: sign
          },
        ]
      },


      // 手机活动专题
      {
        path: 'activity/vip',
        component: vip
      },
      {
        path: 'activity/movie',
        component: movie
      },
      {
        path: 'activity/national',
        component: national
      },
      {
        path: 'activity/national',
        component: national
      },
      {
        path: 'activity/bbin',
        component: bbin
      },
      {
        path: 'activity/casino',
        component: casino
      },
      {
        path: 'activity/upgrade',
        component: upgrade
      },
      {
        path: 'activity/jiu-an',
        component: jiuAn
      },
      {
        path: 'activity/vip-birthday',
        component: vipBirthday
      },
    ]
  },

]