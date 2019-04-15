const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authenticate')
const { Bidding } = require('../models/bidding')

router.get('/session/:id', (req, res) => {
    const id = req.params.id
    Bidding.findOne({ session: id }).populate('participant.user', 'firstName').populate('product').populate('session')
        .then((response) => {
            //console.log('bid get', response)
            res.send(response)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/', authenticateUser, (req, res) => {
    Bidding.find().populate({
        path: "product",
        populate: {
            path: 'sold.user',

        }
    }).populate('participant.user').populate('session')
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            res.send(data)
        })
})
// router.post('/session/:id', authenticateUser, (req, res) => {
//     const id = req.params.id
//     const data = req.body
//     // console.log('before put data', data)
//     Bidding.findOne({ session: id }).populate('participant.user', 'firstName').populate('product')
//         .then((bidding) => {
//             // console.log('1st then', bidding)
//             return bidding.addParticipant(data)
//         })
//         .then((bidding) => {

//             // console.log('2nd then ', bidding)
//             res.send(bidding)
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })

router.put('/session/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body
    // console.log('put body', body)
    Bidding.findOneAndUpdate({ session: id }, { $set: body }, { new: true }).populate('participant.user', 'firstName').populate('product').populate('session')
        .then((bids) => {
            io.sockets.in(id).emit('updateBid', bids.participant);
            // console.log('post', bids)
            res.send(bids)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/user', authenticateUser, (req, res) => {
    const id = req.user._id
    Bidding.find({ 'participant.user': id }).populate('session').populate('participant.user').populate('product')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    biddingRouter: router
}