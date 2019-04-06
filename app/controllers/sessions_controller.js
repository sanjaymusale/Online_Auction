const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middlewares/authenticate')

const { Session } = require('../models/session')

router.get('/', authenticateUser, (req, res) => {
    Session.find()
        .then((sessions) => {
            res.send(sessions)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Session.findById(id)
        .then((sessions) => {
            if (sessions) {
                res.send(sessions)
            }
            else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/product/:id', (req, res) => {
    const id = req.params.id
    Session.findOne({ product: id }).populate('product')
        .then((sessions) => {
            //console.log(sessions)
            res.send(sessions)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req, res) => {
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

router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Session.findByIdAndDelete(id)
        .then((sessions) => {
            if (sessions) {
                res.send(sessions)
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
    const body = req.body
    Session.findOneAndUpdate({ _id }, body, { new: true })
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


