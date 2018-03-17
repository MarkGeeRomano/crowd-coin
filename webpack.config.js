const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/crowdCoin'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    // publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        loader: ['babel-loader'],
        include: [path.join(__dirname, 'client'), path.join(__dirname, 'ethereum')]
      },
      {
        test: /\.json$/,
        loader: ['json-loader'],
        include: path.join(__dirname),
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]__[hash:base64:5]',
      }
    ]
  }
};
