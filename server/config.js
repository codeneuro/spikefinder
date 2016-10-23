var format = require('util').format

var config = {
  s3: {
    access: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east'
  },
  db: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    name: 'spikefinder'
  }
}

var baseuri = 'mongodb://%s:%s@ds031007-a0.mlab.com:31007,ds031007-a1.mlab.com:31007/%s?replicaSet=rs-ds031007'
config.db.uri = format(baseuri, config.db.user, config.db.password, config.db.name)

module.exports = config