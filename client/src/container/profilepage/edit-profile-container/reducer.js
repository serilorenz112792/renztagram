import {
    EDIT_PROFILEPIC,
    EDIT_PROFILEPIC_FAILED,
    EDIT_PROFILEPIC_SUCCESS,
    EDIT_PROFILEINFO,
    EDIT_PROFILEINFO_SUCCESS,
    EDIT_PROFILEINFO_FAILED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,

    FRIEND_REQUEST,
    FRIEND_REQUEST_SUCCESS,
    FRIEND_REQUEST_FAILED,

    UNFRIEND_REQUEST,
    UNFRIEND_REQUEST_SUCCESS,
    UNFRIEND_REQUEST_FAILED,

    CLEAR_MESSAGE
}

    from './edit-profile-constants'

const initialState = {
    isLoading: false,
    passwordLoading: false,
    msg: '',
    error: {},

    followUnfollowLoading: false
}

const editProfileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case EDIT_PROFILEPIC:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_PROFILEPIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: payload
            }
        case EDIT_PROFILEPIC_FAILED:
            return {
                ...state,
                isLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case EDIT_PROFILEINFO:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_PROFILEINFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: payload
            }
        case EDIT_PROFILEINFO_FAILED:
            return {
                ...state,
                isLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                passwordLoading: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                passwordLoading: false,
                msg: payload.msg
            }
        case CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                passwordLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                msg: '',
                error: {}
            }

        case FRIEND_REQUEST:
            return {
                ...state,
                followUnfollowLoading: true
            }
        case FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                msg: payload.msg,
                followUnfollowLoading: false
            }
        case FRIEND_REQUEST_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error,
                followUnfollowLoading: false
            }

        case UNFRIEND_REQUEST:
            return {
                ...state,
                followUnfollowLoading: true
            }
        case UNFRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                msg: payload.msg,
                followUnfollowLoading: false
            }
        case UNFRIEND_REQUEST_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error,
                followUnfollowLoading: false
            }

        default:
            return state
    }
}

export default editProfileReducer