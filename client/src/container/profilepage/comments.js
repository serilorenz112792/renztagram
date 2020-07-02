import React, { useState } from 'react'
import { Grid, Typography, Tooltip, CircularProgress } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    commentCreator: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    commentContent: {
        paddingLeft: 10,
        wordBreak: 'break-word'
    },
}))
const CommentsContainer = (props) => {
    const classes = useStyles()
    const { comments, handleGotoProfileViaCommentSectionWithAllComments,
        postId, createdBy, DeleteComment, userIdThruAuth, isDeleteCommentLoading,
        index, handleNextAndPrevSetIndex } = props
    //alert('triggered') 
    const userId = createdBy
    const handleDeleteComment = () => {
        const data = {
            postId: postId,
            userId: userId,
            commentId: comments.commentId
        }
        DeleteComment(data)
        handleNextAndPrevSetIndex(index)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid style={{ width: '100%' }} item xs={11}>
                        <Typography style={{ width: 'inherit' }} variant="body1"><span onClick={() => handleGotoProfileViaCommentSectionWithAllComments(comments.userId)} className={classes.commentCreator}>{comments.email.substring(0, comments.email.lastIndexOf("@"))}</span>
                            <span className={classes.commentContent}>{comments.comment}</span></Typography>
                    </Grid>
                    <Grid container justify="center" item xs={1}>
                        <div >{userIdThruAuth === comments.userId ? <Tooltip title="Delete this comment?" placement="bottom-start"><DeleteIcon onClick={handleDeleteComment} style={{ cursor: 'pointer', color: '#ad0ea3' }} /></Tooltip> : null}</div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CommentsContainer