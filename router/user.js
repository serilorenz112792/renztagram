const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const router = express.Router()
const upload = require('../middleware/multer')
const UserProfile = require('../model/user-profile')
const Post = require('../model/post')
const authentication = require('../middleware/authentication')

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (firstName === '' || lastName === '' || email === '' || password === '') return res.status(400).json({ msg: 'All fields are requried!' })
    if (password.length < 8) return res.status(400).json({ msg: 'Password must be greated than or equal to 8 characters!' })
    const user = await User.findOne({ email: email })
    if (user) return res.status(400).json({ msg: 'Email is not available!' })
    const newUser = User({
        firstName,
        lastName,
        email,
        password
    })
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return json.status(400).json({ error: err })
        newUser.password = hash
        newUser.save()
            .then(() => {
                res.status(200).json({ msg: 'Registered successfully!' })
            })
            .catch(err => { res.status(400).json({ error: err }) })
    })
})
router.get('/fetch-users', authentication, async (req, res) => {
    await User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to fetch!', error: err })
        })
})
router.get('/user-profile', authentication, async (req, res) => {
    await UserProfile.find()
        .then((userProfiles) => {
            res.status(200).json(userProfiles)
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to fetch!', error: err })
        })
})

router.post('/user-profile', upload.single('profilePicture'), (req, res) => {
    const { userId, age, birthday } = req.body
    let userProfile = {}
    if (req.file === undefined || req.file.path === undefined) {
        userProfile = UserProfile({
            userId,
            age,
            birthday
        })
    }
    else {
        userProfile = UserProfile({
            userId,
            age,
            birthday,
            profileImagePath: req.file.path
        })
    }
    userProfile.save()
        .then(() => {
            res.status(200).json({ msg: 'Profile info saved!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to save user profile!', error: err })
        })
})

router.put('/user-edit-profile/:id', upload.single('profilePicture'), async (req, res) => {
    let userProfile = {}
    if (req.file === undefined || req.file.path === undefined) {
        userProfile = {
            userId,
            age,
            birthday
        }
    }
    else {
        userProfile = {
            userId,
            age,
            birthday,
            profileImagePath: req.file.path
        }
    }
    await UserProfile.findByIdAndUpdate(req.params.id)
        .then(() => {
            res.status(200).json({ msg: 'Profile info editted!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to edit user profile!', error: err })
        })
})


//ADD COMMENTS
router.post('/add-comment', async (req, res) => {
    const { email, userId, comment, postId, commentId } = req.body
    const newComment = {
        email, userId, comment, commentId
    }
    const post = await Post.findById(postId)
    post.comments.push(newComment)
    await post.save()
        .then(() => {
            res.status(200).json({ msg: 'Comment added!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to comment!', error: err })
        })
})


module.exports = router