'use strict';

const rest = require('midwest/factories/rest');
const formatQuery = require('midwest/factories/format-query');
const paginate = require('midwest/factories/paginate');

const handlers = require('./handlers');

const mw = rest({
  plural: 'organizations',
  handlers,
});

function create(req, res, next) {
  Object.assign(req.body, {
    createdById: req.user.id,
  });

  mw.create(req, res, next);
}

function update(req, res, next) {
  console.log(req.body);
  return handlers.update(1, req.body).then((row) => {
    // TODO return different status if nothing updated
    res.status(201).locals.organization = row;

    next();
  }).catch(next);
}

module.exports = Object.assign({}, mw, {
  create,
  update,
  formatQuery: formatQuery(['page', 'limit', 'sort']),
  paginate: paginate(handlers.count, 20),
});
