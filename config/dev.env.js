'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/dev"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"Htu6eC9OY2DryM6uceeW3pz9Lpwv7FibTexvdONf"',
  FRONT_URL: '"http://127.0.0.1:8000"'
})