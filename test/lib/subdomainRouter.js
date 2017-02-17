'use strict';

const Subdomain = require('../../lib/subdomain');
const subdomain = new Subdomain();
const Router = require('koa-router');

module.exports = subdomain;

// one.example.com
subdomain.use('one', routerFactory('one.example.com'));

// two.example.com
subdomain.use('two', routerFactory('two.example.com'));


// a.one.example.com
subdomain.use('a.one', routerFactory('a.one.example.com'));

// b.one.example.com
subdomain.use('b.one', routerFactory('b.one.example.com'));


// example.com
subdomain.use('', routerFactory('example.com'));


// *.example.com
subdomain.use('*', routerFactory('*.example.com'));

// *.one.example.com
subdomain.use('*.one', routerFactory('*.one.example.com'));

// one.*.example.com
subdomain.use('one.*', routerFactory('one.*.example.com'));

function routerFactory(body) {
    let r = new Router();

    r.get('/', async ctx => {
        ctx.body = body;
    });

    return r.routes();
}