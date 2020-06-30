import {
    EDIT_PROFILEPIC,
    EDIT_PROFILEPIC_SUCCESS,
    EDIT_PROFILEPIC_FAILED,
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

export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE
    }
}
export const editProfilePicAction = data => {

    return {
        type: EDIT_PROFILEPIC,
        payload: data
    }
}

export const editProfilePicSuccessAction = msg => {
    return {
        type: EDIT_PROFILEPIC_SUCCESS,
        payload: msg
    }
}

export const editProfilePicFailedAction = errorInfo => {
    return {
        type: EDIT_PROFILEPIC_FAILED,
        payload: errorInfo
    }
}

export const editProfileInfoAction = data => {
    return {
        type: EDIT_PROFILEINFO,
        payload: data
    }
}

export const editProfileInfoSuccessAction = msg => {
    return {
        type: EDIT_PROFILEINFO_SUCCESS,
        payload: msg
    }
}

export const editProfileInfoFailedAction = errorInfo => {
    return {
        type: EDIT_PROFILEINFO_FAILED,
        payload: errorInfo
    }
}

export const changePasswordAction = data => {
    return {
        type: CHANGE_PASSWORD,
        payload: data
    }
}

export const changePasswordSuccessAction = msg => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: msg
    }
}

export const changePasswordFailedAction = errorInfo => {
    return {
        type: CHANGE_PASSWORD_FAILED,
        payload: errorInfo
    }
}


export const friendRequestAction = data => {
    return {
        type: FRIEND_REQUEST,
        payload: data
    }
}

export const friendRequestSuccessAction = msg => {
    return {
        type: FRIEND_REQUEST_SUCCESS,
        payload: msg
    }
}

export const friendRequestFailedAction = errorInfo => {
    return {
        type: FRIEND_REQUEST_FAILED,
        payload: errorInfo
    }
}

export const unfriendRequestAction = data => {
    return {
        type: UNFRIEND_REQUEST,
        payload: data
    }
}


export const unfriendRequestSuccessAction = msg => {
    return {
        type: UNFRIEND_REQUEST_SUCCESS,
        payload: msg
    }
}

export const unfriendRequestFailedAction = errorInfo => {
    return {
        type: UNFRIEND_REQUEST_FAILED,
        payload: errorInfo
    }
}
