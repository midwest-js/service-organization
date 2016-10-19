'use strict';

const router = new (require('express')).Router();

const mw = require('./middleware');

const { isAdmin } = require('midwest-module-membership/passport/authorization-middleware');

router.route('/')
  .get(mw.get)
  .patch(isAdmin, mw.update)
  .put(isAdmin, mw.update);

module.exports = router;
