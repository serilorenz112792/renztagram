import {
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILED,

    FETCH_COMMENT,
    FETCH_COMMENT_SUCCESS,
    FETCH_COMMENT_FAILED,

    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILED,

    ADD_POST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILED,

    CLEAR_MESSAGE




} from './constants'

export const fetchPostAction = () => {
    return {
        type: FETCH_POST
    }
}

export const fetchPostSuccessAction = posts => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: posts
    }
}

export const fetchPostFailedAction = errorInfo => {
    return {
        type: FETCH_POST_FAILED,
        payload: errorInfo
    }
}

export const fetchCommentAction = () => {
    return {
        type: FETCH_COMMENT
    }
}

export const fetchCommentSuccessAction = comments => {
    return {
        type: FETCH_COMMENT_SUCCESS,
        payload: comments
    }
}

export const fetchCommentFailedAction = error => {
    return {
        type: FETCH_COMMENT_FAILED,
        payload: error
    }
}

export const addCommentAction = data => {
    return {
        type: ADD_COMMENT,
        payload: data
    }
}

export const addCommentSuccessAction = msg => {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: msg
    }
}

export const addCommentFailedAction = errorInfo => {
    return {
        type: ADD_COMMENT_FAILED,
        payload: errorInfo
    }
}


export const addPostAction = post => {
    return {
        type: ADD_POST,
        payload: post
    }
}

export const addPostSuccessAction = msg => {
    return {
        type: ADD_POST_SUCCESS,
        payload: msg
    }
}

export const addPostFailedAction = errorInfo => {
    return {
        type: ADD_POST_FAILED,
        payload: errorInfo
    }
}

export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE
    }
}
