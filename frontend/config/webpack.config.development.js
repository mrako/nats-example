const webpack = require('webpack');
const path = require('path');

const { merge } = require('webpack-merge');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000'),
};

module.exports = merge(config, {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, '../src/index.jsx')],
  },
  devServer: {
    contentBase: path.join(__dirname, '../src/public'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
