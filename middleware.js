'use strict';

const _ = require('lodash');
const rest = require('midwest/factories/rest');
const formatQuery = require('midwest/factories/format-query');
const paginate = require('midwest/factories/paginate');
const resolveCache = require('./resolve-cache');

module.exports = _.memoize((config) => {
  const handlers = require('./handlers')(config);

  const mw = rest({
    plural: 'organizations',
    handlers,
  });

  async function create(req, res, next) {
    const user = await req.user;

    Object.assign(req.body, {
      createdById: user && user.id,
    });

    mw.create(req, res, next);
  }

  function update(req, res, next) {
    return handlers.update(1, req.body).then((row) => {
      // TODO return different status if nothing updated
      res.status(201).locals.organization = row;

      next();
    }).catch(next);
  }

  return Object.assign({}, mw, {
    create,
    update,
    formatQuery: formatQuery(['page', 'limit', 'sort']),
    paginate: paginate(handlers.count, 20),
  });
}, resolveCache);
