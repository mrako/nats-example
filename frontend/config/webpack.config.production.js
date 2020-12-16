const path = require('path');
const webpack = require('webpack');

const { merge } = require('webpack-merge');

const MinifyPlugin = require('babel-minify-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'https://xpense.hopefully.works'),
};

module.exports = merge(config, {
  mode: 'production',
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, '../src/index.jsx')],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ],
});
