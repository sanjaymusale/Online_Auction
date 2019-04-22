const express = require('express')
const router = express.Router()

const { User } = require('../models/user')
const { authenticateUser } = require('../middlewares/authenticate')

const { authorization } = require('../middlewares/autherization')



router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)

    user.save()
        .then((user) => {
            res.send({
                user,
                notice: "Succesfully Registerd"
            })
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/login', (req, res) => {
    const body = req.body

    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => {
            //res.send(user)
            return user.generateToken()

        })
        .then((token) => {
            res.send({ token })
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})


router.get('/', authenticateUser, (req, res) => {
    User.find({ _id: req.user._id })
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, (req, res) => {
    const token = req.token
    // console.log(token)
    const user = req.user
    const tokenData = user.tokens.filter(x => x.token != token)
    user.tokens = tokenData
    //console.log(tokenData)
    user.save()
        .then((user) => {
          //  console.log(user)
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}
