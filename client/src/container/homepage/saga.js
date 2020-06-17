import { takeLatest, put, select, all, call } from 'redux-saga/effects'
import { fetchPostApi, fetchCommentApi, addCommentApi, addPostApi } from '../../api/posts/postapi'
import { FETCH_POST, FETCH_COMMENT, ADD_COMMENT, ADD_POST } from './constants'
import {
    fetchPostAction, fetchCommentAction, fetchPostSuccessAction, fetchPostFailedAction, fetchCommentSuccessAction,
    fetchCommentFailedAction, addCommentFailedAction, addCommentSuccessAction,
    addPostSuccessAction, addPostFailedAction
} from './action'

const authState = state => state.auth
function* FetchPostSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(fetchPostApi, auth)
        if (response.status === 200) {
            yield put(fetchPostSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(fetchPostFailedAction(err.response.data))
    }
}

function* FetchCommentSaga() {

    const auth = yield select(authState)

    try {
        const response = yield call(fetchCommentApi, auth)
        if (response.status === 200) {
            yield put(fetchCommentSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(fetchCommentFailedAction(err.response.data))
    }
}
function* AddCommentsaga(action) {
    const auth = yield select(authState)
    const { email, userId, comment, postId, commentId } = action.payload
    const data = {
        email,
        userId,
        comment,
        postId,
        commentId,
        auth
    }
    try {
        const response = yield call(addCommentApi, data)
        if (response.status === 200) {
            yield put(addCommentSuccessAction(response.data))
            //yield put(fetchPostAction())
            yield put(fetchCommentAction())
        }
    }
    catch (err) {
        yield put(addCommentFailedAction(err.response.data))
    }
}
function* AddPostSaga(action) {
    const { userId, imgData, title } = action.payload
    const auth = yield select(authState)
    const data = {
        userId,
        imgData,
        title,
        auth
    }
    try {
        const response = yield call(addPostApi, data)
        if (response.status === 200) {
            yield put(addPostSuccessAction(response.data))
            yield put(fetchPostAction())
        }
    }
    catch (err) {
        yield put(addPostFailedAction(err.response.data))
    }
}
export default function* HomeSaga() {
    yield all([
        takeLatest(FETCH_POST, FetchPostSaga),
        takeLatest(FETCH_COMMENT, FetchCommentSaga),
        takeLatest(ADD_COMMENT, AddCommentsaga),
        takeLatest(ADD_POST, AddPostSaga)
    ])
}
