const mongoose = require('mongoose')
const { Schema } = mongoose

const sessionSchema = new Schema({
    startSession: {
        type: String,
        required: true
    },
    endSession: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    date: {
        type: String,
        required: true
    },
    isAlloted: {
        type: Boolean,
        default: false
    }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = {
    Session
}