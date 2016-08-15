/**
 * Created by alirezadavid on 8/11/16.
 */

'use strict';

const request = require('./request');

const ipState = {
  getGlobalIp: function() {
    return request.getGlobalIp();
  }
};

module.exports = ipState;

