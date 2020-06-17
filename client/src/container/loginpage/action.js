import {
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CLEAR_MSG,
    LOGOUT
}
    from './constant'

export const loadUser = () => {
    return {
        type: LOAD_USER
    }
}

export const loadUserSuccess = authData => {
    return {
        type: LOAD_USER_SUCCESS,
        payload: authData
    }
}

export const loadUserFailed = errors => {
    return {
        type: LOAD_USER_FAILED,
        payload: errors
    }
}

export const loginAction = creds => {
    return {
        type: LOGIN,
        payload: creds
    }
}

export const loginSuccessAction = info => {
    return {
        type: LOGIN_SUCCESS,
        payload: info
    }
}

export const loginFailedAction = errorInfo => {
    return {
        type: LOGIN_FAILED,
        payload: errorInfo
    }
}

export const registerAction = userInfo => {
    return {
        type: REGISTER,
        payload: userInfo
    }
}

export const registerSuccessAction = msg => {
    return {
        type: REGISTER_SUCCESS,
        payload: msg
    }
}

export const registerFailedAction = errorInfo => {
    return {
        type: REGISTER_FAILED,
        payload: errorInfo
    }
}

export const clearMsgAction = () => {
    return {
        type: CLEAR_MSG
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT
    }
}