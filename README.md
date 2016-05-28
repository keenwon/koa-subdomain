# koa-subdomain
Simple and lightweight Koa middleware to handle multilevel and wildcard subdomains.

## Installation

Install using npm:

```shell
npm install koa-subdomain --save
```

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

## Run test

```shell
git clone https://github.com/keenwon/koa-subdomain.git
cd koa-subdomain
npm install
npm test
```