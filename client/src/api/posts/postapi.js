import axios from 'axios'

import { tokenConfig, tokenConfigFormData } from '../auth/authapi'

export async function fetchPostApi(auth) {
    return await axios.get('/api/post/fetch-post', tokenConfig(auth))
}

export async function fetchCommentApi(auth) {
    return await axios.get(`/api/post/fetch-comment`, tokenConfig(auth))
}

export async function addCommentApi({ email, comment, userId, postId, commentId, auth }) {
    const body = JSON.stringify({ email, comment, userId, postId, commentId })
    return await axios.post('/api/user/add-comment', body, tokenConfig(auth))
}


export async function addPostApi({ auth, userId, title, imgData }) {
    const bodyFormData = new FormData()
    bodyFormData.set('title', title)
    bodyFormData.append('userId', userId)
    bodyFormData.append('postImage', imgData)

    return await axios.post('/api/post/add-post', bodyFormData, tokenConfigFormData(auth))
}

