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
    sellerId: {
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
    status: {
        type: String,
        default: 'Pending'
    },
    imageUrl: [
        {
            type: String,
            required: true

        }
    ]



})

const Product = mongoose.model('Product', productSchema)
module.exports = {
    Product
}