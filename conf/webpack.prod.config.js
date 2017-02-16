var webpack = require('webpack');
var config = require('./base');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * ouput config
 * @type {String}
 */
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';  //设置非入口文件的名字     chunkhash:6(根据模块名生成hash，并截取前6位)

/**
 * devtool config
 * @type {String}
 */
config.devtool = "cheap-source-map";

/**
 * loaders config
 * @type {RegExp}
 */
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!less')
});

/**
 * plugins config
 * @type {[type]}
 */
config.plugins.push(
  //官方：在webpack中拷贝文件和文件夹
  // stataic目录下静态资源的复制
  new CopyWebpackPlugin([ {
      context: config.commonPath.rootPath,
      from: 'static/*',   //定义要拷贝的源目录
      ignore: ['*.md']    //忽略的文件
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false     //不压缩警告信息
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),  //为组件分配id，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的id
  // 公共代码分离打包
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'mainifest']
  }),
  // 分离CSS和JS文件
  // 若要按需加载 CSS 则请注释掉该行
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks : true
  })
);

module.exports = config;
