'use strict';

const lint = require('mocha-eslint');

var paths = ['lib/subdomain.js'];

var options = {
    formatter: 'compact',
    alwaysWarn: false,
    timeout: 5000,
    slow: 1000,
    strict: true
};

lint(paths, options);