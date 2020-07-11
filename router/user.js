const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const router = express.Router()
const upload = require('../middleware/multer')
const UserProfile = require('../model/user-profile')
const Post = require('../model/post')
const authentication = require('../middleware/authentication')
const fs = require('fs')

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (firstName === '' || lastName === '' || email === '' || password === '') return res.status(400).json({ msg: 'All fields are requried!' })
    if (password.length < 8) return res.status(400).json({ msg: 'Password must be greated than or equal to 8 characters!' })
    const user = await User.findOne({ email: email })
    if (user) return res.status(400).json({ msg: 'Email is not available!' })

    const newUser = User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password
    })
    let newUserProfile = UserProfile({
        followers: [],
        following: [],
        userId: '',
        profileImageFile: {
            data: [],
            contentType: ''
        },
        profileImagePath: '',
        age: 0,
        birthday: new Date().toISOString(),
        gender: 'Male',
        motto: '',
        isPrivate: false,
        likedPost: []
    })
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return json.status(400).json({ error: err })
        newUser.password = hash
        const newU = await newUser.save()
        newUserProfile.userId = newU._id
        await newUserProfile.save()
            .then(() => {
                res.status(200).json({ msg: 'Registered successfully!' })
            })
            .catch(err => { res.status(400).json({ error: err }) })
    })
})
router.get('/fetch-users', authentication, async (req, res) => {
    await User.find()
        .select('-password')
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

router.put('/edit-profile-picture', upload.single('profilePicture'), authentication, async (req, res) => {
    const { userId } = req.body
    let img
    let encodeImg
    let type
    let userProfile
    if (req.file === undefined || req.file.path === undefined) {
        userProfile = {
            profileImageFile: {
                data: [],
                contentType: ''
            }
        }
    }
    else {
        img = fs.readFileSync(req.file.path)
        encodeImg = img.toString('base64')
        type = req.file.mimetype
        userProfile = {
            profileImageFile: {
                data: new Buffer(encodeImg, 'base64'),
                contentType: type
            }

        }
    }
    await UserProfile.findOneAndUpdate({ userId: userId }, userProfile)
        .then(() => {
            res.status(200).json({ msg: 'Profile picture is updated!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to update profile picture!', error: err })
        })

})

// router.post('/user-profile', upload.single('profilePicture'), (req, res) => {
//     const { userId, age, birthday, firstName, lastName, gender, motto, isPrivate } = req.body
//     const img = fs.readFileSync(req.file.path)
//     const encodeImg = img.toString('base64')
//     //console.log("encondeimg", encodeImg)
//     const type = req.file.mimetype
//     let userProfile = {}
//     if (req.file === undefined || req.file.path === undefined) {
//         userProfile = UserProfile({
//             userId,
//             age,
//             birthday
//         })
//     }
//     else {
//         userProfile = UserProfile({
//             userId,
//             age,
//             birthday,
//             profileImagePath: req.file.path,
//             profileImageFile: {
//                 data: new Buffer(encodeImg, 'base64'),
//                 contentType: type
//             }
//         })
//     }
//     userProfile.save()
//         .then(() => {
//             res.status(200).json({ msg: 'Profile info saved!' })
//         })
//         .catch(err => {
//             res.status(400).json({ msg: 'Failed to save user profile!', error: err })
//         })
// })

router.put('/edit-profile-info', authentication, async (req, res) => {
    const { userId, firstName, lastName, gender, age, birthday, motto, isPrivate } = req.body

    const userProfileData = {
        userId, gender, age, birthday: new Date(birthday).toISOString(), motto, isPrivate
    }
    const userData = {
        firstName, lastName
    }
    await User.findOneAndUpdate({ _id: userId }, userData)
    await UserProfile.findOneAndUpdate({ userId: userId }, userProfileData)
        .then(() => {
            res.status(200).json({ msg: 'Profile info editted!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to edit user profile!', error: err })
        })
})


//ADD COMMENTS
router.post('/add-comment', authentication, async (req, res) => {
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


router.put('/delete-comment/:id', async (req, res) => {
    const { userId, commentId } = req.body
    const post = await Post.findOne({ createdBy: userId, _id: req.params.id })
    await post.updateOne({ $pull: { comments: { commentId: commentId } } })
        .then(() => { res.status(200).json({ msg: 'Comment deleted!' }) })
        .catch(err => { res.status(400).json({ msg: 'Failed to delete comment!', error: err }) })
})

router.put('/change-password/:id', authentication, async (req, res) => {
    const { password, newPassword, confirmNewPassword } = req.body
    if (password === '' || newPassword === '' || confirmNewPassword === '') return res.status(400).json({ msg: 'All fields are required!' })
    if (newPassword !== confirmNewPassword) return res.status(400).json({ msg: 'Password and new password must match!' })
    await User.findById(req.params.id)
        .then((user) => {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) return res.status(400).json({ msg: 'Incorrect password!' })

                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if (err) return res.status(400).json({ error: err })

                    User.findByIdAndUpdate(user._id, { password: hash })
                        .then(() => {
                            res.status(200).json({ msg: 'Password changed!' })
                        })
                        .catch(err => {
                            res.status(400).json({ msg: 'Failed to change password!', error: err })
                        })
                })

            })
        })
})


//friend request endpoint
router.post('/follow-friend', authentication, async (req, res) => {

    const { myId, myFirstName, myLastName, userId, firstName, lastName, imgData, myImgData } = req.body
    const friendInfo = {
        //userId, firstName, lastName, profileImageFile: imgData
        userId, firstName, lastName
    }
    const myInfo = {
        //userId: myId, firstName: myFirstName, lastName: myLastName, profileImageFile: myImgData
        userId: myId, firstName: myFirstName, lastName: myLastName
    }

    //friends profile
    const myProfile = await UserProfile.findOne({ userId: myId })
    //my profile
    const friendProfile = await UserProfile.findOne({ userId: userId })
    friendProfile.followers.push(myInfo)
    friendProfile.save()
    myProfile.following.push(friendInfo)
    myProfile.save()
        .then(() => {
            res.status(200).json({ msg: 'Congrats you\'re following this person!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Something went wrong!', error: err })
        })


})


router.put('/unfollow-friend', async (req, res) => {
    console.log("triggered unfolow")
    const { myId, userId } = req.body
    const friendProfile = await UserProfile.findOne({ userId: userId })
    const myProfile = await UserProfile.findOne({ userId: myId })
    //console.log("friendProfile", friendProfile)
    //console.log("myProfile", myProfile)
    await UserProfile.update({ userId: myId }, { $pull: { following: { userId: userId } } })
        .then(() => {
            console.log("updated successfully!")
        })
    //friendProfile.save()
    await UserProfile.update({ userId: userId }, { $pull: { followers: { userId: myId } } })
        //myProfile.save()
        .then(() => {
            res.status(200).json({ msg: 'You\'re no longer a follower of this shit!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Someting went wrong!', error: err })
        })
})

// router.put('/friend-request-confirmation', (req,res) => {
//     const { accept, decline, }
// })

module.exports = router