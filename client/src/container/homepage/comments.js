import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    commentCreator: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    commentContent: {
        paddingLeft: 10
    },
}))
const CommentsContainer = (props) => {
    const classes = useStyles()
    const { comments } = props
    //alert('triggered')
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body1"><span className={classes.commentCreator}>{comments.email.substring(0, comments.email.lastIndexOf("@"))}</span> <span className={classes.commentContent}>{comments.comment}</span></Typography>
            </Grid>
        </Grid>
    )
}

export default CommentsContainer