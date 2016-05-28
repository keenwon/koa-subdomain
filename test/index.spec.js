'use strict';

const mocha = require('mocha');
const setup = require('./lib/setup');
const request = require('./lib/request');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('Subdomain Test', function () {

    before(function () {
        setup();
    });

    describe('#测试一级子域名', function () {

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

    describe('#测试二级子域名', function () {

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

    describe('#测试根域名', function () {

        it('match example.com', function () {
            return request('example.com')
                .should
                .eventually
                .equal('example.com');
        });

    });

    describe('#测试一级模糊匹配', function () {

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

    describe('#测试二级模糊匹配', function () {

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

});
