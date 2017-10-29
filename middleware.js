'use strict'

const _ = require('lodash')
const rest = require('midwest/factories/rest-middleware')
const formatQuery = require('midwest/factories/format-query')
const paginate = require('midwest/factories/paginate')
const resolver = require('deep-equal-resolver')()

module.exports = _.memoize((config) => {
  const handlers = require('./handlers')(config)

  const mw = rest({
    plural: 'organizations',
    handlers,
  })

  async function create (req, res, next) {
    const user = await req.user

    Object.assign(req.body, {
      createdById: user && user.id,
    })

    mw.create(req, res, next)
  }

  function update (req, res, next) {
    return handlers.update(req.body.id, _.omit(req.body, 'id')).then((row) => {
      // TODO return different status if nothing updated
      res.status(200).locals.organization = row

      next()
    }).catch(next)
  }

  return Object.assign({}, mw, {
    create,
    update,
    formatQuery: formatQuery(['page', 'limit', 'sort']),
    paginate: paginate(handlers.count, 20),
  })
}, resolver)
