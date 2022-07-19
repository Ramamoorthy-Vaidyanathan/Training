const Redis = require('redis')

const redisClient = Redis.createClient()

const connectRedisClient = async () => {
    await redisClient.connect()
}

connectRedisClient();

module.exports = { redisClient }