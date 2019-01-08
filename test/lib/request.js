'use strict'

const req = require('request')
const getPort = require('./getPort')

function request (uri) {
  let options = {
    headers: {
      'X-Forwarded-Host': uri
    }
  }

  return getPort().then(
    port =>
      new Promise(function (resolve, reject) {
        req.get(`http://localhost:${port}`, options, function (error, response, body) {
          if (error) {
            return reject(error)
          }

          return resolve(JSON.parse(body))
        })
      })
  )
}

module.exports = request
