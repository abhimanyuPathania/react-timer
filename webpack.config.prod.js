var webpack = require('webpack');
var path = require('path');

var webpackConfig = require('./webpack.config.js');

module.exports = {
  entry: [
    // load jquery and foundation before app.jsx
    // since jquery and foundation and normal scripts the are loaded with 'script!' loader
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],

  externals: {
    // let the module jquery be available as 'jQuery'
    // this lets foundation attack it's methods correctly to the jQuery object.
    jquery: 'jQuery'
  },

  plugins: [
    // the webpack provides plugin allows us to refer, here, the jquery module using '$' and 'jQuery'
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
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
  ],

  // this tells the output, packaged, file that used for deployment
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  resolve: {

    // alias lets us require our modules with simple names
    // here we can require the Main module by using simply using 'require("Main")' in any of our module
    root: __dirname,
    alias: webpackConfig.resolve.alias,

    // these are the type of files webpack is looking for
    extensions: ['', '.js', '.jsx']
  },
  
  module: {
    // loaders against which the files will run before packing
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        // webpack will run '.jsx' files with babel-loader
        test: /\.jsx?$/,
        // excludes following folders
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  // load foundation as scss using the sass loader
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  }
};



