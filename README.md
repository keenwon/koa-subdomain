# koa-subdomain

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![gemnasium deps][gemnasium-image]][gemnasium-url] [![npm download][download-image]][download-url]

Simple and lightweight Koa middleware to handle multilevel and wildcard subdomains.

## Installation

Install using npm:

```shell
npm install koa-subdomain --save
```

[![xhr-plus](https://nodei.co/npm/koa-subdomain.png)](https://npmjs.org/package/koa-subdomain)

## Usage

use with [koa-router](https://github.com/alexmingoia/koa-router):

```javascript
const app = require('koa')();
const subdomain = require('koa-subdomain')();
const router = require('koa-router')();

router.get('/', function * () {
	this.body = 'one';
});

// one.example.com
subdomain.use('one', router.routes());

app.use(subdomain.routes());
app.listen(8888);
```

more example:

```javascript
const app = require('koa')();
const subdomain = require('koa-subdomain')();

// one.example.com
subdomain.use('one', router1);

// two.example.com
subdomain.use('two', router2);

// a.one.example.com
subdomain.use('a.one', router3);

// b.one.example.com
subdomain.use('b.one', router4);

// example.com
subdomain.use('', router5);

// *.example.com
subdomain.use('*', router6);

// *.one.example.com
subdomain.use('*.one', router7);

// one.*.example.com
subdomain.use('one.*', router8);

app.use(subdomain.routes());
app.listen(8888);
```

## koa2

Install:

```shell
npm install koa-subdomain@next --save
```

Usage:

```javascript
const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const Router = require('koa-router');

const app = new Koa();
const subdomain = new Subdomain();
const router = new Router();

router.get('/', async ctx => {
	ctx.body = 'one';
});

// one.example.com
subdomain.use('one', router.routes());

app.use(subdomain.routes());
app.listen(8888);
```

## Run test

```shell
git clone https://github.com/keenwon/koa-subdomain.git
cd koa-subdomain
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/koa-subdomain.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koa-subdomain
[travis-image]: https://img.shields.io/travis/keenwon/koa-subdomain.svg?style=flat-square
[travis-url]: https://travis-ci.org/keenwon/koa-subdomain
[coveralls-image]: https://img.shields.io/coveralls/keenwon/koa-subdomain.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/keenwon/koa-subdomain?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/keenwon/koa-subdomain.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/keenwon/koa-subdomain
[download-image]: https://img.shields.io/npm/dm/koa-subdomain.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-subdomain
