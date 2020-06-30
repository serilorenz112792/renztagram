import React, { useState, useEffect } from 'react'
import { Dialog, Grid, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, TextField, Snackbar, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert';
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    logout: {
        textAlign: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'red'
    },
    changePass: {
        textAlign: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#ad0ea3'
    },
    cancel: {
        textAlign: 'center',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    changePassDialogTitle: {
        textAlign: 'center'
    },
    changePassCancelBtn: {
        textTransform: 'none'
    },
    changePassSubmitBtn: {
        textTransform: 'none',
        color: '#FFF',
        backgroundColor: '#ad0ea3',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    },
    followUnfollow: {
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#ad0ea3',
    }
}))

const SettingsModal = props => {
    const classes = useStyles()
    const { state, handleClose, history, Logout, ChangePassword,
        ClearChangePassMessage, editProfile, userId, userIdThruParams,
        FriendRequest, UnfollowRequest, profile } = props
    const [modalState, setModalState] = useState(false)
    const [changePassModalState, setChangePassModalState] = useState(false)

    const friendsProfile = profile.users && profile.users.filter(user => user._id === userIdThruParams)
    const myProfile = profile.users && profile.users.filter(user => user._id === userId)

    const myUserProfile = profile.userProfiles && profile.userProfiles.filter(user => user.userId === userId)
    const friendsUserProfile = profile.userProfiles && profile.userProfiles.filter(user => user.userId === userIdThruParams)

    const checkFollowers = friendsUserProfile[0] && friendsUserProfile[0].followers.filter(follower => follower.userId === userId)

    //console.log("checkFollowers", checkFollowers && checkFollowers.length)
    useEffect(() => {
        setModalState(state)
    }, [props])
    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handleLogout = () => {
        Logout()
        history.push('/')
    }

    const handleChangePassModal = () => {
        setChangePassModalState(!changePassModalState)
    }
    const handleCloseChangePassModal = state => {
        setChangePassModalState(state)
    }
    const handleFollow = () => {
        const data = {
            myId: myProfile[0] && myProfile[0]._id,
            myFirstName: myProfile[0] && myProfile[0].firstName,
            myLastName: myProfile[0] && myProfile[0].lastName,
            userId: friendsProfile[0] && friendsProfile[0]._id,
            firstName: friendsProfile[0] && friendsProfile[0].firstName,
            lastName: friendsProfile[0] && friendsProfile[0].lastName,
            //imgData: arrayBufferToBase64(friendsUserProfile[0] && friendsUserProfile[0].profileImageFile && friendsUserProfile[0].profileImageFile.data.data),
            //myImgData: arrayBufferToBase64(myUserProfile[0] && myUserProfile[0].profileImageFile && myUserProfile[0].profileImageFile.data.data)
        }
        console.log("data", data)
        FriendRequest(data)
    }
    const handleUnfollow = () => {
        const data = {
            myId: myProfile[0] && myProfile[0]._id,
            userId: friendsProfile[0] && friendsProfile[0]._id
        }
        // console.log("data", data)
        UnfollowRequest(data)
    }

    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={modalState} onClose={handleCloseModal}>
            <DialogContent>

                <ChangePasswordModal ClearChangePassMessage={ClearChangePassMessage} userId={userId} editProfile={editProfile} ChangePassword={ChangePassword} state={changePassModalState} handleClose={handleCloseChangePassModal} />

                {userId === userIdThruParams ?
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography onClick={handleLogout} className={classes.logout} variant="body1">
                                Logout
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography onClick={handleChangePassModal} className={classes.changePass} variant="body1">
                                Change Password
                        </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.cancel} onClick={handleCloseModal} variant="body1">
                                Cancel
                        </Typography>
                        </Grid>
                    </Grid>
                    :
                    <Grid container>
                        {editProfile.followUnfollowLoading ?
                            <Grid container justify="center" item xs={12}>
                                <CircularProgress />
                            </Grid>
                            :
                            <Grid item xs={12}>
                                {checkFollowers && checkFollowers.length > 0 ? <Typography onClick={handleUnfollow} className={classes.followUnfollow} variant="body1">
                                    Unfollow
                            </Typography> :
                                    <Typography onClick={handleFollow} className={classes.followUnfollow} variant="body1">
                                        Follow
                            </Typography>
                                }
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.cancel} onClick={handleCloseModal} variant="body1">
                                Cancel
                        </Typography>
                        </Grid>
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal


function ChangePasswordModal(props) {
    const { state, handleClose, ChangePassword, editProfile, userId, ClearChangePassMessage } = props
    const classes = useStyles()
    const [modalState, setModalState] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)
    useEffect(() => {
        setModalState(state)
        if (editProfile.msg && editProfile.msg === 'Password changed!') {

            setOpenSnack(true)
            setSeverity('success')
            setError(false)
            setMsg(editProfile.msg)
            setPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
            ClearChangePassMessage()

        }
        if (editProfile.msg && editProfile.msg !== 'Password changed!' && editProfile.msg !== "") {
            setOpenSnack(true)
            setSeverity('error')
            setError(true)
            setMsg(editProfile.msg)
            ClearChangePassMessage()
        }
    }, [props, editProfile.msg])

    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handleSubmit = () => {
        const data = {
            password,
            newPassword,
            confirmNewPassword,
            userId
        }
        //console.log("data", data)
        ChangePassword(data)
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleFocus = () => {
        setError(false)
        ClearChangePassMessage()
    }
    //console.log("MESSAGE", msg)
    //console.log("editprofilemsg", editProfile.msg && editProfile.msg.msg)
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography className={classes.changePassDialogTitle} variant="h5">
                    Change Password
                </Typography>

            </DialogTitle>
            <DialogContent>
                <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={severity}>
                        {msg || msg.msg}
                    </Alert>
                </Snackbar>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            value={password}
                            onFocus={handleFocus}
                            error={error}
                            autoFocus
                            label="Password"
                            placeholder="Enter your password"
                            fullWidth
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={newPassword}
                            onFocus={handleFocus}
                            error={error}
                            label="New Password"
                            placeholder="Enter your new password"
                            fullWidth
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={confirmNewPassword}
                            onFocus={handleFocus}
                            error={error}
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            fullWidth
                            type="password"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {editProfile.passwordLoading ? <CircularProgress /> : <Button onClick={handleSubmit} className={classes.changePassSubmitBtn} variant="contained" >Submit</Button>}
                <Button onClick={handleCloseModal} className={classes.changePassCancelBtn} variant="contained" color="default">Cancel</Button>
            </DialogActions>
        </Dialog>
    )

}