const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authenticate')
const { Category } = require('../models/category')
const { Product } = require('../models/product')

router.get('/', (req, res) => {
    Category.find()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })

})

router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
            if (category) {
                Product.find({ category: id })
                    .then((product) => {
                        res.send({ category, product })
                    })
                    .catch((err) => {
                        res.send(err)
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

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((category) => {
            if (category) {
                res.send(category)
            }
            else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', (req, res) => {
    const _id = req.params.id
    const body = req.body

    Category.findOneAndUpdate({ _id }, { $set: body })
        .then((category) => {
            if (category) {
                res.send(category)
            }
            else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})







module.exports = {
    categoriesRouter: router
}