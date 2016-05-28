'use strict';

const req = require('request');

function request(uri) {

    var options = {
        'headers': {
            'X-Forwarded-Host': uri
        }
    };

    return new Promise(function (resolve, reject) {
        req.get('http://localhost:8888', options, function (error, response, body) {
            if (error) {
                return reject(error);
            }

            return resolve(body);
        });
    });
}

module.exports = request;