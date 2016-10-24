var mongoose = require('mongoose')

module.exports = mongoose.model('Result', {
  name: String,
  contact: String,
  repository: String,
  algorithm: String,
  timestamp: Number,
  contents: [
    {
      dataset: String,
      scores: [
        {label: String, value: Number}
      ]
    }
  ],
})