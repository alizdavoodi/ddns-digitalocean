'use strict';

const request = require('./request');
const _ = require('lodash');

const ddns = function(options) {
  this.domain = options.domain;
  this.record = options.record;
  this.apiKey = options.apiKey;
  this.ip = options.ip;
  this.type = options.type || 'A';

  request.setApiKey(this.apiKey);
};

ddns.prototype.domainExists = function() {
  return request.getDomain(this.domain)
    .then(function() {
      return true;
    }).catch(function(e) {
      if (e.statusCode === 404) return false;

      return console.log(e.stack);
    });
};

ddns.prototype.recordExists = function() {
  return request.getListOfDomainRecords(this.domain)
    .then((response) => {
      const findObj = {data: this.ip, name: this.record, type: this.type};
      const responseObj = JSON.parse(response).domain_records;
      return _.find(responseObj, findObj);
    }).catch(function(e) {
      if (e.statusCode === 404) {
        return false;
      }
      console.log(e.stack);
    });
};

ddns.prototype.createDomain = function () {
  return this.domainExists(this.domain).then((result) => {
    if (result) {
      return {
        exists: 1
      };
    } else {
      return request.createDomain(this.domain, this.ip)
        .then(function(response) {
          return response;
        }).catch(function(e) {
          console.error(e.stack);
        });
    }
  }).catch(function(e) {
    console.error(e.stack);
  });
};

ddns.prototype.getIp = () => {
  return request.getGlobalIp()
    .then((ip) => {
      return ip;
    }).catch((e) => {
      console.error(e.stack);
    });
};

ddns.prototype.createDomainRecord = function() {
  return this.recordExists(this.ip, this.type, this.domain)
    .then((exists) => {
      if (exists) {
        return {
          exists: 1
        };
      } else {
        return request.createDomainRecord(this.domain, this.type, this.record, this.ip)
          .then((createdResult) => {
            return Object.assign({exists: 0}, createdResult);
          }).catch((e) => {
            console.log(e);
          });
      }
    }).catch((e) => {
      console.log(e.stack);
    });
};

//exports factory function
module.exports = function(options) {
  //Return instance of ddns
  return new ddns(options);
};
