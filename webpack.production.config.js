var webpack = require('webpack');
var R = require('ramda');

var devConfig = require('./webpack.config');

module.exports = R.merge(devConfig, {
  entry: [
    './src/router'
  ],
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new webpack.IgnorePlugin(/un~$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
});
