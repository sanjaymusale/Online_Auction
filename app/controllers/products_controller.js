const express = require('express')
const router = express.Router()

const { Product } = require('../models/product')
const { Session } = require('../models/session')
const { authenticateUser } = require('../middlewares/authenticate')
const { upload } = require('../middlewares/fileUpload')

const link = 'http://localhost:3001'


router.get('/', authenticateUser, (req, res) => {
    Product.find().sort({ _id : -1}).populate('category').populate('session')
        .then((products) => {
            //console.log(products)
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/myproduct', authenticateUser, (req, res) => {
    Product.find({ seller: req.user._id }).sort({ _id : -1}).populate('category').populate('session')
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})



router.post('/', authenticateUser,upload.array('image', 3), (req, res) => {
    const body = req.body
    //console.log(req)
    //console.log(body)
    body.seller = req.user._id
    //console.log(req)
    const image = []
        //console.log('file',req.files)
    req.files.forEach(file => {
        const imageDest = file.location
        image.push(imageDest)
    })

    body.imageUrl = image
    const product = new Product(body)

    product.save()
        .then((product) => {
            body.productId = product._id
            // console.log('post product', body)

            res.send(product)

        })
        .catch((err) => {
            res.send(err)
        })

})


router.get('/:id', authenticateUser, (req, res) => {
    const _id = req.params.id
    //console.log('product get')
    Product.findOne({ _id }).populate('category').populate('session').populate('seller')
        .then((product) => {
            if (product) {
                // console.log(product)
                res.send(product)
            }
            else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})



router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Promise.all([Product.findByIdAndDelete(id), Session.findOneAndDelete({ product: id })])
        .then((response) => {
            //console.log(response)
            res.send(response)

        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, (req, res) => {
    const _id = req.params.id
    const data = req.body
    //console.log(data)
    Product.findByIdAndUpdate({ _id }, { $set: data }, { new: true })
        .then((product) => {
            if (product.status === 'Rejected') {
                Session.findOneAndUpdate({ productId: product._id }, { $set: { isAlloted: false } })
                    .then((response) => {
                        res.send({ product, response })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                res.send(product)
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    productsRouter: router
}
