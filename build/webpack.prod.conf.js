var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const Entry = require('./webpack.entry.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')

var env = config.build.env
const prodWebpackConfig = {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // path: config.build.assetsRoot,
    // filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    path: config.build.assetsRoot,
    publicPath:'../',
    filename: '[name]' + utils.assetsPath('js/index.[chunkhash].js'),
    chunkFilename: '[name]' + utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../'), verbose: true }),
    new webpack.BannerPlugin('Qiangxie <361286383@qq.com>'),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger:config.build.debugger,
        drop_console:config.build.debugger
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      //filename: utils.assetsPath('css/[name].[contenthash].css')
      filename: '[name]'+utils.assetsPath('css/style.[contenthash].css')
      
    }),
    
    new CopyWebpackPlugin([
      // {
      //   from: path.resolve(__dirname, '../static'),
      //   to: config.build.assetsSubDirectory,
      //   ignore: ['.*']
      // }
    ])
  ]
}

Object.keys(Entry).forEach(chunkName =>{
  prodWebpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${chunkName}index.html`,
      template: 'index.html',
      inject:true,
      chunks:[chunkName]
    })
  )
})

const webpackConfig = merge(baseWebpackConfig, prodWebpackConfig)

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
