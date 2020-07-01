import React, { useState, useEffect } from 'react'
import { Grid, Typography, Tooltip, Paper, Avatar, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
const useStyles = makeStyles((theme) => ({
    rootGrid: {
        width: 200,
        maxWidth: 200,
        minWidth: 200,
        height: 250,
        maxHeight: 250,
        minHeight: 250
    },
    fullNameTypo: {
        paddingTop: 10,
        overflowWrap: 'break-word',
        whiteSpace: 'nowrap',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold'
    }, tibay: {
        color: '#ad0ea3', fontWeight: 'bold', fontSize: 17
    },
    odd: {
        backgroundColor: 'lightpink',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    },
    even: {
        backgroundColor: '#FFF',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    }

}))
const SuggestionsContainer = props => {
    const classes = useStyles()
    const { profile, auth, history } = props
    const userIdThruAuth = auth.user && auth.user._id
    const myUserProfile = profile.userProfiles && profile.userProfiles.filter(up => up.userId === userIdThruAuth)

    const userProfilesImNotFollowing = profile.userProfiles && profile.userProfiles.filter(up => myUserProfile[0] && myUserProfile[0].following.every(myUp => myUp.userId !== up.userId))
    const userProfilesImNotFollowingWithoutMyProfile = userProfilesImNotFollowing && userProfilesImNotFollowing.filter(up => up.userId !== userIdThruAuth)
    const users = profile.users && profile.users
    const final = userProfilesImNotFollowingWithoutMyProfile && userProfilesImNotFollowingWithoutMyProfile.map((up, ind) => ({ ...up, ...users.find(user => user._id === up.userId) })).filter(up => up.isPrivate === false)
    // console.log("profi", myUserProfile)
    // console.log("profile", profile)
    // console.log("userProfilesImNotFollowing", userProfilesImNotFollowing)
    // console.log("final", userProfilesImNotFollowingWithoutMyProfile)
    // console.log("END", final)
    const handleGoToProfile = (userId) => {
        history.push(`/profile/${userId}`)
    }
    return (
        <Paper>
            {final && final.length > 0 ?
                <Grid container>

                    {final && final.map((user, index) =>
                        <Grid key={user._id} onClick={() => handleGoToProfile(user._id)} className={index % 2 === 0 ? classes.even : classes.odd} container  >
                            <Grid container justify="center" item xs={8}>
                                <Typography className={classes.fullNameTypo} variant="body1">
                                    {`${user.firstName} ${user.lastName}`}
                                </Typography>
                            </Grid>
                            <Grid container justify="center" item xs={4}>
                                <Avatar src={`data:image/jpeg;base64,${arrayBufferToBase64(user.profileImageFile.data.data)}`} />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>)
                    }

                </Grid>
                :
                <Grid container justify="center">
                    <Typography className={classes.tibay} variant="body1">
                        {`Naka follow ka sa lahat?
                         Tibay!`}
                    </Typography>
                </Grid>
            }
        </Paper>
    )
}

export default SuggestionsContainer