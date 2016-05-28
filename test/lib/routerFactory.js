'use strict';

const router = require('koa-router');

module.exports = function (body) {
    var r = router();

    r.get('/', function *() {
        this.body = body;
    });

    return r;
};