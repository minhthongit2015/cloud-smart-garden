// const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const serverConfig = require('./src/server/config');

const BUILD_DIR = path.resolve(__dirname, `${serverConfig.publicFolder}/dist`);
const APP_DIR = path.resolve(__dirname, 'src/client');
// const SERVER_DIR = path.resolve(__dirname, './src/server');

const config = {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', `${APP_DIR}/client.jsx`],
  // entry: {
  //   client: `${APP_DIR}/client.jsx`
  //   // server: `${SERVER_DIR}/server.js`
  // },
  output: {
    filename: 'client-bundle.js',
    // filename: '[name]-bundle.js',
    path: BUILD_DIR
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              data: '@import "global";',
              includePaths: [
                path.resolve(APP_DIR, 'app/styles')
              ]
            }
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
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        use: 'url-loader?name=../fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=../images/[name].[ext]'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false
            }
          },
          {
            loader: 'file-loader?name=../images/[name].[ext]'
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
