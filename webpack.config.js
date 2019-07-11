// const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const serverConfig = require('./src/server/config');

const BUILD_DIR = path.resolve(__dirname, `${serverConfig.publicFolder}/build`);
const APP_DIR = path.resolve(__dirname, './src/client');
// const SERVER_DIR = path.resolve(__dirname, './src/server');

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  entry: {
    client: `${APP_DIR}/client.jsx`
    // server: `${SERVER_DIR}/server.js`
  },
  output: {
    filename: '[name]-bundle.js',
    path: BUILD_DIR
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
    ])
  ]
};

module.exports = config;
