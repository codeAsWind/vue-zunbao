//扩展方法
import Vue from 'vue'
import prototype from './prototype'
//等级
Vue.filter('level', function (val) {
  switch (val) {
    case 0:
      val = '新会员'
      break
    case 1:
      val = '青铜vip'
      break
    case 2:
      val = '白银vip'
      break
    case 3:
      val = '黄金vip'
      break
    case 4:
      val = '白金vip'
      break
    case 5:
      val = '钻石vip'
      break
    case 6:
      val = '王者VIP'
      break
  }
  return val
})

// 转换日期格式格式
Vue.filter('Date', function (val, format = 'yyyy-MM-dd') {
  if (!val) return new Date().format(format)
  return val.toString().toDate().format(format)
})


