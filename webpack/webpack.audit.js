const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CLIENT_ENTRY } = require('./webpack.config');

module.exports = merge(common, {
  mode: 'production',
  entry: [
    '@babel/polyfill',
    CLIENT_ENTRY
  ],
  devtool: 'source-map'
});
