const path = require('path')
const { name } = require('./package')
let url = 'http://172.169.90.78:8087'  //  服务

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 8081

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },

    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}