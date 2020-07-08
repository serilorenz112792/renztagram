import { takeLatest, put, select, all, call, delay } from 'redux-saga/effects'
import { fetchPostApi, fetchCommentApi, addCommentApi, addPostApi, deletePostApi, deleteCommentApi, likePostApi, unlikePostApi } from '../../api/posts/postapi'
import { FETCH_POST, FETCH_COMMENT, ADD_COMMENT, ADD_POST, DELETE_POST, DELETE_COMMENT, LIKE_POST, UNLIKE_POST } from './constants'
import {
    fetchPostAction, fetchCommentAction, fetchPostSuccessAction, fetchPostFailedAction, fetchCommentSuccessAction,
    fetchCommentFailedAction, addCommentFailedAction, addCommentSuccessAction, clearMessageAction,
    addPostSuccessAction, addPostFailedAction, deletePostSuccessAction, deletePostFailedAction,
    deleteCommentSuccessAction, deleteCommentFailedAction, likePostSuccessAction, likePostFailedAction,
    unlikePostSuccessAction, unlikePostFailedAction
} from './action'

const authState = state => state.auth
function* FetchPostSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(fetchPostApi, auth)
        if (response.status === 200) {
            yield put(fetchPostSuccessAction(response.data))
            yield put(clearMessageAction())
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
            //yield delay(3000)
            yield put(addPostSuccessAction(response.data))
            yield put(fetchPostAction())
        }
    }
    catch (err) {
        yield put(addPostFailedAction(err.response.data))
    }
}

function* DeletePostSaga(action) {
    const { postId } = action.payload
    const auth = yield select(authState)
    const data = {
        postId,
        auth
    }
    try {
        const response = yield call(deletePostApi, data)
        if (response.status === 200) {
            yield put(deletePostSuccessAction(response.data))
            //yield put(fetchPostAction())
        }
    }
    catch (err) {
        yield put(deletePostFailedAction(err.response.data))
    }
}
function* DeleteCommentSaga(action) {
    const auth = yield select(authState)
    const { postId, commentId, userId } = action.payload
    const data = { postId, commentId, userId, auth }
    try {
        const response = yield call(deleteCommentApi, data)
        if (response.status === 200) {
            yield put(deleteCommentSuccessAction(response.data))
            yield put(fetchCommentAction())
        }
    }
    catch (err) {
        yield put(deleteCommentFailedAction(err.response.data))
    }
}
function* LikePostSaga(action) {
    const { userId, postId } = action.payload
    const auth = yield select(authState)
    const data = { userId, postId, auth }
    try {
        const response = yield call(likePostApi, data)
        if (response.status === 200) {
            yield put(likePostSuccessAction(response.data))
            yield put(fetchCommentAction())
        }
    }
    catch (err) {
        yield put(likePostFailedAction(err.response.data))
    }
}
function* UnlikePostSaga(action) {
    const { userId, postId } = action.payload
    const auth = yield select(authState)
    const data = { userId, postId, auth }
    try {
        const response = yield call(unlikePostApi, data)
        if (response.status === 200) {
            yield put(unlikePostSuccessAction(response.data))
            yield put(fetchCommentAction())
        }
    }
    catch (err) {
        yield put(unlikePostFailedAction(err.response.data))
    }
}
export default function* HomeSaga() {
    yield all([
        takeLatest(FETCH_POST, FetchPostSaga),
        takeLatest(FETCH_COMMENT, FetchCommentSaga),
        takeLatest(ADD_COMMENT, AddCommentsaga),
        takeLatest(ADD_POST, AddPostSaga),
        takeLatest(DELETE_POST, DeletePostSaga),
        takeLatest(DELETE_COMMENT, DeleteCommentSaga),
        takeLatest(LIKE_POST, LikePostSaga),
        takeLatest(UNLIKE_POST, UnlikePostSaga)
    ])
}
