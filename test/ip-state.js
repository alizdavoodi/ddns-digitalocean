/**
 * Created by alirezadavid on 8/11/16.
 */

'use strict';

const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const sinon = require('sinon');
const ipState = require('../lib/ip-state');
const nock = require('nock');
let state;

setup(function() {
  state = ipState();
});
suite('IP changer tests', function() {
  test('get global machine ip address', function(done) {
    const checkIpReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    state.getGlobalIp().then((ip) => {
      //Assert ip address with match assertion
      assert.match(ip, checkIpReg);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
