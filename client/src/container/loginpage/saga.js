import { takeLatest, put, call, select, all } from 'redux-saga/effects'
import { loadUserApi, loginApi, registerApi } from '../../api/auth/authapi'
import {
    loadUserSuccess, loadUserFailed,
    loginSuccessAction, loginFailedAction,
    registerSuccessAction, registerFailedAction
} from './action'
import { LOAD_USER, LOGIN, REGISTER } from './constant'
const authState = state => state.auth
function* LoadUserSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(loadUserApi, auth)
        if (response.status === 200) {
            yield put(loadUserSuccess(response.data))
        }
    }
    catch (err) {
        yield put(loadUserFailed(err.response.data))
    }
}
function* LoginSaga(action) {
    const { email, password } = action.payload
    const data = {
        email,
        password
    }
    try {
        const response = yield call(loginApi, data)
        if (response.status === 200) {
            yield put(loginSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(loginFailedAction({ content: err.response.data, id: 'LOGIN_FAILED' }))
    }
}
function* RegisterSaga(action) {
    const { firstName, lastName, email, password } = action.payload
    const data = {
        firstName,
        lastName,
        email,
        password
    }
    try {
        const response = yield call(registerApi, data)
        if (response.status === 200) {
            yield put(registerSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(registerFailedAction({ content: err.response.data, id: 'REGISTER_FAILED' }))
    }
}
export default function* AuthSaga() {
    yield all([
        takeLatest(LOAD_USER, LoadUserSaga),
        takeLatest(LOGIN, LoginSaga),
        takeLatest(REGISTER, RegisterSaga)
    ])
}