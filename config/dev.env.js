'use strict'
const merge = require('webpack-merge') // 用于合并对象 类似于Object.assign()
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
