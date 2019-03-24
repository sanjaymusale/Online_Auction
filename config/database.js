const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/onlinebidding', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })


module.exports = {
    mongoose
}