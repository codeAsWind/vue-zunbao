import {ajaxFactory} from './ajaxFactory'

//查询打卡记录
function findSignClockRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findSignClockRecord', data))
}

//打卡
function doSignClockRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/doSignClockRecord', data))
}



export default {
  findSignClockRecord,
  doSignClockRecord
}
