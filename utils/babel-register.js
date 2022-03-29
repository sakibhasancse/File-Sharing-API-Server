require('dotenv').config()
require('@babel/register')({
  configFile: './utils/babel.config.js'
})
require('@babel/polyfill')