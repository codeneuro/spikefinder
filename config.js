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

module.exports = config[location]