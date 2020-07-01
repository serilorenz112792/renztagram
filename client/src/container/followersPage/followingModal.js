import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
    Grid, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions,
    Avatar, Typography, Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
const useStyles = makeStyles((theme) => ({
    dialogRoot: {
        //width: '300px',
        //maxWidth: '600px'
    },
    typographyFullName: {
        paddingTop: 10,
        margin: 0,
        overflowWrap: 'break-word',
        textAlign: 'center',
        cursor: 'pointer'
    },
    typographyTitle: {
        textAlign: 'center',

    },
    avatar: {
        cursor: 'pointer'
    },
    even: {
        backgroundColor: 'lightgray',
        "&:hover": { backgroundColor: '#f719e9' }
    },
    odd: {
        backgroundColor: '#FFF',
        "&:hover": { backgroundColor: '#f719e9' }
    }
}))
const FollowingPage = props => {
    const classes = useStyles()
    const { state, handleClose, userProfile, profile, history } = props
    const [modalState, setModalState] = useState(false)
    useEffect(() => {
        setModalState(state)
    }, [props])
    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handleGoToProfile = userId => {
        handleClose(false)
        history.push(`/profile/${userId}`)
    }
    const userP = userProfile
    const myProfile = profile.userProfiles && profile.userProfiles.filter(userProfile => userP && userP[0] && userP[0].following.some(user => userProfile.userId === user.userId))

    const following = userProfile && userProfile[0] && userProfile[0].following
    const filteredUserP = profile.userProfiles && profile.userProfiles.filter(userP => following.some(follower => userP.userId === follower.userId))
    const a3 = userProfile && userProfile[0] && userProfile[0].following.map(t1 => ({ ...t1, ...filteredUserP.find(t2 => t2.userId === t1.userId) }))

    //console.log("userProfile sa followers", userProfile && userProfile[0] && userProfile[0].followers.length)
    //console.log("Profile", myProfile)
    //const combinedArr = [...userP, ...myProfile]
    //console.log("CombinedArr", combinedArr)
    return (
        <Dialog className={classes.dialogRoot} open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography className={classes.typographyTitle} variant="h5">
                    Following
                </Typography>
            </DialogTitle>
            <DialogContent style={{ minWidth: 200, paddingBottom: 15, paddingLeft: 0, paddingRight: 0 }}>
                <Grid container >
                    {userProfile && userProfile[0] && userProfile[0].following.length ?
                        <Grid container justify="center">
                            {a3.map((follower, index) =>

                                <Grid style={{ height: '40px' }} className={index % 2 === 0 ? classes.even : classes.odd} key={index} container>
                                    <Grid item xs={8}>
                                        <Typography onClick={() => handleGoToProfile(follower.userId)} className={classes.typographyFullName} variant="body1">{`${follower.firstName} ${follower.lastName}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Avatar style={{ cursor: 'pointer' }} onClick={() => handleGoToProfile(follower.userId)} src={`data:image/jpeg;base64,${arrayBufferToBase64(follower.profileImageFile.data.data)}`} />
                                    </Grid>

                                </Grid>
                            )}
                            {/* {userProfile && userProfile[0] && userProfile[0].following.map((follower, index) =>

                                <Grid style={{ height: '40px' }} className={index % 2 === 0 ? classes.even : classes.odd} key={index} container>
                                    <Grid item xs={8}>
                                        <Typography onClick={() => handleGoToProfile(follower.userId)} className={classes.typographyFullName} variant="body1">{`${follower.firstName} ${follower.lastName}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Avatar style={{ cursor: 'pointer' }} onClick={() => handleGoToProfile(follower.userId)} src={`data:image/jpeg;base64,${follower.profileImageFile}`} />
                                    </Grid>
                                </Grid>


                            )} */}
                        </Grid>
                        :
                        <Grid container justify="center">
                            <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} variant="body1">
                                Following no one!
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    )
}


FollowingPage.propTypes = {
    auth: PropTypes.any,
    profile: PropTypes.any
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({

    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowingPage)