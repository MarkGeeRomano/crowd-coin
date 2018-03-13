const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/crowdCoin'
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
        include: [path.join(__dirname, 'client'), path.join(__dirname, 'ethereum')]
      },
      //json
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: path.join(__dirname),
      },
      //css
      {
        test: /\.css/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]__[hash:base64:5]',
      }
    ]
  },
  devtool: 'source-map'
};
