import React, { useState, useEffect } from 'react'
import {
    Paper, Grid, Card, CardMedia, CardContent, CardActionArea, Snackbar, CircularProgress, TextField, Button,
    Dialog, DialogTitle, DialogActions, DialogContent, Typography, Collapse, Divider, InputAdornment, Tooltip
} from '@material-ui/core'
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
import moment from 'moment'
import CommentsContainer from './comments'
import LikersModal from './likersModal'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    cardMedia: {
        height: 400,
        width: '100%',
        objectFit: 'fill',
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
    likedIcon: {
        fontSize: 40,
        cursor: 'pointer',
        color: 'red',
    },
    unlikedIcon: {
        fontSize: 40,
        cursor: 'pointer',
        //color: 'red',
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
        paddingLeft: 10,
        wordBreak: 'break-word'
    },
    allCommentsPaper: {
        width: 'inherit',

    },
    navigateNext: {
        cursor: 'pointer',
        position: 'absolute',
        right: 0,
        bottom: 400,
        [theme.breakpoints.up('lg')]: {
            bottom: 400,
        },
        [theme.breakpoints.up('md')]: {
            bottom: 400,
        },
        [theme.breakpoints.up('sm')]: {
            bottom: 250,
        },
        [theme.breakpoints.up('xs')]: {
            bottom: 250,
        },
    },
    dialogContent: {
        paddingTop: 20
    },
    navigatePrev: {
        cursor: 'pointer',
        position: 'absolute',
        left: 0,

        [theme.breakpoints.up('lg')]: {
            bottom: 400,
        },
        [theme.breakpoints.up('md')]: {
            bottom: 400,
        },
        [theme.breakpoints.up('sm')]: {
            bottom: 250,
        },
        [theme.breakpoints.up('xs')]: {
            bottom: 250,
        },

    },
    deleteIconBtn: {
        //position: 'absolute',
        float: 'right',
        right: 0,
        top: 0,
        color: '#ad0ea3',

        "&:hover": {
            color: '#f719e9'
        }
    },
    confirmDeletePostBtn: {
        textTransform: 'none',
        color: "#FFF",
        backgroundColor: '#ad0ea3',

        "&:hover": {
            backgroundColor: '#f719e9'
        },
        fontWeight: 'bold'
    },
    cancelDeletePostBtn: {
        textTransform: 'none',
        fontWeight: 'bold'
    },
    closeParentModal: {
        textTransform: 'none',
        //color: "#FFF",
        color: '#ad0ea3',

        "&:hover": {
            color: '#f719e9'
        },
        fontWeight: 'bold'
    },
    liker: {
        fontStyle: 'italic',
        color: '#ad0ea3',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    likedGrid: {
        paddingLeft: 10
    },
    // deleteIcon: {
    //     color: '#ad0ea3',

    //     "&:hover": {
    //         color: '#f719e9'
    //     }
    // }
}))

