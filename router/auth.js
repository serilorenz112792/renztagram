const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
require('dotenv').config()
const User = require('../model/user')


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email === '' || password === '') return res.status(400).json({ msg: 'All fields are required!' })
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: 'User does not exist!' })
    bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json({ msg: 'Username and password is incorrect!' })
        jwt.sign({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        }, process.env.SECRET_KEY, { expiresIn: '30m' },
            (err, token) => {
                if (err) return res.status(400).json({ error: err })
                return res.status(200).json({
                    msg: 'Login success',
                    token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                })
            })
    }).catch(err => { return res.status(400).json({ error: err }) })
})

router.get('/', authentication, async (req, res) => {
    await User.findById(req.user.id)
        .select('-password')
        .then((user) => { res.status(200).json(user) })
        .catch(err => { res.status(400).json({ error: err }) })
})

module.exports = router