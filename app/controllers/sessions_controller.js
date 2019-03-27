const express = require('express')
const router = express.Router()

const { Session } = require('../models/session')

router.get('/', (req, res) => {
    Session.find()
        .then((sessions) => {
            res.send(sessions)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/product/:id', (req, res) => {
    const id = req.params.id
    Session.findOne({ productId: id })
        .then((sessions) => {
            res.send(sessions)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const data = req.body
    const sessions = new Session(data)
    sessions.save()
        .then((session) => {
            res.send(session)
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = {
    sessionsRouter: router
}


