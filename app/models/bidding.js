const mongoose = require('mongoose')
const { Schema } = mongoose

const biddingSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    participant: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: {
            type: Number
        },

    }],
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Bidding = mongoose.model('Bidding', biddingSchema)

module.exports = {
    Bidding
}