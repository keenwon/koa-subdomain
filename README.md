# koa-subdomain

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]
[![Dependencies Status][dependencies-image]][dependencies-url]
[![Devdependencies Status][devdependencies-image]][devdependencies-url]

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

more example:

```javascript
const app = require('koa')();
const subdomain = require('koa-subdomain')();

// one.example.com
subdomain.use('one', router1);

// two.example.com
subdomain.use('two', router2);

subdomain
  .use('a.one', router3)  // a.one.example.com
  .use('b.one', router4); // b.one.example.com

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

Wildcard subdomains will be accessible under `wildcardSubdomains` in the state of koa context.

```javascript
const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const Router = require('koa-router');

const app = new Koa();
const subdomain = new Subdomain();
const router1 = new Router();
const router2 = new Router();

// get test.example.com
router1.get('/', async ctx => {
    // in body will stand "test"
    ctx.body = ctx.state.wildcardSubdomains[0];
});

// get foo.bar.example.com
router2.get('/', async ctx => {
    // in body will stand "foo bar"
    ctx.body = ctx.state.wildcardSubdomains.join(' ');
});

// *.example.com
subdomain.use('*', router1.routes());
subdomain.use('*.*', router2.routes());

app.use(subdomain.routes());
app.listen(8888);
```

**Note**: Koa has a `subdomainOffset` setting (2, by default), so the domain of the app is assumed to be the last two parts of the host. Here is an example when it is useful: if your app domain is `localhost:3000`, you need to change `subdomainOffset` to 1 for proper subdomain detection.

```js
const app = new Koa();

app.subdomainOffset = 1

// one.localhost:3000
subdomain.use('one', router);
```

## koa1

Install:

```shell
npm install koa-subdomain@1 --save
```

Usage:

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

## Run test

```shell
git clone https://github.com/keenwon/koa-subdomain.git
cd koa-subdomain
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/koa-subdomain.svg?style=flat-square&maxAge=3600
[npm-url]: https://www.npmjs.com/package/koa-subdomain
[travis-image]: https://img.shields.io/travis/keenwon/koa-subdomain.svg?style=flat-square&maxAge=3600
[travis-url]: https://travis-ci.org/keenwon/koa-subdomain
[coveralls-image]: https://img.shields.io/coveralls/keenwon/koa-subdomain.svg?style=flat-square&maxAge=3600
[coveralls-url]: https://coveralls.io/github/keenwon/koa-subdomain?branch=master
[download-image]: https://img.shields.io/npm/dm/koa-subdomain.svg?style=flat-square&maxAge=3600
[download-url]: https://npmjs.org/package/koa-subdomain
[dependencies-image]: https://img.shields.io/david/keenwon/koa-subdomain.svg?maxAge=3600&style=flat-square
[dependencies-url]: https://david-dm.org/keenwon/koa-subdomain
[devdependencies-image]: https://img.shields.io/david/dev/keenwon/koa-subdomain.svg?maxAge=3600&style=flat-square
[devdependencies-url]: https://david-dm.org/keenwon/koa-subdomain?type=dev
