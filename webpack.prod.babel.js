const merge = require('webpack-merge')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.babel.js')

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin()
  ]
})
