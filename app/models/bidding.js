const mongoose = require('mongoose')
const { Schema } = mongoose

const biddingSchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    participant: [{
        userId: {
            type: Schema.Types.ObjectId,

        },
        amount: {
            type: Number
        },
        ref: 'User'
    }],
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Bidding = mongoose.model('Bidding', biddingSchema)

module.exports = {
    Bidding
}