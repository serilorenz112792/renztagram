const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)