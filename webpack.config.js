const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { isDevelopment } = require('./isDevelopment');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { SourceMapDevToolPlugin } = require('webpack');
const mergeWith = require('lodash.mergewith');
const config = {};

const commonConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    })
  ]
};

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

if (isDevelopment) {
  mergeWith(config, commonConfig, require('./webpackDevConfig'), customizer)
} else {
  mergeWith(config, commonConfig, require('./webpackDistConfig'), customizer)
}

module.exports = config;
