const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = schema({
    title: String,
    imgPath: String,
    imgFile: {
        data: Buffer,
        contentType: String
    },
    createdBy: {
        type: String
    },
    comments: [Object]

}, {
    timestamps: true
})

module.exports = mongoose.model('post', postSchema)