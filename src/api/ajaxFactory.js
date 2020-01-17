import config from '@/common/js/config'
import axios from "axios"
import store from '@/store'

// 处理请求数据
axios.defaults.transformRequest = [function (data) {
  return JSON.stringify({data: data})
}]

//
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么

  //开启loading态
  store.commit('SET_LOADINGSTATE', true)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么

  //关闭loading态
  store.commit('SET_LOADINGSTATE', false)
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export function ajaxFactory(type, url, data) {
  let baseUrl = ''
  let reqConfig = {
    method: type,
    url: baseUrl + url,
    timeout: config.timeout,
    headers: config.headers,

  }
  data = data || null
  if (data) {
    if (type === 'get') {
      reqConfig.params = data
    } else {
      reqConfig.data = data
    }
  }
  return axios(reqConfig).then((res) => {
    return Promise.resolve(res.data)
  }).catch(function (error) {
    return Promise.resolve(error)
  })
}