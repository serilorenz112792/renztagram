import React, { useState, useEffect } from 'react'

import { Dialog, DialogTitle, DialogContent, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    likerName: {
        fontSize: 15,
        fontWeight: 'bold',
        cursor: 'pointer'
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

const LikersModal = props => {
    const classes = useStyles()
    const { state, handleClose, likers, profile, history, handleGoToProfileViaLiker } = props
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        setModalState(state)
    }, [props])
    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    // const handleGoToProfileViaLiker = userId => {
    //     history.push(`/profile/${userId}`)
    //     handleCloseModal()
    // }
    //console.log("profile", profile)
    //console.log("likers", likers)
    //const myLikersProfile = profile && profile.userProfiles.map(userP => ({ ...userP, ...likers && likers.find(liker => liker._id === userP.userId) }))
    //.filter(liker => liker.likedPost.length > 0)
    //console.log("mylikers profie", )
    return (
        <Dialog open={modalState} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography variant="body1">
                    People who likes this post
                </Typography>
            </DialogTitle>
            <DialogContent>
                {likers && likers.map((liker, ind) =>
                    <Grid className={ind % 2 === 0 ? classes.even : classes.odd} key={liker._id} container justify="center">
                        <Grid container justify="center" item xs={12}>
                            <Typography onClick={() => handleGoToProfileViaLiker(liker._id)} className={classes.likerName} variant="caption">{`${liker.firstName} ${liker.lastName}`}</Typography>
                        </Grid>
                    </Grid>)}
            </DialogContent>
        </Dialog>
    )
}

export default LikersModal