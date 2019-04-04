const mongoose = require('mongoose')
const { Schema } = mongoose

const sessionSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isAlloted: {
        type: Boolean,
        default: true
    }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = {
    Session
}