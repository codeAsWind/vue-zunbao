const express = require('express')
const path = require('path')

// 测试地址
function getBaseUrl(mode) {
  let res = 'http://122.55.217.156:4520'
  switch(mode){
    case 1:
      res = 'http://122.55.217.156:4520'
      break
    case 2:
      res = 'http://zb2.mzc001.com'
      break
    case 3:
      res = 'https://zb11.com/'
  }
  return res
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: '/',

  // where to output built files
  outputDir: './dist',

  // where to put static assets (js/css/img/font/...)
  assetsDir: 'static',

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8000,
    // https: false,
    hotOnly: false,
    proxy: {
      '/1.0': {
        target: getBaseUrl(1),
        changeOrigin: true,
      }
    },
    before: app => {
      // `app` 是一个 express 实例
      let apiRouter = express.Router()
      let fs = require('fs')
      apiRouter.route('/:apiName').all((req, res) => {
        fs.readFile('./db.json', 'utf8', (err, data) => {
          if (err) throw err
          data = JSON.parse(data)
          if (data[req.params.apiName]) {
            res.json(data[req.params.apiName])
          } else {
            res.send('no such api name')
          }
        })
      })
      app.use('/api', apiRouter)
    },

  },

  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('vue$', 'vue/dist/vue.min')
      .set('MComponents', resolve('src/pages/mobile/components'))
  },

}