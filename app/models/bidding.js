const mongoose = require('mongoose')
const { Schema } = mongoose

const biddingSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    participant: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            amount: {
                type: Number
            }
        }
    ],
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

biddingSchema.methods.addParticipant = function (data) {
    const bidding = this
    //console.log('inside add participant', this)
    bidding.participant.push(data)

    return bidding.save()
        .then((bidding) => {
            return Promise.resolve(bidding)
        }).catch((err) => {
            return Promise.reject(err)
        })


}

const Bidding = mongoose.model('Bidding', biddingSchema)

module.exports = {
    Bidding
}