var fs = require('fs')
var tmp = require('tmp')
var path = require('path')
var exec = require('child_process').exec

module.exports = function (dataset, cb) {
  function write (dir, cb) {
    fs.writeFile(path.join(dir, dataset + '.csv'), JSON.stringify(a), function (err) {
      if (err) return cb(err)
      else cb()
    })
  }

  tmp.dir(function (err, dir) {
    write(dir, function () {
      var cmd = 'spikefinder evaluate ' + dir + '/' + dataset + '.csv ' + 'answers/' + dataset + '.csv'
      exec(cmd, function (err, stdout, stderr) {
        if (err) return cb(err)
        else if (stderr) return cb(err)
        else return cb(null, JSON.parse(stdout))
      })
    })
  })
}