import React from 'react'

import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BG from '../../assets/bg.jpeg'

const useStyles = makeStyles({
    gridContainer: {
        textAlign: 'center',
        height: '100vh',

        backgroundImage: `url(${BG})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    },
    gridTitle: {
        padding: 100
    },
    title: {
        color: "#FFF"
    },
    backBtn: {
        backgroundColor: '#024f14',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#03a128'
        },
        textTransform: 'none'
    }

})

const UnauthorizedPage = (props) => {
    const { history } = props
    const classes = useStyles()
    const handlePushHistory = () => {
        history.push('/')
    }
    return (
        <Grid className={classes.gridContainer}>
            <Grid className={classes.gridTitle} item xs={12}>
                <Typography className={classes.title} variant="h4" >Unauthorized</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handlePushHistory} className={classes.backBtn} variant="contained">Back to Welcome Page?</Button>
            </Grid>
        </Grid>
    )

}

export default UnauthorizedPage