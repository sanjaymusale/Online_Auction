const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    minPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    session: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    status: {
        type: String,
        default: 'Pending'
    },
    imageUrl: [
        {
            type: String,
            required: true

        }
    ],
    sold: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            amount: {
                type: Number
            }
        }
    ]



})

const Product = mongoose.model('Product', productSchema)
module.exports = {
    Product
}