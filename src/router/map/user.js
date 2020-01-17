let user = () => import('@/pages/user/index')
let userCenter = () => import('@/pages/user/user-center/user-center')
let deposit = () => import('@/pages/user/deposit/deposit.vue')
let transform = () => import('@/pages/user/transform/transform.vue')
let withdraw = () => import('@/pages/user/withdraw/withdraw.vue')
let discounts = () => import('@/pages/user/discounts/discounts.vue')
let appHandsel = () => import('@/pages/user/app-handsel/app-handsel.vue')
let accountList = () => import('@/pages/user/account-list/account-list.vue')
let redPacketTransform = () => import('@/pages/user/redPacket-transform/redPacket-transform.vue')
let letter = () => import('@/pages/user/letter/letter.vue')
let accountSettings = () => import('@/pages/user/account-settings/account-settings.vue')
let signLottery = () => import('@/pages/user/sign-lottery/sign-lottery.vue')
export default [
  {
    path: '/user',
    name: 'user',
    component: user,
    redirect:'/user/user-center',
    children:[
      {
        path:'user-center',
        component:userCenter
      },
      {
        path:'deposit',
        component:deposit
      },
      {
        path:'transform',
        component:transform
      },
      {
        path:'withdraw',
        component:withdraw
      },
      {
        path:'discounts',
        component:discounts
      },
      {
        path:'app-handsel',
        component:appHandsel
      },
      {
        path:'account-list',
        component:accountList
      },
      {
        path:'redPacket-transform',
        component:redPacketTransform
      },
      {
        path:'letter',
        component:letter
      },
      {
        path:'account-settings',
        component:accountSettings
      },
      {
        path:'sign-lottery',
        component:signLottery
      }
    ]
  }
]
