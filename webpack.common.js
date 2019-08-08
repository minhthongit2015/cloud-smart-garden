const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  BUILD_DIR, STYLES_DIR, PUBLIC_DIR, CLIENT_PUBLIC_DIR
} = require('./webpack.config');

const webpackConfig = {
  target: 'web',
  // entry: {
  //   client: `${CLIENT_DIR}/client.jsx`
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
              includePaths: [STYLES_DIR]
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        use: 'url-loader?name=../fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=../images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: CLIENT_PUBLIC_DIR, to: PUBLIC_DIR }
    ])
  ]
};

module.exports = webpackConfig;
