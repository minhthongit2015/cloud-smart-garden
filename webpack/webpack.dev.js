const webpack = require('webpack');
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
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false
      },
      '/': {
        target: 'http://localhost:5000',
        secure: false,
        bypass: (req, res, proxyOptions) => {
          // console.log(req, res, proxyOptions);
          // if (req.headers.accept.indexOf('html') !== -1) {
          //   console.log('Skipping proxy for browser request.');
          //   return '/index.html';
          // }
        }
      }
    },
    liveReload: false,
    hot: true,
    inline: true,
    historyApiFallback: true,
    // lazy: true,
    filename: ENTRY_FILENAME,
    writeToDisk: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
