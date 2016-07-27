'use strict';

const config = require('../config/config.json');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const baseUrl = `https://api.digitalocean.com/v2`;
const requestHeader = {
    headers: {
    'Content-Type': `application/json`,
    'Authorization': `Bearer ${config.apiKey}`
    }
};

const urlApiRequest = {
    getListOfDomains: () => {
        const apiUrl = `${baseUrl}/domanis`;

        return request.getAsync(apiUrl, requestHeader).then(function(domains) {
            return domains;
        }).catch(function(e) {
            console.log(e.stack);
        });
    },

    retrieveDoman: (doman) => {
        const apiUrl = `${baseUrl}/domains/${doman}`;

        return request.getAsync(baseUrl, requestheader).then(function(domain) {
            return domain;
        }).catch(function(e) {
            console.log(e.stack);
        });
    }
};