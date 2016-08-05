'use strict';

const request = require('./request');
const _ = require('lodash');

const ddns = function(options) {
  this.domain = options.domain;
  this.record = options.record;
  this.apiKey = options.apiKey;
};

ddns.prototype.domainExists = function(domain) {
  return request.getDomain(domain)
    .then(function(response) {
      return true;
    }).catch(function(e) {
      if (e.statusCode === 404) return false;

      return console.log(e.stack);
    });
};

ddns.prototype.recordExists = function(domain, data, type, name) {
  return request.getListOfDomainRecords(domain)
    .then(function(response) {
      const findObj = {data: data, name: name, type: type};
      const responseObj = JSON.parse(response).domain_records;
      return _.find(responseObj, findObj);
    }).catch(function(e) {
      if (e.statusCode === 404) {
        return false;
      }
      console.log(e.stack);
    });
};

//exports factory function
module.exports = function(options) {
  //Return instance of ddns
  return new ddns(options);
};
