'use strict'

const getPort = require('get-port')

let port

module.exports = function (refresh) {
  if (port && !refresh) {
    return Promise.resolve(port)
  }

  return getPort().then(p => {
    port = p
    return p
  })
}
