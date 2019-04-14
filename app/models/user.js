const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4
    },

    lastName: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid Email'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 80
    },
    mobile: {
        type: String,
        minlength: 10,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    role: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }


})
userSchema.pre('validate', function (next) {
    let count
    if (this.isNew) {
        this.constructor.countDocuments((err, data) => {
            if (err) {
                return next(err)
            }
            count = data
            console.log('documents count', count)
        })
            .then(() => {
                if (count == 0) {
                    this.role = 'admin'
                    next()
                }
                else {
                    this.role = 'user'
                    next()
                }
            })
    }
    else {
        next()
    }
})

userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcryptjs.genSalt(10).then((salt) => {
            bcryptjs.hash(this.password, salt).then((hashedPassword) => {
                this.password = hashedPassword
                next()
            })
        })
    }
    else {
        next()
    }
})

userSchema.statics.findByEmailAndPassword = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            return Promise.resolve(user)
                        }
                        else {
                            return Promise.reject({ error : 'invalid email and password'})
                        }
                    })
            } else {
                return Promise.reject({error:'invalid email and password'})
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        userId: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(tokenData, 'onlinebidding19')
    user.tokens.push({
        token
    })

    return user.save().then((user) => {
        return token
    }).catch((err) => {
        return err
    })

}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'onlinebidding19')
    }
    catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData.userId
    })
        .then((user) => {
            var found = user.tokens.some(x => x.token === token)
            if (found) {
                return User.findOne({
                    '_id': tokenData.userId,
                    'tokens.token': token
                })
                    .then((user) => {
                        return Promise.resolve(user)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }
            else {
                return Promise.reject({ notice: 'redirect to login page' })
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })

}



const User = mongoose.model('User', userSchema)

module.exports = {
    User
}


