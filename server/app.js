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
var config = require('./config')
var evaluate = require('./evaluate')

var Result = require('./models/result')
var Submission = require('./models/submission')

mongoose.connect(config.db.uri)
mongoose.Promise = global.Promise

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  app.use(express.static(path.join(__dirname, '../client')))
  app.use(parser.urlencoded({ extended: false }))
  app.use(parser.json({limit: '50mb'}))

  app.get('/api/results/', function (req, res) {
    Result.find({}, function (err, data) {
      return res.json(data)
    })
  })

  app.get('/api/submissions/', function (req, res) {
    Submission.find({}, function (err, data) {
      return res.json(data)
    })
  })

  app.post('/api/submit/', function (req, res) {
    var answers = req.body

    console.log('')
    debug('processing submission from ' + req.body.name)

    function checkFormat (next) {
      debug('checking format')
      if (!answers.contents || (answers.contents.length != 15)) 
        return next({stage: 'checking answers', error: 'invalid result format'})
      return next(null)
    }

    function computeResults (next) {
      debug('computing results')
      async.map(answers.contents, function (item, next) {
        evaluate(item.dataset, item.values, function (err, scores) {
          if (err) return next({stage: 'computing results', error: err})
          var reformatted = []
          _.forEach(scores, function (value, label) {
            reformatted.push({label: label, value: value})
          })
          var result = {
            dataset: item.dataset,
            scores: reformatted
          }
          return next(null, result)
        })
      }, function (err, results) {
        if (err) return next(err)
        return next(null, results)
      })
    }

    function sendResults (results, next) {
      debug('sending answers')
      var payload = {
        name: answers.name,
        contact: answers.contact,
        algorithm: answers.algorithm,
        repository: answers.repository,
        timestamp: timestamp(),
        contents: results
      }
      var result = new Result(payload)
      result.save(function (err, data) {
        if (err) return next({stage: 'sending results', error: err})
        return next(null)
      })
    }

    async.waterfall([
      checkFormat, computeResults, sendResults
    ], function (err) {
      if (err) {
        debug('failed and sending error message')
        if (err.stage === 'checking answers') return res.status(500).end(err.error)
        else if (err.stage === 'computing results') return res.status(500).end('failure evaulating, check your file!')
        else if (err.stage === 'sending results') return res.status(500).end('error posting')
        else return res.status(500).end('error parsing results')
      } else {
        debug('wrote result to db for ' + req.body.name)
        return res.status(200).end('submission succeeeded')
      }
    })
  })

  app.listen(port, function () {
    debug('serving on port ' + port)
  })
}

if (require.main === module) {
  start()
} else {
  module.exports = start
}
