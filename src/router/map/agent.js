let agentManage = ()=> import('@/pages/agent-manage/index.vue')
let agentCenter = ()=> import('@/pages/agent-manage/agent-center/agent-center.vue')
let dayCommission = ()=> import('@/pages/agent-manage/day-commission/day-commission.vue')
let membership = ()=> import('@/pages/agent-manage/membership/membership.vue')
let quota = ()=> import('@/pages/agent-manage/quota/quota.vue')
let offlineMembers = ()=> import('@/pages/agent-manage/offline-members/offline-members.vue')
let withdrawal = ()=> import('@/pages/agent-manage/withdrawal/withdrawal.vue')
let accountSettings = ()=> import('@/pages/user/account-settings/account-settings.vue')
let letter = ()=> import('@/pages/user/letter/letter.vue')

let searchagprofit = ()=> import('@/pages/agent-manage/membership/searchagprofit/searchagprofit.vue')
let searchsubuserProposal = ()=> import('@/pages/agent-manage/membership/searchsubuserProposal/searchsubuserProposal.vue')
let withdraw = ()=> import('@/pages/agent-manage/membership/withdraw/withdraw.vue')
let vipBackwater = ()=> import('@/pages/agent-manage/membership/vipBackwater/vipBackwater.vue')
let vipPromo = ()=> import('@/pages/agent-manage/membership/vipPromo/vipPromo.vue')

export default [
  {
    path: '/agent-manage',
    name: 'agentManage',
    component: agentManage,
    redirect:'/agent-manage/agent-center',
    children:[
      {
        path:'agent-center',
        component:agentCenter
      },
      {
        path:'day-commission',
        component:dayCommission
      },
      {
        path:'membership',
        redirect:'membership/searchagprofit',
        component:membership,
        children:[
          {
            path:'searchagprofit',
            component:searchagprofit
          },
          {
            path:'searchsubuserProposal',
            component:searchsubuserProposal
          },
          {
            path:'withdraw',
            component:withdraw
          },
          {
            path:'vipBackwater',
            component:vipBackwater
          },
          {
            path:'vipPromo',
            component:vipPromo
          },
        ]
      },
      {
        path:'quota',
        component:quota
      },
      {
        path:'offline-members',
        component:offlineMembers
      },
      {
        path:'withdrawal',
        component:withdrawal
      },
      {
        path:'account-settings',
        component:accountSettings
      },
      {
        path:'letter',
        component:letter
      }
    ]
  }
]
