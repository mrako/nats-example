const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000'),
};

module.exports = merge(config, {
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/client.jsx'),
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/public/images'),
        to: 'images',
      },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  module: {
    loaders: [
    ],
  },
});
