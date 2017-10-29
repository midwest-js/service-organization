'use strict'

const rsql = require('easy-postgres/require-sql')

const dir = __dirname

module.exports = {
  get: rsql('./get.sql', dir),
}
