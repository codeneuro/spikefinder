var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var async = require('async')
var express = require('express')
var mongoose = require('mongoose')
var parser = require('body-parser')
var timestamp = require('timestamp')
var jsonschema = require('jsonschema')
var spawn = require('child_process').spawn
var debug = require('debug')('spikefinder')
var config = require('../config')
// var evaluate = require('./evaluate')
// var schema = require('./schema')
// var Dataset = require('./models/dataset')
// var Answer = require('./models/answer')
// var Submission = require('./models/submission')

// mongoose.connect(config.db.uri)

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  app.use(express.static(path.join(__dirname, '../client')))
  app.use(parser.urlencoded({ extended: false }))
  app.use(parser.json({limit: '50mb'}))

  app.listen(port, function () {
    debug('serving on port ' + port)
  })

  app.get('/api/submissions/', function (req, res) {
    return res.json([])
  })
}

if (require.main === module) {
  start()
} else {
  module.exports = start
}
