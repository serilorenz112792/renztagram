import { takeLatest, put, call, select, all } from 'redux-saga/effects'

import { fetchUserProfileApi } from '../../api/profile/userprofileapi'
import { fetchUsersApi } from '../../api/auth/authapi'

import { FETCH_USER_PROFILE, FETCH_USERS } from './constants'
import {
    fetchUserProfileSuccessAction, fetchUserProfileFailedAction,
    fetchUsersSuccessAction, fetchUsersFailedAction
} from './action'

const authState = state => state.auth

function* FetchUserProfileSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(fetchUserProfileApi, auth)
        if (response.status === 200) {
            yield put(fetchUserProfileSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(fetchUserProfileFailedAction(err.response.data))
    }
}
function* FetchUsersSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(fetchUsersApi, auth)
        if (response.status === 200) {
            yield put(fetchUsersSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(fetchUsersFailedAction({ userMsg: err.response.data.msg, userError: err.response.data.error }))
    }
}
export default function* ProfileSaga() {
    yield all([
        takeLatest(FETCH_USER_PROFILE, FetchUserProfileSaga),
        takeLatest(FETCH_USERS, FetchUsersSaga)
    ])
}