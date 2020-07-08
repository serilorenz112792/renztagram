const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserProfileSchema = schema({
    followers: [Object],
    following: [Object],
    userId: String,
    profileImageFile: {
        data: Buffer,
        contentType: String
    },
    profileImagePath: String,
    age: Number,
    birthday: String,
    gender: String,
    motto: String,
    isPrivate: Boolean,
    likedPost: [Object]
})


module.exports = UserProfile = mongoose.model('userprofile', UserProfileSchema)