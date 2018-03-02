const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/boilerPlate'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js/,
      loaders: ['babel'],
      include: [ path.join(__dirname, 'client')]
    },
    //json
    {
      test: /\.json$/,
      loader: 'json-loader',
      include: path.join(__dirname),
    }
    ]
  }
};
