import React, { useState, useEffect } from 'react'
import UnauthorizedPage from '../unauthorizedpage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Container, Button, CircularProgress, Snackbar, Avatar, Tooltip, Divider, Typography, BottomNavigation, BottomNavigationAction, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert';
import { logoutAction } from '../loginpage/action'
import { fetchPostAction, fetchCommentAction, addCommentAction, clearMessageAction, deletePostAction, addPostAction, deleteCommentAction, likePostAction, unlikePostAction } from '../homepage/action'
import { fetchUsersAction } from './action'

import { editProfilePicAction, changePasswordAction, clearMessageAction as ClearChangePassMessageAction, friendRequestAction, unfriendRequestAction } from './edit-profile-container/action'
import { bindActionCreators } from 'redux'
import MyPosts from './myPosts'
import MyPostModal from './myPostModal'
import SettingsModal from './settingsModal'
//home components
import AddPostModal from './addPostModal'

//followers component
import FollowersPage from '../followersPage/followersModal'
import FollowingPage from '../followersPage/followingModal'

import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    postsGrid: {
        paddingTop: 10
    },
    profileDivider: {
        fontStyle: 'bold'
    },
    profileDividerGrid: {
        paddingTop: 20,
        paddingBottom: 20
    },
    profilePicGrid: {
        paddingTop: 30
    },
    profileInfoGrid: {
        paddingTop: 30,

    },
    avatar: {
        width: theme.spacing(23),
        height: theme.spacing(22.5),
        cursor: 'pointer',
        position: 'relative'
    },
    avatarLoading: {
        width: theme.spacing(23),
        height: theme.spacing(22.5),
        cursor: 'pointer',
        position: 'relative',
        opacity: 0.4
    },
    avatarChangePhotoLoading: {
        position: 'absolute',
        top: '25%',
        //left: '45%'
    },
    noPostMessage: {
        textAlign: 'center',
        color: '#ad0ea3',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    bottomNav: {
        position: 'sticky',
        bottom: 0,
        paddingTop: 30
        //paddingBottom: 0
    },
    root: {
        paddingTop: 0
    },
    addPostIcon: {
        border: 'solid 1px gray',
        borderRadius: 5,
        padding: 10
    },
    motto: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    settingsIcon: {
        cursor: 'pointer'
    },
    viewFollowers: {
        cursor: 'pointer'
    },
    viewFollowing: {
        cursor: 'pointer'
    }
}))
const ProfilePage = (props) => {
    const classes = useStyles()
    const { history, auth, home, profile, editProfile, Logout, FetchPost, match,
        FetchUsers, FetchComments, AddComment, DeletePost, AddPost, EditProfilePicture, ChangePassword,
        ClearMessage, ClearChangePassMessage, FriendRequest, UnfollowRequest, DeleteComment, LikePost, UnlikePost } = props
    const [modalState, setModalState] = useState(false)
    const [addPostModalState, setAddPostModalState] = useState(false)
    const [msg, setMsg] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [index, setIndex] = useState(0)
    //const userId = auth.user && auth.user._id

    const [profilePicModal, setProfilePicModal] = useState(false)
    const [settingsModalState, setSettingsModalState] = useState(false)
    const [followersModalState, setFollowersModalState] = useState(false)
    const [followingModalState, setFollowingModalState] = useState(false)

    const userId = match.params.id
    const userIdThruAuth = auth.user && auth.user._id
    const userProfile = profile.userProfiles.filter(profile => profile.userId === userId)
    const myUsers = profile.users && profile.users
    const myProfile = myUsers.filter(users => users._id === userId)
    //const myProfile = profile.userProfiles && profile.userProfiles.filter(userProfile => myUsers.some(user => userProfile.userId === user._id))
    useEffect(() => {
        console.log("triggered")
        FetchPost()
        FetchUsers()
        FetchComments()
        if (home.msg && home.msg.msg === 'Post deleted!') {
            setSeverity('success')
            setOpenSnack(true)
            setMsg(home.msg && home.msg.msg)
        }
    }, [home.msg])
    const handleLogout = () => {
        Logout()
        history.push('/')
    }
    const handleAddModal = () => {
        setAddPostModalState(!addPostModalState)
    }
    const handleProfilePicModal = () => {
        {
            userId === userIdThruAuth ?
                setProfilePicModal(!profilePicModal) : setProfilePicModal(false)
        }

    }
    const handleCloseProfilePicModal = state => {
        setProfilePicModal(state)
    }
    const handleSettingsModal = () => {

        setSettingsModalState(!settingsModalState)

    }
    const handleCloseSettingsModal = state => {
        setSettingsModalState(state)
    }
    const handleCloseModal = (state, ind) => {
        setModalState(state)
        setIndex(ind)
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleGetIndexAndOpenModal = idx => {
        setIndex(idx)
        setModalState(!modalState)
    }

    const handleNextAndPrevSetIndex = idx => {
        setIndex(idx)
    }
    const handleCloseAddPostModal = (state) => {
        setAddPostModalState(state)
    }
    const handleAddPostModal = () => {
        setAddPostModalState(!addPostModalState)
    }
    //console.log("userIdthruparams", myProfile)
    // console.log("userIdthruauth", auth.user && auth.user._id)
    const handleEditProfilePage = () => {
        history.push(`/profile/${userIdThruAuth}/edit-profile`)
    }
    //FOLLOWERS PAGE
    const handleFollowersPage = () => {
        setFollowersModalState(!followersModalState)
    }
    const handleCloseFollowersPage = state => {
        //console.log("PROFILEPAGE FOLLOWERSTATE", state)
        setFollowersModalState(state)
    }

    //FOLLOWING PAGE
    const handleFollowingPage = () => {
        setFollowingModalState(!followingModalState)
    }
    const handleCloseFollowingPage = state => {
        setFollowingModalState(state)
    }
    //console.log("PROFILEPAGE asd", followersModalState)
    return (
        <Container>
            {auth && auth.isAuthenticated ?
                <Grid container>
                    <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity={severity}>
                            {msg}
                        </Alert>
                    </Snackbar>
                    <AddPostModal ClearMsg={ClearMessage} home={home} auth={auth} AddPost={AddPost} state={addPostModalState} handleClose={handleCloseAddPostModal} />

                    <MyPostModal LikePost={LikePost} UnlikePost={UnlikePost} DeleteComment={DeleteComment} history={history} userIdThruAuth={userIdThruAuth} FetchComments={FetchComments} userId={userId} handleNextAndPrevSetIndex={handleNextAndPrevSetIndex} DeletePost={DeletePost} ClearMessage={ClearMessage} AddComment={AddComment} auth={auth} home={home} profile={profile} index={index} state={modalState} handleClose={handleCloseModal} />
                    {/* <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button> */}

                    <EditProfilePicModal auth={auth} EditProfilePicture={EditProfilePicture} handleClose={handleCloseProfilePicModal} state={profilePicModal} />


                    <SettingsModal profile={profile} UnfollowRequest={UnfollowRequest} FriendRequest={FriendRequest} ClearChangePassMessage={ClearChangePassMessage} userIdThruParams={userId} userId={userIdThruAuth} editProfile={editProfile} ChangePassword={ChangePassword} history={history} Logout={Logout} state={settingsModalState} handleClose={handleCloseSettingsModal} />


                    <FollowersPage history={history} profile={profile} userProfile={userProfile} state={followersModalState} handleClose={handleCloseFollowersPage} />
                    <FollowingPage history={history} profile={profile} userProfile={userProfile} state={followingModalState} handleClose={handleCloseFollowingPage} />

                    <Grid container>
                        <Grid className={classes.profilePicGrid} item lg={4} md={4} sm={12} xs={12}>
                            <Grid container justify="center">
                                <Grid container justify="center" item xs={12}>
                                    <Avatar onClick={handleProfilePicModal} className={editProfile.isLoading ? classes.avatarLoading : classes.avatar}
                                        src={`data:image/jpeg;base64,${arrayBufferToBase64(userProfile[0] && userProfile[0].profileImageFile.data.data)}`}
                                    />
                                    {editProfile.isLoading ? <CircularProgress className={classes.avatarChangePhotoLoading} /> : null}
                                </Grid>
                                <Grid container justify="center" item xs={12}>
                                    <Typography className={classes.motto} variant="body">
                                        {userProfile[0] && userProfile[0].motto}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.profileInfoGrid} item lg={8} md={8} sm={12} xs={12}>
                            <Grid justify="center" container>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography variant="h5">
                                            {`${myProfile[0] && myProfile[0].firstName} ${myProfile[0] && myProfile[0].lastName}`}
                                        </Typography>
                                    </Grid >

                                    <Grid item xs={3}>
                                        <Tooltip title="Settings" placement="right"><SettingsIcon onClick={handleSettingsModal} className={classes.settingsIcon} /></Tooltip>
                                    </Grid >
                                    <Grid item xs={4}>
                                        {userId === userIdThruAuth ?
                                            <Button style={{ textTransform: 'none' }} onClick={handleEditProfilePage} variant="outlined">Edit Profile</Button>
                                            : null}
                                    </Grid >
                                </Grid>
                                <Grid item lg={12} md={12} sm={4} xs={4} >
                                    <span><b>{home.posts && home.posts.filter((post) => post.createdBy === userId).length}</b></span> Post(s)
                                </Grid>
                                <Grid item lg={12} md={12} sm={4} xs={4} >
                                    <span className={classes.viewFollowers} onClick={handleFollowersPage}><span><b>{userProfile[0] && userProfile[0].followers && userProfile[0].followers.length}</b></span> Follower(s)</span>
                                </Grid>
                                <Grid item lg={12} md={12} sm={4} xs={4} >
                                    <span className={classes.viewFollowing} onClick={handleFollowingPage}> <span><b>{userProfile[0] && userProfile[0].following && userProfile[0].following.length}</b></span> Following</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.profileDividerGrid} item xs={12}>
                            <Divider light={false} className={classes.profileDivider} />
                        </Grid>
                    </Grid>
                    {home.isLoading ? <Grid container justify="center" item xs={12}><CircularProgress /></Grid> :
                        <Grid className={classes.postsGrid} container justify="center" spacing={3}>

                            {home.posts && home.posts.filter((post) => post.createdBy === userId).length === 0 ?
                                <Grid item xs={12}>
                                    <Typography className={classes.noPostMessage} variant="h3">No post bruh!</Typography>
                                </Grid>
                                : home.posts && home.posts.filter((post) => post.createdBy === userId).map((post, index) =>
                                    <Grid key={post._id} item xs={4}><div onClick={() => handleGetIndexAndOpenModal(index)}><MyPosts index={index} post={post} /></div></Grid>)}
                        </Grid>
                    }
                    {userId === userIdThruAuth ?
                        <Grid className={classes.bottomNav} item lg={12} xs={12} md={12} sm={12}>
                            <BottomNavigation
                                className={classes.root}>
                                <BottomNavigationAction style={{ paddingTop: 10 }} icon={<Tooltip title="Add a post" placement="top"><AddIcon onClick={handleAddPostModal} className={classes.addPostIcon} /></Tooltip>} />
                            </BottomNavigation>
                        </Grid>
                        : null
                    }

                </Grid>
                :
                <UnauthorizedPage history={history} />}
        </Container>
    )
}
ProfilePage.propTypes = {
    auth: PropTypes.any,
    home: PropTypes.any,
    profile: PropTypes.any,
    Logout: PropTypes.func.isRequired,
    FetchPost: PropTypes.func.isRequired,
    FetchUsers: PropTypes.func.isRequired,
    FetchComments: PropTypes.func.isRequired,
    AddComment: PropTypes.func.isRequired,
    DeletePost: PropTypes.func.isRequired,
    AddPost: PropTypes.func.isRequired,
    EditProfilePicture: PropTypes.func.isRequired,
    ChangePassword: PropTypes.func.isRequired,
    ClearMessage: PropTypes.func.isRequired,

    ClearChangePassMessage: PropTypes.func.isRequired,
    FriendRequest: PropTypes.func.isRequired,
    UnfollowRequest: PropTypes.func.isRequired,
    DeleteComment: PropTypes.func.isRequired,
    LikePost: PropTypes.func.isRequired,
    UnlikePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    home: state.home,
    profile: state.profile,
    editProfile: state.editProfile
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Logout: logoutAction,
        FetchPost: fetchPostAction,
        FetchUsers: fetchUsersAction,
        FetchComments: fetchCommentAction,
        AddComment: addCommentAction,
        ClearMessage: clearMessageAction,
        DeletePost: deletePostAction,
        AddPost: addPostAction,
        EditProfilePicture: editProfilePicAction,
        ChangePassword: changePasswordAction,
        ClearChangePassMessage: ClearChangePassMessageAction,
        FriendRequest: friendRequestAction,
        UnfollowRequest: unfriendRequestAction,
        DeleteComment: deleteCommentAction,
        LikePost: likePostAction,
        UnlikePost: unlikePostAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)


