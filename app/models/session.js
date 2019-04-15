const mongoose = require('mongoose')
const { Schema } = mongoose
const { Bidding } = require('./bidding')

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



sessionSchema.post('save', function (next) {
    const self = this
   // console.log('session post save self', self)
    const data = {
        session: self._id,
        product: self.product
    }
    console.log('post save session', data)
    const bidding = new Bidding(data)
    bidding.save()
        .then((res) => {
            //console.log('save bidding', res)
            next
        })
        .catch((err) => {
            console.log(err)
            next
        })

})

const Session = mongoose.model('Session', sessionSchema)

module.exports = {
    Session
}


