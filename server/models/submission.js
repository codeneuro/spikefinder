var mongoose = require('mongoose')

module.exports = mongoose.model('Submission', {
  name: String,
  contact: String,
  repository: String,
  algorithm: String,
  timestamp: Number,
  contents: [
    {
      dataset: String,
      values: []
    }
  ]
})