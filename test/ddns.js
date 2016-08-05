'use strict'

const chai = require('chai');
const assert = chai.assert;
const ddns = require('../lib/ddns');
const config = require('../config/config.json');
const _ = require('lodash');
const sinon = require('sinon');
const nock = require('nock');

suite('check existense domain and records', function() {
  let ddnsFixture;
  const baseUrl = `https://api.digitalocean.com/v2`;
  const apiObjReturn = {
    'domain_records': [
      {
        'id': 14575980,
        'type': 'A',
        'name': '@',
        'data': '178.62.86.107',
        'priority': null,
        'port': null,
        'weight': null
      },
      {
        'id': 14605497,
        'type': 'A',
        'name': 'docker',
        'data': '178.62.86.107',
        'priority': null,
        'port': null,
        'weight': null
      },
      {
        'id': 15066494,
        'type': 'A',
        'name': 'youtube',
        'data': '178.62.86.107',
        'priority': null,
        'port': null,
        'weight': null
      },
      {
        'id': 15777714,
        'type': 'CNAME',
        'name': 'www',
        'data': '@',
        'priority': null,
        'port': null,
        'weight': null
      },
      {
        'id': 15777712,
        'type': 'A',
        'name': 'example',
        'data': '127.0.0.1',
        'priority': null,
        'port': null,
        'weight': null
      },
      {
        'id': 16166524,
        'type': 'A',
        'name': 'blog',
        'data': '178.62.86.107',
        'priority': null,
        'port': null,
        'weight': null
      }
    ],
    'links': {},
    'meta': {
      'total': 8
    }
  };

  setup(function() {
    //Return factory function
    ddnsFixture = ddns({
      apiKey: config.apiKey,
      domain: config.domain,
      record: config.record
    });
  });

  test('check if domain exists', function(done) {
    //Mock request
    nock(baseUrl)
      .get('/domains/example.com')
      .reply(200);

    //Check if domain exists
    ddnsFixture.domainExists('example.com')
      .then(function(exists) {
        assert.isOk(exists);
        done();
      }).catch(function(e) {
        done(e);
      });
  });

  test('check if domain does not exists', function(done) {
    //Mock request
    nock(baseUrl)
      .get('/domains/example.com')
      .reply(404);

    //Check if domain exists
    ddnsFixture.domainExists('example.com')
      .then(function(exists) {
        assert.isNotOk(exists);
        done();
      }).catch(function(e) {
        done(e);
      });
  });

  test('check if record exists', function(done) {
    //Mock request
    nock(baseUrl)
      .get('/domains/example.com/records')
      .reply(200, apiObjReturn);

    ddnsFixture.recordExists('example.com', '127.0.0.1', 'A', 'example')
      .then(function(exists) {
        assert.isOk(exists);
        done();
      }).catch(function(e) {
        done(e);
      });
  });

  test('check if record does not exists in returned object', function(done) {
    //Mock request
    nock(baseUrl)
      .get('/domains/example.com/records')
      .reply(200, apiObjReturn);

    ddnsFixture.recordExists('example.com', '127.0.0.1', 'A', 'test')
      .then(function(exists) {
        assert.isNotOk(exists);
        done();
      }).catch(function(e) {
        done(e);
      });
  });

});
