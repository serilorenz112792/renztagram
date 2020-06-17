import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILED,

    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILED,

    LOGOUT
}
    from './constants'


//USER PROFILE
export const fetchUserProfileAction = () => {
    return {
        type: FETCH_USER_PROFILE,

    }
}

export const fetchUserProfileSuccessAction = userProfiles => {
    return {
        type: FETCH_USER_PROFILE_SUCCESS,
        payload: userProfiles
    }
}

export const fetchUserProfileFailedAction = errorInfo => {
    return {
        type: FETCH_USER_PROFILE_FAILED,
        payload: errorInfo
    }
}


export const fetchUsersAction = () => {
    return {
        type: FETCH_USERS
    }
}

export const fetchUsersSuccessAction = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailedAction = errorInfo => {
    return {
        type: FETCH_USERS_FAILED,
        payload: errorInfo
    }
}

