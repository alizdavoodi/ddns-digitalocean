'use strict';

const config = require('../config/config.json');
const request = require('request-promise')

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
        return request.get(apiUrl, requestHeader);
    },

    getDomain: (doman) => {
        const apiUrl = `${baseUrl}/domains/${doman}`;
        return request.get(apiUrl, requestHeader);
    },

    createDoman: (domainName, ip) => {
        const apiUrl = `${baseUrl}/domains`;
        return request.post(apiUrl, requestHeader)
    },

    getListOfDomainRecords: (domain) => {
        const apiUrl = `${baseUrl}/domains/${domain}/records`;
        return request.get(apiUrl, requestHeader);
    },

    createDomainRecord: (type, name ,data) => {
        const apiUrl = `${baseUrl}/domains/${domain}/records`;
        return request.post(apiUrl, requestHeader);
    },
};

module.exports = urlApiRequest;