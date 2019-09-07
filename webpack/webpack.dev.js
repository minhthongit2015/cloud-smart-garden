const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CLIENT_ENTRY, ENTRY_FILENAME } = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    // 'webpack/hot/dev-server',
    'react-hot-loader/patch',
    CLIENT_ENTRY
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    index: 'public/index.html',
    contentBase: './public',
    publicPath: '/',
    compress: true,
    port: 8080,
    liveReload: false,
    hot: true,
    inline: true,
    historyApiFallback: true,
    // lazy: true,
    filename: ENTRY_FILENAME,
    writeToDisk: false
  }
});
