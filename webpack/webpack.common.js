const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const {
  BUILD_DIR, STYLES_DIR, PUBLIC_DIR, CLIENT_PUBLIC_DIR, ENTRY_FILENAME, CHUNK_FILENAME, PUBLIC_PATH
} = require('./webpack.config');

const webpackConfig = {
  target: 'web',
  output: {
    filename: ENTRY_FILENAME,
    chunkFilename: CHUNK_FILENAME,
    path: BUILD_DIR,
    publicPath: PUBLIC_PATH
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
        // use: 'url-loader?name=fonts/[name].[ext]'
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({}),
    new CopyPlugin([
      { from: CLIENT_PUBLIC_DIR, to: PUBLIC_DIR }
    ]),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'beyond-garden.com',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: '/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      }
    )
  ]
};

module.exports = webpackConfig;
