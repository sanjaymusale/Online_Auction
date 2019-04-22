const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onlinebidding'

//'mongodb+srv://<username>:<password>@cluster0-z3l82.mongodb.net/contact-manager?retryWrites=true'
//mongodb+srv://Sanjaynm69:Sanjaynm69@cluster0-1rctg.mongodb.net/online-aucyion?retryWrites=true
console.log('connectted',CONNECTION_URI)
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })


module.exports = {
    mongoose
}
