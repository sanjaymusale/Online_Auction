const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authenticate')
const { Bidding } = require('../models/bidding')

router.get('/session/:id', (req, res) => {
    const id = req.params.id
    Bidding.findOne({ session: id }).populate('product').populate('user').populate('session')
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/session/:id', (req, res) => {
    const id = req.param.id
    const data = req.body
    Bidding.findOneAndUpdate({ session: id }, { $set: data }, { new: true })
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = {
    biddingRouter: router
}