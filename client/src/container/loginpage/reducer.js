import {
    LOAD_USER_SUCCESS, LOAD_USER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    CLEAR_MSG, LOGOUT
}
    from './constant'

const initialState = {
    isLoading: false,
    isLoadingRegister: false,
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    msg: {},
    error: {}
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case LOAD_USER_FAILED:
            return {
                ...state,
                error: payload
            }
        case LOGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                msg: 'Login Successfully!',
                token: payload.token,
                isLoading: false,
                error: {}
            }
        case LOGIN_FAILED:
            return {
                ...state,
                msg: payload,
                isLoading: false
            }
        case REGISTER:
            return {
                ...state,
                isLoadingRegister: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoadingRegister: false,
                msg: payload
            }
        case REGISTER_FAILED:
            return {
                ...state,
                isLoadingRegister: false,
                msg: payload,
                error: payload.error
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isLoading: false,
                isLoadingRegister: false,
                user: null,
                token: null,
                isAuthenticated: false,
                msg: {},
                error: {}
            }
        case CLEAR_MSG:
            return {
                ...state,
                msg: ''
            }
        default:
            return state

    }
}

export default authReducer