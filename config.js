var format = require('util').format
var assign = require('object-assign')
var debug = require('debug')('spikefinder')

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw Error('must specify AWS access keys')
}

if (!process.env.MONGO_USER || !process.env.MONGO_PASSWORD) {
  throw Error('must specify MONGO user and password')
}

var location = process.env.NODE_ENV || 'development'

var config = {
  development: {
    host: 'http://localhost:8080'
  },
  staging: {
    host: 'http://beta.spikefinder.codeneuro.org'
  },
  production: {
    host: 'http://spikefinder.codeneuro.org'
  }
}

var s3 = {
  access: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east'
}

var db = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  name: 'neurofinder'
}

var baseuri = 'mongodb://%s:%s@ds013829-a0.mlab.com:13829,ds013829-a1.mlab.com:13829/%s?replicaSet=rs-ds013829'
db.uri = format(baseuri, db.user, db.password, db.name)

module.exports = assign({}, config[location], s3, db)