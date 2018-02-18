const merge = require('webpack-merge')
const common = require('./webpack.common.babel.js')

module.exports = merge(common, {
  devtool: 'inline-source-map'
})
