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

router.post('/session/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log('before put data', data)
    Bidding.findOne({ session: id })
        .then((bidding) => {
            //console.log('1st then', bidding)
            return bidding.addParticipant(data)
        })
        .then((bidding) => {
            //console.log('2nd then ', bidding)
            res.send(bidding)
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = {
    biddingRouter: router
}