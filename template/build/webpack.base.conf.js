'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const Entry = require('./webpack.entry.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  entry:Entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.less$/,
        use: [
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: process.env.NODE_ENV === 'production'
        ? {
          limit: 10000,
          name: utils.imgPath('img/[name].[hash:7].[ext]'),
          publicPath: config.build.cdnUrl
        }
        : {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: process.env.NODE_ENV === 'production'
        ? {
          limit: 10000,
          name: utils.imgPath('media/[name].[hash:7].[ext]'),
          publicPath: config.build.cdnUrl
        }
        : {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: process.env.NODE_ENV === 'production'
        ? {
          limit: 10000,
          name: utils.imgPath('fonts/[name].[hash:7].[ext]'),
          publicPath: config.build.cdnUrl
        }
        : {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
