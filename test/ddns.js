const chai = require('chai');
const assert = chai.assert;
const ddns = require('../lib/ddns');
const config = require('../config/config.json');
const _ = require('lodash');
const expectedAllRecordsLength = 8;
const expectedRecordExists = true;

suite('aware of domain and records', function () {
  let ddnsFixture;

  setup(function () {
    //Return factory function
    ddnsFixture = ddns({
      apiKey: config.apiKey,
      domain: config.domain,
      record: config.record
    });
  });

  test('check if domain exists', function (done) {
    return ddnsFixture.checkIfDomainExists()
      .then(function (totalDomains) {
        assert.isOk(totalDomains);
        done();
      }).catch(function (e) {
        done(e);
      });
  });

  test('check if record exists', function (done) {
    return ddns.recordExists()
      .then(function (exists) {
        assert.isOk(exists);
      }).catch(function (e) {
        done(e);
      })
  });

});