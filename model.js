'use strict'

const _ = require('lodash')

const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema(_.defaults({
  vatID: String,
  taxID: String,
  bankGiro: String,
  plusGiro: String,
}, require('mongopot/schemas/organization')))

OrganizationSchema.plugin(require('mongopot/plugins/base'))

module.exports = mongoose.model('Organization', OrganizationSchema)
