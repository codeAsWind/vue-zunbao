import {ajaxFactory} from './ajaxFactory'

//推广链接
function getAgentExpandSite(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAgentExpandSite', data))
}

//日结佣金
function searchPtCommissions(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchPtCommissions', data))
}

//会员输赢
function searchagprofit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchagprofit', data))
}

//会员账务
function searchsubuserProposal(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchsubuserProposal', data))
}

//额度记录
function searchCreditlogs(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchCreditlogs', data))
}
//下线会员
function queryAgentSubUserInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryAgentSubUserInfo', data))
}

//提款平账
function agentWithdrawpz(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/agentWithdrawpz', data))
}




export default {
  getAgentExpandSite,
  searchPtCommissions,
  searchsubuserProposal,
  searchagprofit,
  searchCreditlogs,
  queryAgentSubUserInfo,
  agentWithdrawpz
}