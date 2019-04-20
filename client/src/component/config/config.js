const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001'
console.log(process.env)
console.log(process.env.SERVER_URL)
console.log(process.env.MONGODB_URI)
module.exports = {
    SERVER_URL
}
