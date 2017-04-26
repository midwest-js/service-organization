'use strict';

const router = new (require('express')).Router();

const mw = require('./middleware');

const { isAdmin } = require('midwest-module-membership/passport/authorization-middleware');

console.log(Object.keys(mw));

router.route('/')
  .get(mw.findOne)
  .post(isAdmin, mw.create)
  .patch(isAdmin, mw.update)
  .put(isAdmin, mw.update);

module.exports = router;
