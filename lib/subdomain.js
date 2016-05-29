'use strict';

const debug = require('debug')('koa-subdomain');

module.exports = Subdomain;

function Subdomain() {
    if (!(this instanceof Subdomain)) {
        return new Subdomain();
    }

    this.subs = [];
    this.middlewares = [];
}

Subdomain.prototype.use = function (sub, router) {

    if (typeof sub !== 'string' || !router || !isGeneratorFunction(router)) {
        throw new Error('Missing or wrong params!');
    }

    debug('sub domains: [%s]', sub);

    this.subs.push(sub.split('.'));
    this.middlewares.push(router);
};

Subdomain.prototype.routes = function () {
    var self = this;

    return function *(next) {
        var subdomains = this.subdomains.reverse(),
            matched = self.match(subdomains);

        if (matched) {
            yield matched.call(this, next);
        } else {
            yield next;
        }
    }
};

Subdomain.prototype.match = function (subdomains) {
    var subs = this.subs,
        middlewares = this.middlewares,
        result = null,
        matched,
        sub;

    // subdomain('', router) 匹配 example.com
    if (!subdomains.length) {
        subdomains.push('');
    }

    for (var i = 0, j = subs.length; i < j; i++) {
        sub = subs[i];
        matched = true;

        if (sub.length !== subdomains.length) {
            continue;
        }

        for (var s = 0, t = sub.length; s < t; s++) {
            if (sub[s] !== subdomains[s] && sub[s] !== '*') {
                matched = false;
                break;
            }
        }

        if (matched) {
            debug('match: %s', sub.join('.'));
            result = middlewares[i];
            break;
        }
    }

    return result;
};

function isGeneratorFunction(obj) {
    var constructor = obj.constructor;

    if (!constructor) {
        return false;
    }

    if ('GeneratorFunction' === constructor.name ||
        'GeneratorFunction' === constructor.displayName) {
        return true;
    }
}