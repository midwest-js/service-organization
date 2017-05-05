'use strict';

const _ = require('lodash');
const factory = require('midwest/factories/handlers');
const resolveCache = require('./resolve-cache');

const columns = [
  'id',
  'vatID',
  'taxID',
  'bankgiro',
  'plusgiro',
  // 'address',
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
];

module.exports = _.memoize((config) => {
  const handlers = factory({
    db: config.db,
    emitter: config.emitter,
    table: 'organizations',
    columns,
  });

  return handlers;
}, resolveCache);
