const express = require('express')
const Post = require('../model/post')
const User = require('../model/user')
const UserProfile = require('../model/user-profile')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const authentication = require('../middleware/authentication')

const upload = require('../middleware/multer')
const userProfile = require('../model/user-profile')


router.get('/fetch-post', authentication, async (req, res) => {



    await Post.find()
        .then((posts) => {
            res.status(200).json(posts)


        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to fetch posts!', error: err })
        })
})


router.get('/fetch-comment/', authentication, async (req, res) => {
    await Post.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

router.post('/add-post', upload.single('postImage'), authentication, async (req, res) => {

    const { title, userId } = req.body

    const img = fs.readFileSync(req.file.path)
    const encodeImg = img.toString('base64')
    //console.log("encondeimg", encodeImg)
    const type = req.file.mimetype

    // console.log("IMG", img)
    // let newPost = {}
    if (req.file === undefined || req.file.path === undefined) {
        newPost = Post({
            title,
            createdBy: userId
        })
    }
    else {
        newPost = Post({
            title,
            createdBy: userId,
            imgPath: req.file.path,
            imgFile: {
                data: new Buffer(encodeImg, 'base64'),
                contentType: type
            }
        })
    }
    newPost
        .save()
        .then(() => {
            res.status(200).json({ msg: 'Post created!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to created!', error: err })
        })
})

//IMAGE FILE PATH ONLY
// router.post('/add-post', upload.single('postImage'), authentication, async (req, res) => {
//     const { title, userId } = req.body
//     let newPost = {}
//     if (req.file === undefined || req.file.path === undefined) {
//         newPost = Post({
//             title,
//             createdBy: userId
//         })
//     }
//     else {
//         newPost = Post({
//             title,
//             createdBy: userId,
//             imgPath: req.file.path
//         })
//     }
//     newPost
//         .save()
//         .then(() => {
//             res.status(200).json({ msg: 'Post created!' })
//         })
//         .catch(err => {
//             res.status(400).json({ msg: 'Failed to created!', error: err })
//         })
// })

router.patch('/edit-post/:id', upload.single('postImage'), authentication, async (req, res) => {
    const { title } = req.body
    let edittedPost = {}
    if (req.file === undefined || req.file.path === undefined) {
        edittedPost = {
            title
        }
    }
    else {
        edittedPost = {
            title,
            imgPath: req.file.path
        }
    }
    await Post.findByIdAndUpdate(req.params.id, edittedPost)
        .then(() => {
            res.status(200).json({ msg: 'Post updated!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to update post', error: err })
        })

})

router.delete('/delete-post/:id', authentication, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ msg: 'Post deleted!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to delete post!', error: err })
        })
})


router.put('/like-post/:id', authentication, async (req, res) => {
    const { userId } = req.body
    const user = await User.findOne({ _id: userId }).select("-password")
    const post = await Post.findOne({ _id: req.params.id })

    await post.likedBy.push(user)

    await UserProfile.findOne({ userId }).then((userP) => {
        userP.likedPost.push(post)
        userP.save()
        post.save().then(() => res.status(200).json({ msg: 'You liked this post!' })).catch(err => res.status(400).json({ error: err }))
    })
})

router.put('/unlike-post/:id', authentication, async (req, res) => {
    const { userId } = req.body
    console.log("req.params.id", req.params.id)
    await UserProfile.update({ userId: userId }, { $pull: { likedPost: { _id: mongoose.Types.ObjectId(req.params.id) } } })
        .then(() => console.log("updated"))
    await Post.update({ _id: req.params.id }, { $pull: { likedBy: { _id: mongoose.Types.ObjectId(userId) } } })
        .then(() => res.status(200).json({ msg: 'You unliked this post!' }))
        .catch(err => res.status(400).json({ error: err }))
})

module.exports = router