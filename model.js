'use strict';

const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema(require('mongopot/schemas/organization'));

OrganizationSchema.plugin(require('mongopot/plugins/base'));

module.exports = mongoose.model('Organization', OrganizationSchema);
