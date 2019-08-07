// const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const serverConfig = require('./src/server/config');

const BUILD_DIR = path.resolve(__dirname, `${serverConfig.publicFolder}`);
const APP_DIR = path.resolve(__dirname, 'src/client');
// const SERVER_DIR = path.resolve(__dirname, './src/server');

const mode = process.env.NODE_ENV || 'development';

const config = {
  target: 'web',
  mode,
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  entry: [
    '@babel/polyfill',
    'webpack/hot/dev-server',
    'react-hot-loader/patch',
    `${APP_DIR}/client.jsx`
  ],
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
  devServer: {
    index: 'public/index.html',
    contentBase: './public',
    // publicPath: '/',
    compress: true,
    port: 8080,
    liveReload: false,
    hot: true,
    historyApiFallback: true,
    // lazy: true,
    filename: 'client-bundle.js'
  },
  module: {
    rules: [
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
              data: '@import "global.scss";',
              includePaths: [
                path.resolve(APP_DIR, 'styles')
              ]
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
    // new CleanWebpackPlugin(),
    new CopyPlugin([
    ])
  ]
};

module.exports = config;
