const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authenticate')
const { Bidding } = require('../models/bidding')

router.get('/session/:id', (req, res) => {
    const id = req.params.id
    Bidding.findOne({ session: id }).populate('participant.user', 'firstName').populate('product')
        .then((response) => {
            //console.log('bid get', response)
            res.send(response)
        })
        .catch((err) => {
            res.send(err)
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
    Bidding.findOneAndUpdate({ session: id }, { $set: body }, { new: true }).populate('participant.user', 'firstName').populate('product')
        .then((bids) => {
            io.sockets.in(id).emit('updateBid', bids.participant);
            // console.log('post', bids)
            res.send(bids)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    biddingRouter: router
}