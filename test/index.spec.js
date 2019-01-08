'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const request = require('./lib/request')
const getPort = require('./lib/getPort')
const Subdomain = require('../lib/subdomain')
const subdomainRouter = require('./lib/subdomainRouter')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use(chaiAsPromised)

describe('测试路由匹配', function () {
  beforeEach(function (done) {
    let app = new Koa()

    app.subdomainOffset = 2
    app.proxy = true
    app.use(subdomainRouter.routes())

    app.use((ctx, next) => {
      if (!ctx.body) {
        ctx.body = JSON.stringify({
          domain: 'Not Found',
          wildcardSubdomains: []
        })
      }

      return next()
    })

    getPort(true).then(port => {
      this.server = app.listen(port)
      done()
    })
  })

  afterEach(function () {
    this.server.close()
  })

  describe('# 测试一级子域名', function () {
    it('match one.example.com', function () {
      const expect = {
        domain: 'one.example.com',
        wildcardSubdomains: []
      }

      return request('one.example.com').should.eventually.deep.equal(expect)
    })

    it('match two.example.com', function () {
      const expect = {
        domain: 'two.example.com',
        wildcardSubdomains: []
      }

      return request('two.example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试二级子域名', function () {
    it('match a.one.example.com', function () {
      const expect = {
        domain: 'a.one.example.com',
        wildcardSubdomains: []
      }

      return request('a.one.example.com').should.eventually.deep.equal(expect)
    })

    it('match b.one.example.com', function () {
      const expect = {
        domain: 'b.one.example.com',
        wildcardSubdomains: []
      }

      return request('b.one.example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试根域名', function () {
    it('match example.com', function () {
      const expect = {
        domain: 'example.com',
        wildcardSubdomains: []
      }

      return request('example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试一级模糊匹配', function () {
    it('match *.example.com', function () {
      const expect = {
        domain: '*.example.com',
        wildcardSubdomains: ['test1']
      }

      return request('test1.example.com').should.eventually.deep.equal(expect)
    })

    it('match *.example.com', function () {
      const expect = {
        domain: '*.example.com',
        wildcardSubdomains: ['test2']
      }

      return request('test2.example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试二级模糊匹配', function () {
    it('match *.one.example.com', function () {
      const expect = {
        domain: '*.one.example.com',
        wildcardSubdomains: ['test1']
      }

      return request('test1.one.example.com').should.eventually.deep.equal(expect)
    })

    it('match *.one.example.com', function () {
      const expect = {
        domain: '*.one.example.com',
        wildcardSubdomains: ['test2']
      }

      return request('test2.one.example.com').should.eventually.deep.equal(expect)
    })

    it('match one.*.example.com', function () {
      const expect = {
        domain: 'one.*.example.com',
        wildcardSubdomains: ['test1']
      }

      return request('one.test1.example.com').should.eventually.deep.equal(expect)
    })

    it('match one.*.example.com', function () {
      const expect = {
        domain: 'one.*.example.com',
        wildcardSubdomains: ['test2']
      }

      return request('one.test2.example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试 Not Found', function () {
    it('match a.b.c.example.com', function () {
      const expect = {
        domain: 'Not Found',
        wildcardSubdomains: []
      }

      return request('a.b.c.example.com').should.eventually.deep.equal(expect)
    })
  })

  describe('# 测试端口号对 subdomain 的影响', function () {
    it('match one.example.com:8080', function () {
      const expect = {
        domain: 'one.example.com',
        wildcardSubdomains: []
      }

      return request('one.example.com:8080').should.eventually.deep.equal(expect)
    })
  })
})

describe('测试异常处理', function () {
  it('测试 sub 不合法', function () {
    let app = new Koa()
    let s = new Subdomain()
    let r = new Router()

    app.subdomainOffset = 2
    app.proxy = true

    r.use('/', async () => {})

    ;(function () {
      s.use(888, r.routes())
    }.should.throw())

    ;(function () {
      s.use(r.routes())
    }.should.throw())

    ;(function () {
      s.use(null, r.routes())
    }.should.throw())

    ;(function () {
      s.use({}, r.routes())
    }.should.throw())
  })

  it('测试 router 不合法', function () {
    let app = new Koa()
    let s = new Subdomain()

    app.subdomainOffset = 2
    app.proxy = true

    ;(function () {
      s.use('*', 1)
    }.should.throw())

    ;(function () {
      s.use('*', 'router')
    }.should.throw())

    ;(function () {
      s.use('*', false)
    }.should.throw())
  })
})
