import axios from 'axios'

import { tokenConfig, tokenConfigFormData } from '../auth/authapi'

export async function fetchUserProfileApi(auth) {
    return await axios.get('/api/user/user-profile', tokenConfig(auth))
}

export async function editProfilePictureApi({ auth, imgData, userId }) {
    const bodyFormData = new FormData()
    bodyFormData.set('profilePicture', imgData)
    bodyFormData.append('userId', userId)
    return await axios.put('/api/user/edit-profile-picture', bodyFormData, tokenConfigFormData(auth))
}

export async function editProfileInfoApi({ userId, motto, gender, age, birthday, firstName, lastName, isPrivate, auth }) {
    const body = JSON.stringify({ userId, motto, gender, age, birthday, firstName, lastName, isPrivate })
    return await axios.put('/api/user/edit-profile-info', body, tokenConfig(auth))
}

export async function changePasswordApi({ userId, password, newPassword, confirmNewPassword, auth }) {
    const body = JSON.stringify({ password, newPassword, confirmNewPassword })
    return await axios.put(`/api/user/change-password/${userId}`, body, tokenConfig(auth))
}


//follow friend
export async function friendRequestApi({ userId, firstName, lastName, myId, myFirstName, myLastName, imgData, myImgData, auth }) {

    // const bodyFormData = new FormData()
    // bodyFormData.set('userId', userId)
    // bodyFormData.append('firstName', firstName)
    // bodyFormData.append('lastName', lastName)
    // bodyFormData.append('myId', myId)
    // bodyFormData.append('myFirstName', myFirstName)
    // bodyFormData.append('myLastName', myLastName)
    // bodyFormData.append('profilePic', imgData)
    //const body = JSON.stringify({ userId, firstName, lastName, myId, myFirstName, myLastName, imgData, myImgData })
    const body = JSON.stringify({ userId, firstName, lastName, myId, myFirstName, myLastName })
    return await axios.post('/api/user/follow-friend', body, tokenConfig(auth))
}
//unfollow
export async function unfriendApi({ userId, myId, auth }) {
    const body = JSON.stringify({ userId, myId })
    return await axios.put('/api/user/unfollow-friend', body, tokenConfig(auth))
}