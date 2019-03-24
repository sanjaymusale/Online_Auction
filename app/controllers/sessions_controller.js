const express = require('express')
const router = express.Router()

const { Session } = require('../models/session')

router.get('/', (req, res) => {
    Session.find({
        productId: req.product._id

    })
        .then((sessions) => {
            res.send(sessions)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    sessionsRouter: router
}


