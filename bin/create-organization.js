#!/bin/env node

'use strict';

global.PWD = process.env.NODE_PWD || process.cwd();
global.ENV = process.env.NODE_ENV || 'development';

const p = require('path');

const chalk = require('chalk');
const _ = require('lodash');

const mongoose = require('mongoose');

const mongoConfig = require(p.join(PWD, 'server/config/mongo'));

const Organization = require('../model');

const successPrefix = `[${chalk.green('SUCCESS')}]`;
const errorPrefix = `[${chalk.red('ERROR')}]`;

function parseUrlEncoded(str) {
  return str && str.split('&').reduce((result, split) => {
    const [key, value] = split.split('=');

    if (value) {
      result[key] = value;
    }

    return result;
  }, {});
}

function createOrganization(urlEncoded) {
  let customSchema;

  if (urlEncoded) {
    customSchema = parseUrlEncoded(urlEncoded);
  }

  const organization = new Organization(customSchema);

  organization.save((err) => {
    if (err) {
      console.error(`${errorPrefix} Error saving organization to database:`);
      console.error(err);
      process.exit(1);
    } else if (customSchema) {
      console.info(`${successPrefix} Organization ${chalk.bold.blue(organization.name || organization.legalName || 'Untitled Organization')} has been created.`);
    } else {
      console.info(`${successPrefix} Organization ${chalk.bold.blue('Untitled Organization')} has been created.`);
    }
    process.exit(0);
  });
}

// mpromise (built in mongoose promise library) is deprecated,
// tell mongoose to use native Promises instead
mongoose.Promise = Promise;
// connect to mongodb
mongoose.connect(mongoConfig.uri, _.omit(mongoConfig, 'uri'), (err) => {
  if (err) {
    console.error(`${errorPrefix} Mongoose connection error:`);
    console.error(err);
    process.exit();
  }


  createOrganization(...process.argv.slice(2));
});
