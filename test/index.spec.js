'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const request = require('./lib/request');
const Subdomain = require('../lib/subdomain');
const subdomainRouter = require('./lib/subdomainRouter');

const mocha = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('测试路由匹配', function () {

    beforeEach(function () {
        let app = new Koa();

        app.subdomainOffset = 2;
        app.proxy = true;
        app.use(subdomainRouter.routes());

        this.server = app.listen(8888);
    });

    afterEach(function () {
        this.server.close();
    });

    describe('# 测试一级子域名', function () {

        it('match one.example.com', function () {
            return request('one.example.com')
                .should
                .eventually
                .equal('one.example.com');
        });

        it('match two.example.com', function () {
            return request('two.example.com')
                .should
                .eventually
                .equal('two.example.com');
        });

    });

    describe('# 测试二级子域名', function () {

        it('match a.one.example.com', function () {
            return request('a.one.example.com')
                .should
                .eventually
                .equal('a.one.example.com');
        });

        it('match b.one.example.com', function () {
            return request('b.one.example.com')
                .should
                .eventually
                .equal('b.one.example.com');
        });

    });

    describe('# 测试根域名', function () {

        it('match example.com', function () {
            return request('example.com')
                .should
                .eventually
                .equal('example.com');
        });

    });

    describe('# 测试一级模糊匹配', function () {

        it('match *.example.com', function () {
            return request('test1.example.com')
                .should
                .eventually
                .equal('*.example.com');
        });

        it('match *.example.com', function () {
            return request('test2.example.com')
                .should
                .eventually
                .equal('*.example.com');
        });

    });

    describe('# 测试二级模糊匹配', function () {

        it('match *.one.example.com', function () {
            return request('test1.one.example.com')
                .should
                .eventually
                .equal('*.one.example.com');
        });

        it('match *.one.example.com', function () {
            return request('test2.one.example.com')
                .should
                .eventually
                .equal('*.one.example.com');
        });

        it('match one.*.example.com', function () {
            return request('one.test1.example.com')
                .should
                .eventually
                .equal('one.*.example.com');
        });

        it('match one.*.example.com', function () {
            return request('one.test2.example.com')
                .should
                .eventually
                .equal('one.*.example.com');
        });

    });

    describe('# 测试Not Found', function () {

        it('match a.b.c.example.com', function () {
            return request('a.b.c.example.com')
                .should
                .eventually
                .equal('Not Found');
        });

    });

    describe('# 测试端口号对subdomain的影响', function () {

        it('match one.example.com:8080', function () {
            return request('one.example.com:8080')
                .should
                .eventually
                .equal('one.example.com');
        });

    });

});

describe('测试异常处理', function () {

    it('测试sub不合法', function () {
        let app = new Koa(),
            s = new Subdomain(),
            r = new Router();

        app.subdomainOffset = 2;
        app.proxy = true;

        r.use('/', async() => {
        });

        (function () {
            s.use(888, r.routes());
        }).should.throw();

        (function () {
            s.use(r.routes());
        }).should.throw();

        (function () {
            s.use(null, r.routes());
        }).should.throw();

        (function () {
            s.use({}, r.routes());
        }).should.throw();
    });

    it('测试router不合法', function () {
        let app = new Koa(),
            s = new Subdomain();

        app.subdomainOffset = 2;
        app.proxy = true;

        (function () {
            s.use('*', 1);
        }).should.throw();

        (function () {
            s.use('*', 'router');
        }).should.throw();

        (function () {
            s.use('*', false);
        }).should.throw();
    });

});
