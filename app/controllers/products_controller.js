const express = require('express')
const router = express.Router()

const { Product } = require('../models/product')
const { Session } = require('../models/session')
const { authenticateUser } = require('../middlewares/authenticate')
const { upload } = require('../middlewares/fileUpload')

const link = 'http://localhost:3001'


router.get('/', authenticateUser, (req, res) => {
    Product.find()
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/myproduct', authenticateUser, (req, res) => {
    Product.find({ sellerId: req.user._id })
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticateUser, upload.array('image', 3), (req, res) => {
    const body = req.body
    console.log(body)
    body.sellerId = req.user._id
    console.log(req)
    const image = []

    req.files.forEach(file => {
        const imageDest = file.destination
        const imageUrl = link + imageDest.slice(1) + file.filename
        image.push(imageUrl)
    })

    body.imageUrl = image
    const product = new Product(body)

    product.save()
        .then((product) => {
            body.productId = product._id
            Session.findOneAndUpdate({ date: body.date, startSession: body.startSession }, { $set: body })
                .then((session) => {
                    res.send({ product, session })
                })
                .catch((err) => {
                    console.log(err)
                })
            // res.send(product)

        })
        .catch((err) => {
            res.send(err)
        })

})


router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then((product) => {
            if (product) {
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
    Product.findByIdAndDelete(id)
        .then((product) => {
            if (product) {
                Session.findOneAndUpdate({ productId: product._id }, { $set: { isAlloted: false } })
                    .then((response) => {
                        res.send({ product, response })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                res.send({})
            }

        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, (req, res) => {
    const _id = req.params.id
    const data = req.body
    console.log(data)
    Product.findByIdAndUpdate({ _id }, { $set: data }, { new: true })
        .then((product) => {
            if (product) {
                res.send(product)
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