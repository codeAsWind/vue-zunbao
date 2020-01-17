import {ajaxFactory} from './ajaxFactory'

// 在线存款记录
function depositRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/depositRecords', data))
}

// 手工存款记录
function cashinRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/cashinRecords', data))
}

// 附言存款记录
function depositOrderRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/depositOrderRecord', data))
}

// 提款记录
function withdrawRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/withdrawRecords', data))
}

// 户内转账记录
function transferRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferRecords', data))
}

// 优惠记录
function consRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/consRecords', data))
}

// 自助返水记录
function searchXima(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchXima', data))
}

// 存送优惠记录
function couponRecords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/couponRecords', data))
}

export default {
  depositRecords,
  cashinRecords,
  depositOrderRecord,
  withdrawRecords,
  transferRecords,
  consRecords,
  searchXima,
  couponRecords,
}