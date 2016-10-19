'use strict';

const Organization = require('./model');

const _ = require('lodash');

function get(req, res, next) {
  if (!res.app.locals.organization) {
    Organization.findOne({}, (err, organization) => {
      res.app.locals.organization = organization;

      if (res.locals) res.locals.organization = organization;

      if (next) next();
    });
  } else {
    res.locals.organization = res.app.locals.organization;
    next();
  }
}

function update(req, res, next) {
  Organization.findOne({}, (err, organization) => {
    _.difference(_.keys(organization.toObject()), _.keys(req.body)).forEach((key) => {
      organization[key] = undefined;
    });

    _.extend(organization, _.omit(req.body, '_id', '__v'));

    return organization.save((err) => {
      if (err) return next(err);

      res.app.locals.organization = organization;

      return res.status(200).json(organization);
    });
  });
}

module.exports = {
  get,
  update,
};
