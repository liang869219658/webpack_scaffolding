'use strict';

var path = require("path");
var webpack = require('webpack');
var config = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var rootPath = config.commonPath.rootPath;     // 项目根目录
var srcPath = config.commonPath.srcPath;             // 开发源码目录
var publicPath = config.commonPath.public;

/**
 * output config
 * @type {String}
 */
config.output.filename = '[name].js';   //neme：入口文件名
config.output.chunkFilename = '[id].js';  //chunkFilename：除了入口模块外的模块      id： 模块id
config.output.publicPath = '/';

/**
 * devtool config
 * @type {[type]}
 */
config.devtool = 'cheap-eval-source-map';

/**
 * entry config
 * @type {Array}
 */
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  path.join(srcPath, "index.js")
];

/**
 * webpack-dev-server config
 * @type {Object}
 */
config.devServer = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  contentBase: publicPath,
  port: 8080,
  stats: { colors: true }
}

/**
 * loader config
 * @type {RegExp}
 */
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css'
}, {
  test: /\.less$/,
  loader: 'style!css!less'
});

config.plugins.push(
  new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(publicPath,'react-manifest.json')),
      name:'react_library'
  }),
  new webpack.optimize.OccurenceOrderPlugin(),  //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  new webpack.HotModuleReplacementPlugin(),     //全局开启代码热替换
  new webpack.NoErrorsPlugin(),         //防止报错的插件
  new ExtractTextPlugin('[name].css'),    //把css从js中独立抽离出来
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: 9090,
    proxy: 'http://127.0.0.1:9000/',
    logConnections: false,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
