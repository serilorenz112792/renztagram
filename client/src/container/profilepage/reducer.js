import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILED,
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILED
}
    from './constants'

const initialState = {
    isLoading: false,
    userProfiles: [],
    msg: '',
    error: {},


    users: [],
    isUsersLoading: false,
    userMsg: '',
    userError: {}
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_USER_PROFILE:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userProfiles: payload
            }
        case FETCH_USER_PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case FETCH_USERS:
            return {
                ...state,
                isUsersLoading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isUsersLoading: false,
                users: payload
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                isUsersLoading: false,
                userMsg: payload.userMsg,
                userError: payload.userError
            }

        default:
            return state
    }
}

export default profileReducer