const EditProfilePicModal = (props) => {
    const { state, handleClose, EditProfilePicture, auth } = props
    const [modalState, setModalState] = useState(false)
    const [imgData, setImgData] = useState({})
    useEffect(() => {
        setModalState(state)
    }, [props])

    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handleChange = (event) => {
        //setData(event.target.files)
        const file = event.target.files[0]

        setImgData(file)
        const data = {
            imgData: file,
            userId: auth.user && auth.user._id
        }
        EditProfilePicture(data)
        handleCloseModal()

    }
    const handleRemoveProfilePic = () => {
        const data = {
            imgData: {},
            userId: auth.user && auth.user._id
        }
        EditProfilePicture(data)
        handleCloseModal()
    }
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography
                    variant="h5"
                    style={{ textAlign: 'center' }}
                >
                    Change Profile Photo
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <input onChange={handleChange} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <Typography style={{ fontWeight: 'bold', textAlign: 'center', color: '#ad0ea3', cursor: 'pointer' }} variant="body1">
                                Upload
                        </Typography>
                        </label>

                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography onClick={handleRemoveProfilePic} style={{ fontWeight: 'bold', textAlign: 'center', color: 'red', cursor: 'pointer' }} variant="body1">
                            Remove Photo
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography onClick={handleCloseModal} style={{ fontWeight: 'bold', textAlign: 'center', color: 'black', cursor: 'pointer' }} variant="body1">
                            Cancel
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}