const MyPostModal = (props) => {
    const classes = useStyles()
    const { history, state, handleClose, home, userId,
        handleNextAndPrevSetIndex, auth, profile, index, FetchComments,
        AddComment, DeletePost, DeleteComment,
        LikePost, UnlikePost, ClearMessage } = props
    const [modalState, setModalState] = useState(false)

    const [deleteModalState, setDeleteModalState] = useState(false)

    const [collapse, setCollapse] = useState(false)
    //const [imageFile, setImageFile] = useState('')
    //const [commentCreator, setCommentCreator] = useState('')
    //const [commentContent, setCommentContent] = useState('')
    const [comment, setComment] = useState('')
    const [isCommentActive, setIsCommentActive] = useState(false)
    const [isCommentBtnDisable, setIsCommentBtnDisable] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')
    const [indx, setIndx] = useState(0)

    const [likersModalState, setLikersModalState] = useState(false)
    // const [liker, setLiker] = useState([])
    // const [likers, setLikers] = useState([])
    //const userId = auth.user && auth.user._id

    const myUsers = profile.users && profile.users
    const username = myUsers && myUsers.filter(user => user._id === userId)

    let myPosts = home.posts && home.posts.filter(post => post.createdBy === userId)
    const myPostsId = myPosts[indx] && myPosts[indx]._id
    const myComments = home.comments && home.comments.filter((comment) => comment._id === myPostsId)
    const userIdThruAuth = auth.user && auth.user._id
    const isMyUserInLikedBy = myComments[0] && myComments[0].likedBy.filter((obj) => obj._id === userIdThruAuth)

    let liker = myComments[0] && myComments[0].likedBy[myComments[0] && myComments[0].likedBy.length - 1]
    let likers = myComments[0] && myComments[0].likedBy
    // let liker = []
    // let likers = []
    // console.log("userId,", userId)

    useEffect(() => {

        //FetchComments()
        setIndx(index)
        setModalState(state)
        //setImageFile(arrayBufferToBase64(myPosts[indx] && myPosts[indx].imgFile && myPosts[indx].imgFile.data.data))
        //setCommentCreator(myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.substring(0, myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.lastIndexOf("@")))
        //setCommentContent(myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].comment)
        if (home.msg && home.msg.msg === "Comment added!") {
            setSeverity('success')
            setOpenSnack(true)
            setMsg(home.msg && home.msg.msg)
            setComment('')
            setIsCommentBtnDisable(true)
            setIsCommentActive(false)
            ClearMessage()
        }
        if (home.deleteCommentMsg && home.deleteCommentMsg === "Comment deleted!") {
            setSeverity('success')
            setOpenSnack(true)
            setMsg(home.deleteCommentMsg && home.deleteCommentMsg)
            ClearMessage()
        }
        // liker = myComments[0] && myComments[0].likedBy[myComments[0] && myComments[0].likedBy.length - 1]
        // likers = myComments[0] && myComments[0].likedBy
        // setLiker(myComments[0] && myComments[0] && myComments[0].likedBy[myComments[0] && myComments[0] && myComments[0].likedBy.length - 1])
        // setLikers(myComments[0] && myComments[0] && myComments[0].likedBy)
    }, [props])



    const handleCollapse = () => {
        setCollapse(!collapse)

    }
    const handleCloseModal = () => {
        setCollapse(false)
        handleClose(!modalState, indx)

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
            postId: myPosts[indx] && myPosts[indx]._id,
            email: auth.user && auth.user.email,
            userId: auth.user && auth.user._id,
            commentId: new Date().toISOString() + Math.random()
        }
        //console.log("DATA", data)
        AddComment(data)
        handleNextAndPrevSetIndex(indx)
    }
    const handleDeleteComment = () => {
        const data = {
            postId: myPosts[indx] && myPosts[indx]._id,
            userId: myPosts[indx] && myPosts[indx].createdBy,
            commentId: myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].commentId
        }

        DeleteComment(data)
        handleNextAndPrevSetIndex(indx)
    }
    const handleNext = () => {
        let lastIndex = myPosts && myPosts.length - 1
        setIndx(indx + 1)
        if (lastIndex === indx) {
            setIndx(0)
        }
        setCollapse(false)
        setComment('')
        setIsCommentBtnDisable(true)
        setIsCommentActive(false)

    }
    const handlePrev = () => {
        let lastIndex = myPosts && myPosts.length - 1
        setIndx(indx - 1)
        if (indx === 0) {
            setIndx(lastIndex)
        }
        setCollapse(false)
        setComment('')
        setIsCommentBtnDisable(true)
        setIsCommentActive(false)

    }
    //console.log("indx", indx)
    //console.log("myPostId", myPostsId)
    //console.log("username", username)
    //console.log("username[0]", username[0] && username[0])
    //console.log("userid", userId)
    //console.log("commendId", myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].userId)
    // console.log("myComments", myComments[0])
    // console.log("isMyUserInLikedBy", isMyUserInLikedBy)
    // console.log("likers", likers && likers)
    // console.log("LIKER", liker)
    // console.log("myPostsId", myPostsId)
    // console.log("indx", indx)
    const handleOpenDeleteModal = () => {
        //DeletePost({ postId: myPostsId })
        setDeleteModalState(!deleteModalState)
    }
    const handleCloseDeleteModal = state => {
        setDeleteModalState(state)
    }
    const handleGoToProfile = () => {
        const createdBy = myPosts[indx] && myPosts[indx].createdBy
        if (userId !== createdBy) {
            history.push(`/profile/${myPosts[indx] && myPosts[indx].createdBy}`)
            handleCloseModal()
        }

    }
    const handleGoToProfileViaCommentSection = () => {
        const lastCommentId = myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].userId
        if (userId !== lastCommentId) {
            handleCloseModal()

            history.push(`/profile/${myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].userId}`)
        }
    }
    const handleGotoProfileViaCommentSectionWithAllComments = userIdentifier => {
        if (userId !== userIdentifier) {
            setCollapse(false)
            handleCloseModal()
            history.push(`/profile/${userIdentifier}`)
        }
    }

    const handleLikePost = () => {
        const data = {
            postId: myPosts[indx] && myPosts[indx]._id,
            userId: auth.user && auth.user._id
        }
        LikePost(data)
        handleNextAndPrevSetIndex(indx)
    }
    const handleUnlikePost = () => {
        const data = {
            postId: myPosts[indx] && myPosts[indx]._id,
            userId: auth.user && auth.user._id
        }
        UnlikePost(data)
        handleNextAndPrevSetIndex(indx)
    }
    const handleOpenLikersModal = () => {
        setLikersModalState(!likersModalState)

    }
    const handleCloseLikersModal = state => {
        setLikersModalState(state)
    }
    const handleGoToProfileViaLiker = (userIdentifier) => {
        if (userId !== userIdentifier) {
            handleCloseLikersModal(false)
            handleClose(false, 0)
            history.push(`/profile/${userIdentifier}`)
        }

    }
    return (
        <Dialog style={{ backgroundColor: 'black' }} disableEscapeKeyDown disableBackdropClick open={modalState} onClose={handleCloseModal}>
            <LikersModal handleGoToProfileViaLiker={handleGoToProfileViaLiker} likers={likers} state={likersModalState} handleClose={handleCloseLikersModal} history={history} />
            <DeleteModalConfirmation DeletePost={DeletePost} indx={indx} closeParentModal={handleCloseModal} myPostsId={myPostsId} deleteModalState={deleteModalState} handleCloseDeleteModal={handleCloseDeleteModal} />
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <Grid item xs={12}>
                <Button variant="text" className={classes.closeParentModal} onClick={handleCloseModal}>Close</Button>
                {userId === userIdThruAuth ? <Button onClick={handleOpenDeleteModal} className={classes.deleteIconBtn}><Tooltip title="Delete this Post?" placement="right-start"><DeleteForeverIcon /></Tooltip></Button> : null}

            </Grid>
            <Divider />
            <DialogContent >

                <Grid container >

                    <Grid item xs={12}>
                        <CardMedia
                            className={classes.cardMedia}
                            component="img"
                            alt="item img"
                            image={`data:image/jpeg;base64,${arrayBufferToBase64(myPosts[indx] && myPosts[indx].imgFile && myPosts[indx].imgFile.data.data)}`}
                            //image={`http://localhost:5999/${myPosts[indx] && myPosts[indx].imgPath}`}
                            title={myPosts[indx] && myPosts[indx].title}
                        />
                    </Grid>
                    <Grid className={classes.iconsGrid} item xs={12}>
                        {isMyUserInLikedBy && isMyUserInLikedBy.length > 0 ? <FavoriteIcon onClick={handleUnlikePost} className={classes.likedIcon} /> : <FavoriteBorderIcon onClick={handleLikePost} className={classes.unlikedIcon} />}
                        {myComments[0] && myComments[0].comments.length > 0 ? <CommentIcon onClick={handleCollapse} className={classes.commentIcon} /> : <CommentIcon className={classes.commentIcon} />}
                    </Grid>
                    <Grid className={classes.likedGrid} item xs={12}>
                        {likers && likers.length > 0 ? <Typography variant="body1">
                            <span>liked by </span><span onClick={() => handleGoToProfileViaLiker(liker && liker._id)} className={classes.liker}>{liker && liker._id === userIdThruAuth ? 'you ' : `${liker && liker.firstName} ${liker && liker.lastName} `}</span>{likers && likers.length > 1 ? <span><span>and</span>  <span onClick={handleOpenLikersModal} className={classes.liker}>others</span></span> : null}
                        </Typography> : null}
                    </Grid>
                    <Grid className={classes.captionGrid} item xs={12}>
                        <Typography variant="body1">
                            <span onClick={handleGoToProfile} className={classes.captionCreator}>{username[0] && username[0].email.substring(0, username[0] && username[0].email.lastIndexOf("@"))} </span>
                            <span className={classes.captionContent}>{myPosts[indx] && myPosts[indx].title}</span>
                        </Typography>
                    </Grid>
                    <Grid className={classes.timeStampGrid} item xs={12}>
                        <Typography className={classes.timeStamp} variant="body1">
                            {moment(myPosts[indx] && myPosts[indx].createdAt).fromNow()}
                        </Typography>
                    </Grid>
                    <Grid className={classes.commentSectionGrid} item xs={12}>
                        {myComments[0] && myComments[0].comments && myComments[0].comments.length > 0 ? <Typography onClick={handleCollapse} variant="body1" className={classes.viewCommentsBtn}>{!collapse ? `View all ${myComments[0] && myComments[0].comments && myComments[0].comments.length} comments` : `Hide all ${myComments[0] && myComments[0].comments && myComments[0].comments.length} comments`}</Typography> : null}
                        {!collapse ?
                            <Grid container>
                                <Grid style={{ width: '100%' }} item xs={11}>
                                    <Typography style={{ width: 'inherit' }} variant="body1"><span className={classes.commentCreator} onClick={handleGoToProfileViaCommentSection}>{myComments[0] && myComments[0].comments && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.substring(0, myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].email.lastIndexOf("@"))}</span>
                                        <span className={classes.commentContent}>{myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].comment}</span></Typography>
                                </Grid>
                                <Grid container justify="center" item xs={1}>
                                    <div style={{ float: 'right' }}>{myComments[0] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1] && myComments[0].comments[myComments[0] && myComments[0].comments.length - 1].userId === userIdThruAuth ? <Tooltip title="Delete this comment?" placement="right-start">{home.isDeleteCommentLoading ? <CircularProgress color="secondary" /> : <DeleteIcon onClick={handleDeleteComment} style={{ color: '#ad0ea3', cursor: 'pointer' }} />}</Tooltip> : null}</div>
                                </Grid>
                            </Grid>
                            :
                            <Collapse in={collapse} timeout="auto" unmountOnExit>
                                <Paper className={classes.allCommentsPaper}>
                                    {myComments[0] && myComments[0].comments.map((comments, index) => <CommentsContainer handleNextAndPrevSetIndex={handleNextAndPrevSetIndex} index={indx} DeleteComment={DeleteComment} postId={myPosts[indx] && myPosts[indx]._id} createdBy={myPosts[indx] && myPosts[indx].createdBy} userIdThruAuth={userIdThruAuth} userId={userId} isDeleteCommentLoading={home.isDeleteCommentLoading} handleGotoProfileViaCommentSectionWithAllComments={handleGotoProfileViaCommentSectionWithAllComments} key={comments.commentId} comments={comments} />)}
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
            </DialogContent>
            <DialogActions>
                {home.posts && home.posts.filter(post => post.createdBy === userId).length > 1 ?
                    <div>
                        <NavigateBeforeSharpIcon fontSize="large" color="secondary" onClick={handlePrev} className={classes.navigatePrev} >Previous</NavigateBeforeSharpIcon>
                        <NavigateNextSharpIcon fontSize="large" color="primary" onClick={handleNext} className={classes.navigateNext} >Next</NavigateNextSharpIcon>
                    </div>
                    : null
                }

            </DialogActions>
        </Dialog>
    )
}

export default MyPostModal



const DeleteModalConfirmation = (props) => {
    const classes = useStyles()
    const { deleteModalState, handleCloseDeleteModal, DeletePost, myPostsId, closeParentModal, indx } = props
    const [modalState, setModalState] = useState(false)
    useEffect(() => {
        setModalState(deleteModalState)
    }, [props])
    const handleCloseDeleteModalConfirmation = () => {
        handleCloseDeleteModal(!modalState)
    }
    const handleConfirmDeletePost = () => {
        DeletePost({ postId: myPostsId })
        handleCloseDeleteModalConfirmation()
        closeParentModal(!modalState, indx)
    }
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={modalState} onClose={handleCloseDeleteModalConfirmation}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography variant="h5">Are you sure you want to delete this post?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button className={classes.confirmDeletePostBtn} onClick={handleConfirmDeletePost} variant="contained">Confirm</Button>
                <Button className={classes.cancelDeletePostBtn} onClick={handleCloseDeleteModalConfirmation} variant="contained" color="default">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}