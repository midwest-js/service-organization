'use strict';

const isAuthenticated = require('express-module-membership/passport/authorization-middleware').isAuthenticated;

const mw = require('./middleware');

module.exports = [
  [ '/api/organization', 'get', [ mw.get ]],
  [ '/api/organization', 'put', [ isAuthenticated, mw.update ]],
  [ '/api/organization', 'patch', [ isAuthenticated, mw.update ]]
];
