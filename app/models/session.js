const mongoose = require('mongoose')
const { Schema } = mongoose

const sessionSchema = new Schema({
    startSession: {
        type: Date
    },
    endSession: {
        type: Date
    },
    productId: {
        type: Schema.Type.ObjectId,
        ref: 'Product'
    },
    date: {
        type: Date
    }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = {
    Session
}