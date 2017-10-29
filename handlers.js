'use strict'

const _ = require('lodash')
const factory = require('midwest/factories/rest-handlers')
const resolver = require('deep-equal-resolver')()
const sql = require('easy-postgres/sql-helpers')
const { one } = require('easy-postgres/result')

const columns = [
  'id',
  'vatID',
  'taxID',
  'bankgiro',
  'plusgiro',
  'address',
  'email',
  'faxNumber',
  'legalName',
  'telephone',
  // 'alternateName',
  // 'description',
  // 'image',
  'name',
  'url',
  'createdAt',
  'createdById',
  'modifiedAt',
  'modifiedById',
]

const queries = require('./sql')

module.exports = _.memoize((state) => {
  const handlers = factory({
    db: state.db,
    emitter: state.emitter,
    table: 'organizations',
    exclude: ['findOne', 'update'],
    columns,
  })

  const columnsString = sql.columns(columns)

  function findOne () {
    return state.db.query(queries.get).then(one)
  }
  // changes properties passed on req.body
  // SHOULD be used with PATCH
  function update (id, json, client = state.db) {
    json = _.pickBy(json, (value, key) => columns.includes(key))

    if (json.address) {
      const arr = [
        json.address.building,
        json.address.area,
        json.address.street,
        json.address.locality,
        json.address.region,
        json.address.postalCode,
        json.address.country,
      ]

      json.address = '(' + arr.join(',') + ')'
    }

    const keys = _.keys(json).map((key) => `"${_.snakeCase(key)}"`)
    const values = _.values(json)

    const query = `UPDATE organizations SET ${keys.map((key, i) => `${key}=$${i + 1}`).join(', ')} WHERE id = $${keys.length + 1} RETURNING ${columnsString};`

    return client.query(query, [...values, id]).then((result) => {
      if (state.emitter) {
        state.emitter.emit('db', 'organizations')
      }

      return result
    })
  }

  return Object.assign({}, handlers, { findOne, update })
}, resolver)
