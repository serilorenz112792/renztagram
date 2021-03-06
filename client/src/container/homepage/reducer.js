import {
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILED,
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
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILED,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILED,
    CLEAR_MESSAGE,
    ADD_LINEAR_PROGRESS,
    FETCH_COMMENT_SUCCESS

}
    from './constants'

const initialState = {
    isLoading: false,
    isCommentLoading: false,
    posts: [],
    comments: [],
    msg: '',
    addPostMsg: '',
    likePostMsg: '',
    unlikePostMsg: '',
    isAddPostLoading: false,
    isDeletePostLoading: false,
    isDeleteCommentLoading: false,
    deleteCommentMsg: '',
    error: {}
}

const homeReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_POST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: payload.reverse()
            }
        case FETCH_POST_FAILED:
            return {
                ...state,
                isLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                comments: payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                isCommentLoading: true
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                isCommentLoading: false,
                msg: payload
            }
        case ADD_COMMENT_FAILED:
            return {
                ...state,
                isCommentLoading: false,
                msg: payload.msg,
                error: payload.error
            }
        case ADD_POST:
            return {
                ...state,
                isAddPostLoading: true
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                addPostMsg: payload,
                isAddPostLoading: false
            }
        case ADD_POST_FAILED:
            return {
                ...state,
                addPostMsg: payload.msg,
                error: payload.error,
                isAddPostLoading: false,
            }
        case DELETE_POST:
            return {
                ...state,
                isDeletePostLoading: true
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case DELETE_POST_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        case DELETE_COMMENT:
            return {
                ...state,
                isDeleteCommentLoading: true

            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isDeleteCommentLoading: false,
                deleteCommentMsg: payload.msg
            }
        case DELETE_COMMENT_FAILED:
            return {
                ...state,
                isDeleteCommentLoading: false,
                deleteCommentMsg: payload.msg,
                error: payload.error
            }
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                likePostMsg: payload.msg
            }
        case LIKE_POST_FAILED:
            return {
                ...state,
                error: payload.error
            }
        case UNLIKE_POST_SUCCESS:
            return {
                ...state,
                unlikePostMsg: payload.msg
            }
        case UNLIKE_POST_FAILED:
            return {
                ...state,
                error: payload.error
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                msg: '',
                addPostMsg: '',
                deleteCommentMsg: ''
            }

        default:
            return state
    }
}

export default homeReducer