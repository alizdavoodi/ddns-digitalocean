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
    return ddnsFixture.getAllRecords()
      .then(function (totalDomains) {
        const expected = ddnsFixture.domain;
        const reality = totalDomains.domains;

        //If does not return 404 means domains valid and exists
        assert.notEqual(allDomains, 404);
        assert.isOk(_.some(reality, { name: expected }));
        done();
      }).catch(function (e) {
        done(e);
      });
  });

  test('Check if given record exists', function (done) {
    return ddns.recordExists()
      .then(function (exists) {
        assert.isOk(exists);
      }).catch(function (e) {
        done(e);
      })
  });

});