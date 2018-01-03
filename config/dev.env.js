'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/dev"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"R0HrMSExcSMSlnVcPBptxNCwn6ImMqgT24EIzraD"',
  FRONT_URL: '"http://blog.mark"'
})