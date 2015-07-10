var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:8888",
    'webpack/hot/only-dev-server',
    './src/router'
  ],
  devServer: {
    contentBase: './public/',
    historyApiFallback: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300
    },
    noInfo: true,
    port: 8888
    // proxy: {
    //   '/api/*': 'http://localhost:9000'
    // }
  },

  devtool: "eval",
  debug: true,
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    // you can require('myfile') instead of require('myfile.js')
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
  ],
  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.ico$/,
        loader: 'file-loader?name=assets/[name].[ext]?[hash]'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel?experimental=true&optional[]=runtime&optional[]=utility.inlineEnvironmentVariables&optional[]=minification.deadCodeElimination&stage=0']
      }
    ]
  }
};
