var webpack = require('webpack');

// import the devlopment config
var webpackConfig = require('./webpack.config.js');

var productionPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
];

// append production plugins to existing plugins
webpackConfig.plugins = webpackConfig.plugins.concat(productionPlugins);

// remove source maps
webpackConfig.devtool = null;

module.exports = webpackConfig;
