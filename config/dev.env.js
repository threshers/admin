'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    service: {
        url: '"//192.168.7.188:9091"',
        ws: `"ws//192.168.7.188:8099/ws"`
    }
})
