const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  outputDir: 'docs',
  assetsDir: 'static',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/css/colors.less'),
      ]
    }
  },
  configureWebpack: config => {
    config.plugins.push(new CompressionPlugin({
      test: /\.js$|\.html$|\.css/,
      threshold: 10240,
      deleteOriginalAssets: false
    }))
  }
})
