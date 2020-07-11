import React from 'react'
import { Grid, Container, CardMedia, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import stars from '../../assets/stars.jpeg'
const useStyles = makeStyles((theme) => ({
    welcomeTypo: {
        textAlign: 'center',
        color: 'linear-gradient(to right, red , yellow)'
    },
    goodTo: {
        textAlign: 'center'
    },
    rootContainer: {
        height: '88vh',
        position: 'relative',
        width: '100%'
    },
    bottomButtons: {
        bottom: 0,
        position: 'absolute',

        width: '95%'
    },
    facebookIcon: {
        color: 'rgb(17, 82, 147)',
        fontSize: 50,
        "&:hover": {
            opacity: .7
        }
    },
    instagramIcon: {
        fontSize: 50,
        color: '#fb3958',
        "&:hover": {
            opacity: .7
        }
    },
    backgroundImage: {
        height: 150,
        width: '100%'
    },
    image: {
        height: 'inherit',
        width: 'inherit',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        objectFit: 'cover'
    },
    loginBtn: {
        textTransform: 'none',
        width: 200,
        backgroundColor: '#ad0ea3',
        color: '#FFF',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    }
}))
const WelcomePage = props => {
    const { history } = props
    const classes = useStyles()
    const handleGoToLogin = () => {
        history.push('/login')
    }
    return (
        <React.Fragment className={classes.rootContainer}>
            <div className={classes.backgroundImage}>
                <img className={classes.image} src={stars} alt="stars" />
            </div>
            <Container>

                <Grid style={{ paddingTop: 50 }} container>
                    <Grid item xs={12}>
                        <Typography className={classes.welcomeTypo} variant="h2">
                            Hello!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.goodTo} variant="body1">
                            Good to see you here
                        </Typography>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Button variant="contained" onClick={handleGoToLogin} className={classes.loginBtn}>Login</Button>
                    </Grid>
                </Grid>
                <Grid className={classes.bottomButtons} container>

                    <Grid container justify="center" item xs={6}>
                        <Button ><a target="_blank" href="https://www.facebook.com/serilo.renz/"> <FacebookIcon className={classes.facebookIcon} /></a></Button>
                    </Grid>
                    <Grid container justify="center" item xs={6}>
                        <Button><a target="_blank" href="https://www.instagram.com/rnzsrl_/"> <InstagramIcon className={classes.instagramIcon} /></a> </Button>
                    </Grid>


                </Grid>
            </Container >
        </React.Fragment>
    )
}

export default WelcomePage