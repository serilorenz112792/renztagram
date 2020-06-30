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
    isAddPostLoading: false,
    isDeletePostLoading: false,
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
        case CLEAR_MESSAGE:
            return {
                ...state,
                msg: '',
                addPostMsg: ''
            }

        default:
            return state
    }
}

export default homeReducer