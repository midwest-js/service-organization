'use strict'

const rsql = require('@bmp/pg/require-sql')

const dir = __dirname

module.exports = {
  get: rsql('./get.sql', dir),
}
