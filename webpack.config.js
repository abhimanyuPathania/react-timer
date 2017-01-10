var webpack = require('webpack');

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
    alias: {
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      Timer: 'app/components/Timer.jsx',
      Countdown: 'app/components/Countdown.jsx',
      CountdownForm: 'app/components/CountdownForm.jsx',
      Clock: 'app/components/Clock.jsx',
      applicationStyles: 'app/styles/app.scss'
    },

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

  // set up source maps for debugging

  // cheap-module-eval-source-map
  // inline-source-map
  // eval-source-map
  devtool: 'inline-source-map'
};



