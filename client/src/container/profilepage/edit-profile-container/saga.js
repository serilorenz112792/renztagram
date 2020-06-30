import { takeLatest, all, call, select, put } from 'redux-saga/effects'
import { editProfilePictureApi, editProfileInfoApi, changePasswordApi, friendRequestApi, unfriendApi } from '../../../api/profile/userprofileapi'
import { EDIT_PROFILEPIC, EDIT_PROFILEINFO, CHANGE_PASSWORD, FRIEND_REQUEST, UNFRIEND_REQUEST } from './edit-profile-constants'
import {
    editProfilePicSuccessAction, editProfilePicFailedAction,
    editProfileInfoSuccessAction, editProfileInfoFailedAction,
    changePasswordSuccessAction, changePasswordFailedAction,
    friendRequestSuccessAction, friendRequestFailedAction,
    unfriendRequestSuccessAction, unfriendRequestFailedAction
} from './action'
import { fetchUserProfileAction } from '../action'

const authState = state => state.auth
function* EditProfilePicSaga(action) {
    const auth = yield select(authState)
    const { imgData, userId } = action.payload
    const data = {
        imgData,
        userId,
        auth
    }
    try {
        const response = yield call(editProfilePictureApi, data)
        if (response.status === 200) {
            yield put(editProfilePicSuccessAction(response.data))
            yield put(fetchUserProfileAction())
        }
    }
    catch (err) {
        yield put(editProfilePicFailedAction(err.response.data))
    }
}
function* EditProfileInfoSaga(action) {
    const auth = yield select(authState)
    const { userId, motto, gender, age, birthday, firstName, lastName, isPrivate } = action.payload
    const data = {
        userId, motto, gender, age, birthday, firstName, lastName, isPrivate, auth
    }
    try {
        const response = yield call(editProfileInfoApi, data)
        if (response.status === 200) {
            yield put(editProfileInfoSuccessAction(response.data))
            yield put(fetchUserProfileAction())
        }
    }
    catch (err) {
        yield put(editProfileInfoFailedAction(err.response.data))
    }
}
function* ChangePasswordSaga(action) {
    const auth = yield select(authState)
    const { password, newPassword, confirmNewPassword, userId } = action.payload
    const data = {
        password, newPassword, confirmNewPassword, userId, auth
    }
    try {
        const response = yield call(changePasswordApi, data)
        if (response.status === 200) {
            yield put(changePasswordSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(changePasswordFailedAction(err.response.data))
    }
}
function* FriendRequestSaga(action) {
    const { myId, myFirstName, myLastName, userId, firstName, lastName, imgData, myImgData } = action.payload
    const auth = yield select(authState)
    const data = {
        // myId, myFirstName, myLastName, userId, firstName, lastName, imgData, myImgData, auth
        myId, myFirstName, myLastName, userId, firstName, lastName, auth
    }
    try {
        const response = yield call(friendRequestApi, data)
        if (response.status === 200) {
            yield put(friendRequestSuccessAction(response.data.msg))
            yield put(fetchUserProfileAction())
        }
    }
    catch (err) {
        yield put(friendRequestFailedAction(err.response.data))
    }
}

function* UnfriendSaga(action) {
    const auth = yield select(authState)
    const { myId, userId } = action.payload
    const data = { myId, userId, auth }
    try {
        const response = yield call(unfriendApi, data)
        if (response.status === 200) {
            yield put(unfriendRequestSuccessAction(response.data.msg))
            yield put(fetchUserProfileAction())
        }
    }
    catch (err) {
        yield put(unfriendRequestFailedAction(err.response.data))
    }
}
export default function* EditProfileSaga() {
    yield all([
        takeLatest(EDIT_PROFILEPIC, EditProfilePicSaga),
        takeLatest(EDIT_PROFILEINFO, EditProfileInfoSaga),
        takeLatest(CHANGE_PASSWORD, ChangePasswordSaga),
        takeLatest(FRIEND_REQUEST, FriendRequestSaga),
        takeLatest(UNFRIEND_REQUEST, UnfriendSaga)
    ])
} 