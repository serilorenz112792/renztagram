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

    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILED,

    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED,

    LIKE_POST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILED,

    UNLIKE_POST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILED,

    ADD_LINEAR_PROGRESS,
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

export const deletePostAction = postId => {

    return {
        type: DELETE_POST,
        payload: postId
    }
}

export const deletePostSuccessAction = msg => {
    return {
        type: DELETE_POST_SUCCESS,
        payload: msg
    }
}

export const deletePostFailedAction = errorInfo => {
    return {
        type: DELETE_POST_FAILED,
        payload: errorInfo
    }
}

export const deleteCommentAction = data => {
    return {
        type: DELETE_COMMENT,
        payload: data
    }
}

export const deleteCommentSuccessAction = msg => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        payload: msg
    }
}

export const deleteCommentFailedAction = errorInfo => {
    return {
        type: DELETE_COMMENT_FAILED,
        payload: errorInfo
    }
}

export const likePostAction = data => {
    return {
        type: LIKE_POST,
        payload: data
    }
}

export const likePostSuccessAction = msg => {
    return {
        type: LIKE_POST_SUCCESS,
        payload: msg
    }
}

export const likePostFailedAction = error => {
    return {
        type: LIKE_POST_FAILED,
        payload: error
    }
}

export const unlikePostAction = data => {
    return {
        type: UNLIKE_POST,
        payload: data
    }
}

export const unlikePostSuccessAction = msg => ({
    type: UNLIKE_POST_SUCCESS,
    payload: msg
})

export const unlikePostFailedAction = error => {
    return {
        type: UNLIKE_POST_FAILED,
        payload: error
    }
}

export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE
    }
}
