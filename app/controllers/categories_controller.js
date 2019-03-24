const express = require('express')
const router = express.Router()

const { Category } = require('../models/category')

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

router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id)
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

    Category.findByIdAndUpdate({ _id }, { $set: body })
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