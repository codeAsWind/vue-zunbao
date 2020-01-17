import {ajaxFactory} from './ajaxFactory'

export function checkAgentURLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkAgentURLogin', data))
}

export function getAppVersionCustomInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAppVersionCustomInfo', data))
}