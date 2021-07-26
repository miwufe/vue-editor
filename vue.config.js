const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  filenameHashing: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/renderer/index.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  publicPath: './',
  productionSourceMap: false,
  // electron 配置
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.js',
      mainProcessWatch: ['src/main'],
      preload: 'src/main/preload.js',
      builderOptions: {
        productName: 'vue-editor',
        appId: 'com.yaotaiyang.vueeditor',
        dmg: {
          contents: [
            {
              'x': 410,
              'y': 150,
              'type': 'link',
              'path': '/Applications'
            },
            {
              'x': 130,
              'y': 150,
              'type': 'file'
            }
          ]
        },
        mac: {
          icon: 'public/build/icons/icon.icns'
        },
        win: {
          icon: 'public/build/icons/icon.icns'
        },
        linux: {
          icon: 'public/build/icons/icon.icns'
        }
      }
    }
  },
  // devServer: {
  //   open: 'true',
  //   proxy: {
  //     '/form': {
  //       ws: true,
  //       changeOrigin: true,
  //       target: 'http://10.206.218.110:8081'
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        moment: 'dayjs'
      }
    },
    externals: {
      videojs: 'videojs'
    },
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index')
    // 移除 preload 插件
    config.plugins.delete('preload-index')
    config.optimization.splitChunks({
      cacheGroups: {
        // vue、axios单独打包为vendor
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/](axios|vue.*)[\\/]/,
          chunks: 'all',
          priority: 10
        },
        // 其它node_modules 2次引用打包为common
        common: {
          name: 'chunk-common',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
          minChunks: 2
        }
      }
    })
  }
}
