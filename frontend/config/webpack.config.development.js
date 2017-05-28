const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0'),
};

module.exports = merge(config, {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: path.join(__dirname, '../src/client.jsx'),
  devServer: {
    contentBase: path.join(__dirname, '../src/public'),
    historyApiFallback: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
