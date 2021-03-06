import React, { useEffect } from 'react'
import { Grid, Container, CardMedia, Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux'
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

    },
    instagramIcon: {
        fontSize: 50,
        color: '#fb3958',

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
    },
    fbbtn: {
        "&:hover": {
            backgroundColor: 'lightblue'
        }
    },
    igbtn: {
        "&:hover": {
            backgroundColor: 'lightpink'
        }
    }
}))
const WelcomePage = props => {
    const { history, auth } = props
    const classes = useStyles()
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/home')
        }
    }, [auth])
    const handleGoToLogin = () => {
        history.push('/login')
    }
    return (
        <div className={classes.rootContainer}>
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
                            Welcome to Renztagram
                        </Typography>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Button variant="contained" onClick={handleGoToLogin} className={classes.loginBtn}>Login</Button>
                    </Grid>
                    <Grid style={{ paddingTop: 70 }} container justify="center" item xs={12}>
                        <Typography variant="body1">
                            follow me <b>@</b>
                        </Typography>
                    </Grid>
                    <Grid container justify="flex-end" item xs={6}>
                        <Button className={classes.fbbtn}><a target="_blank" href="https://www.facebook.com/serilo.renz/"> <FacebookIcon className={classes.facebookIcon} /></a></Button>
                    </Grid>
                    <Grid container justify="flex-start" item xs={6}>
                        <Button className={classes.igbtn}><a target="_blank" href="https://www.instagram.com/rnzsrl_/"> <InstagramIcon className={classes.instagramIcon} /></a> </Button>
                    </Grid>
                </Grid>

            </Container >
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(WelcomePage)