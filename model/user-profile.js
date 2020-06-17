const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserProfileSchema = schema({
    friends: [Object],
    userId: String,
    profileImagePath: String,
    age: Number,
    birthday: Date
})


module.exports = UserProfile = mongoose.model('userprofile', UserProfileSchema)