const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  NODE_ENV
} = process.env;

const mongoUri = NODE_ENV === 'development'
  ? 'mongodb://localhost:27017,localhost:27018,localhost:27019/autoservice?replicaSet=rs'
  : `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

module.exports = new Adapter({
  mongoUri
})
