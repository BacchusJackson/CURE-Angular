module.exports = {
    localDatabase: 'mongodb://localhost:27017/CURE',
    cloudDatabase: process.env.CURE_MONGO_URL,
    secret: 'yoursecret'
}