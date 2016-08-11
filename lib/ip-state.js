/**
 * Created by alirezadavid on 8/11/16.
 */

'use strict';

const request = require('./request');

const ipState = {
  getGlobalIp: () => {
    return request.getGlobalIp()
      .then((ip) => {
        return ip;
      }).catch((e) => {
        console.error(e.stack);
      });
  },

  checkIfIpChanged: function()  {
    const presentIp = this.getGlobalIp();
    if (this.ip === presentIp) return false;

    return true;
  }
};

module.exports = function(options) {
    return Object.assign(ipState, options);
  };
