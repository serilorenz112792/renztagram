const express = require('express')
const Post = require('../model/post')
const User = require('../model/user')
const router = express.Router()

const authentication = require('../middleware/authentication')

const upload = require('../middleware/multer')


router.get('/fetch-post', authentication, async (req, res) => {
    await Post.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to fetch posts!', error: err })
        })
})


router.get('/fetch-comment/', async (req, res) => {
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
    let newPost = {}
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
            imgPath: req.file.path
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

module.exports = router