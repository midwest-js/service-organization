'use strict';

// modules > midwest
const factory = require('midwest/factories/handlers');

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
  'dateCreated',
  'createdById',
  'dateModified',
  'modifiedById',
];

const config = require('./config');

const handlers = factory({
  db: config.db,
  emitter: config.emitter,
  table: 'organizations',
  columns,
});

module.exports = handlers;
