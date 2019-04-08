function authorization(req, res, next) {
    const user = req.user
    if (user.role == 'admin') {
        next()
    }
    else {
        res.status(403).send('only administration is acess')//for forbidden status code
    }
}
module.exports = {
    authorization
}