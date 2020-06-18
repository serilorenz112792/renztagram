import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import {
    Paper, Card, Grid, CardMedia, CardContent, CardActionArea,
    IconButton, InputAdornment, TextField, Avatar, Divider, Typography, Button,
    Collapse, CircularProgress, Snackbar,
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment';
import MuiAlert from '@material-ui/lab/Alert';
import CommentsContainer from './comments'
import dotenv from 'dotenv'
dotenv.config()
const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: 40
    },
    userInfoGrid: {
        display: 'inherit',
    },
    userInfoTypography: {
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    userInfoCardMediaDiv: {
        width: '100%',
        height: 600,
        //objectFit: 'contain',
    },
    userInfoCardMedia: {
        objectFit: 'fill',
        height: 'inherit',
        width: 'inherit'
    },
    captionCreator: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    captionContent: {
        paddingLeft: 10
    },
    captionGrid: {
        paddingTop: 10,
        paddingLeft: 10
    },
    iconsGrid: {
        paddingTop: 10,
        paddingLeft: 10
    },
    likeIcon: {
        fontSize: 40,
        cursor: 'pointer'
    },
    commentIcon: {
        fontSize: 40,
        cursor: 'pointer'
    },
    timeStampGrid: {
        paddingLeft: 10
    },
    timeStamp: {
        fontSize: 10
    },
    commentGrid: {
        paddingLeft: 10,
        paddingTop: 10
    },
    commentActiveBtn: {
        color: '#ad0ea3',
        fontWeight: 'bold'
    },
    commentInactiveBtn: {
        color: 'lightgray',
        fontWeight: 'bold'
    },
    postBtn: {
        textTransform: 'none'
    },
    commentSectionGrid: {
        paddingLeft: 10
    },
    viewCommentsBtn: {
        color: 'gray',
        fontSize: 12,
        cursor: 'pointer'
    },
    commentCreator: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    commentContent: {
        paddingLeft: 10
    },
    allCommentsPaper: {
        width: 'inherit',

    }
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Post = (props) => {
    const classes = useStyles()
    const { post, profile, auth, home, index, history, AddComment, ClearMsg } = props
    const [profilePicPath, setProfilePicPath] = useState('')
    const [postImagePath, setPostImagePath] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [comment, setComment] = useState('')
    const [isCommentActive, setIsCommentActive] = useState(false)
    const [isCommentBtnDisable, setIsCommentBtnDisable] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)


    const [collapse, setCollapse] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')



    const [commentCreator, setCommentCreator] = useState('')
    const [commentContent, setCommentContent] = useState('')

    //const userId = auth.user && auth.user._id
    const myUsers = profile.users && profile.users
    const myProfile = profile.userProfiles && profile.userProfiles.filter(userProfile => myUsers.some(user => userProfile.userId === user._id))
    const myProfilePic = myProfile.filter(userProfile => userProfile.userId === post.createdBy && post.createdBy)
    const username = myUsers && myUsers.filter(user => user._id === post.createdBy && post.createdBy)

    const myComments = home.comments && home.comments.filter((comment) => comment._id === post._id && post._id)
    //console.log("myComments", myComments[0] && myComments[0].comments)
    //const email = username.email.substring(0)
    //console.log(myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.substring(0, myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.lastIndexOf("@")))
    //console.log("myUsers", myUsers)
    console.log("myProfile", post)


    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            setProfilePicPath(`https://renztagram.herokuapp.com/${myProfilePic[0] && myProfilePic[0].profileImagePath}`)
            setPostImagePath(`https://renztagram.herokuapp.com/${post && post.imgPath}`)
        }
        else {
            setProfilePicPath(`http://localhost:5999/${myProfilePic[0] && myProfilePic[0].profileImagePath}`)
            setPostImagePath(`http://localhost:5999/${post && post.imgPath}`)
        }

        if (comment === '') {
            setIsCommentBtnDisable(true)

        }
        if (home.msg && home.msg.msg === "Comment added!") {
            setSeverity('success')
            setOpenSnack(true)
            setMsg(home.msg && home.msg.msg)
            setComment('')
            setIsCommentBtnDisable(true)
            setIsCommentActive(false)
            ClearMsg()
        }

        if (home.msg && home.msg.msg !== "Comment added!" && home.msg && home.msg.msg !== "") {
            setSeverity('error')
            setOpenSnack(true)
            setMsg(home.msg && home.msg.msg)
            ClearMsg()
        }
        //setCommentCreator(post.comments[post.comments.length - 1] && post.comments[post.comments.length - 1].email.substring(0, post.comments[post.comments.length - 1].email.lastIndexOf("@")))
        //setCommentContent(post.comments[post.comments.length - 1] && post.comments[post.comments.length - 1].comment)
        setCommentCreator(myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.substring(0, myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.lastIndexOf("@")))
        setCommentContent(myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].comment)


        //SET BUFFER TO BASE64
        setImageFile(arrayBufferToBase64(post.imgFile.data.data))
    }, [myProfile, post._id, post.comments && post.comments.comment, props, isCommentBtnDisable, commentContent, commentCreator])
    const handleCollapse = () => {
        setCollapse(!collapse)

    }
    const handleComment = (e) => {
        if (e.target.value !== '' || e.target.value !== null) {
            setComment(e.target.value)
            setIsCommentActive(true)
            setIsCommentBtnDisable(false)
        }
        if (e.target.value === '') {
            setIsCommentActive(false)
            setIsCommentBtnDisable(true)
        }

    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }

    const handleSubmitComment = () => {
        const data = {
            comment,
            postId: post._id,
            email: auth.user && auth.user.email,
            userId: auth.user && auth.user._id,
            commentId: new Date().toISOString() + Math.random()
        }
        //console.log("DATA", data)
        AddComment(data)
    }
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    //console.log("post", post)
    //console.log("postImagePath", postImagePath)
    return (
        <Grid className={classes.root}>
            <Paper>
                <Card>
                    <CardContent>
                        <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                            <Alert onClose={handleCloseSnack} severity={severity}>
                                {msg}
                            </Alert>
                        </Snackbar>

                        <Grid container>
                            <Grid className={classes.userInfoGrid} item xs={12}>
                                <Avatar src={profilePicPath} />
                                <Typography className={classes.userInfoTypography} variant="subtitle1">{`${username[0] && username[0].firstName} ${username[0] && username[0].lastName}`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <div className={classes.userInfoCardMediaDiv}>
                                        <CardMedia
                                            className={classes.userInfoCardMedia}
                                            component="img"
                                            alt="item img"
                                            image={`data:image/jpeg;base64,${imageFile}`}
                                            //image={postImagePath}
                                            title={post.title}
                                        />
                                    </div>

                                </Paper>
                            </Grid>
                            <Grid className={classes.iconsGrid} item xs={12}>

                                <FavoriteBorderIcon className={classes.likeIcon} />
                                <CommentIcon className={classes.commentIcon} />
                            </Grid>
                            <Grid className={classes.captionGrid} item xs={12}>
                                <Typography variant="body1">
                                    <span className={classes.captionCreator}>{username[0] && username[0].email.substring(0, username[0] && username[0].email.lastIndexOf("@"))} </span>
                                    <span className={classes.captionContent}>{post.title}</span>
                                </Typography>
                            </Grid>
                            <Grid className={classes.timeStampGrid} item xs={12}>
                                <Typography className={classes.timeStamp} variant="body1">
                                    {moment(post && post.createdAt).fromNow()}
                                </Typography>
                            </Grid>
                            <Grid className={classes.commentSectionGrid} item xs={12}>
                                {myComments[0] && myComments[0].comments && myComments[0].comments.length > 0 ? <Typography onClick={handleCollapse} variant="body1" className={classes.viewCommentsBtn}>{!collapse ? `View all ${myComments[0] && myComments[0].comments && myComments[0].comments.length} comments` : `Hide all ${myComments[0] && myComments[0].comments && myComments[0].comments.length} comments`}</Typography> : null}
                                {!collapse ?
                                    <Typography variant="body1"><span className={classes.commentCreator}>{commentCreator}</span> <span className={classes.commentContent}>{commentContent}</span></Typography>
                                    :
                                    <Collapse in={collapse} timeout="auto" unmountOnExit>
                                        <Paper className={classes.allCommentsPaper}>
                                            {myComments[0] && myComments[0].comments.map((comments, index) => <CommentsContainer key={comments.commentId} comments={comments} />)}
                                        </Paper>
                                    </Collapse>}

                            </Grid>

                            <Grid style={{ margin: 0, paddingTop: 10 }} item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid className={classes.commentGrid} item xs={12}>
                                <TextField
                                    value={comment}
                                    fullWidth
                                    placeholder="Add a comment..."
                                    onChange={handleComment}
                                    InputProps={{
                                        disableUnderline: true, endAdornment: (
                                            <InputAdornment position='end'>
                                                {home.isCommentLoading && home.isCommentLoading ? <CircularProgress size={30} color="primary" /> :
                                                    <Button
                                                        className={classes.postBtn}
                                                        onClick={handleSubmitComment}
                                                        variant="text"
                                                        disabled={isCommentBtnDisable}>
                                                        <span className={isCommentActive ? classes.commentActiveBtn : classes.commentInactiveBtn}>Post</span>
                                                    </Button>
                                                }


                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )
}

export default Post