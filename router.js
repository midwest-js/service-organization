'use strict';

const router = new (require('express')).Router();

const mw = require('./middleware');

router.route('/')
  .get(mw.findOne)
  .post(mw.create)
  .patch(mw.update)
  .put(mw.update);

module.exports = router;
