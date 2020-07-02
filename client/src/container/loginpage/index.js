import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, TextField, Button, Container, Snackbar, IconButton, InputAdornment, Typography, CircularProgress } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../assets/rsz_generatedtext.png'
import { loginAction, registerAction, clearMsgAction } from './action'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RegisterModal from './registerModal'
const useStyles = makeStyles((theme) => ({
    textField: {
        maxWidth: 500
    },
    loginBtn: {
        maxWidth: 500,
        textTransform: 'none',
        backgroundColor: '#ad0ea3',
        color: 'white',
        "&:hover": {
            backgroundColor: '#f719e9'
        }

    },
    signUpbtn: {
        color: 'lightblue',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    typography: {
        maxWidth: 500,
    },
    rootContainer: {
        //backgroundColor: 'lightgray',

    },
    rootDiv: {
        height: '100vh',
        textAlign: 'center',
    },
    gridContainer: {
        backgroundColor: 'white',
    },
    gridEmail: {
        paddingBottom: 10,
        paddingTop: 50
    },
    gridLoginbtn: {
        paddingTop: 50
    },
    gridImage: {
        paddingTop: 50,
        width: 500,
        [theme.breakpoints.up('xs')]: {
            width: 'inherit',
        },
        [theme.breakpoints.up('lg')]: {
            width: 500,
        },
        [theme.breakpoints.up('sm')]: {
            width: 500,
        },
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
    image: {
        width: 'inherit'
    },
    gridSignup: {
        paddingTop: 50
    },
    visiblilityIcons: {
        color: 'black'
    }
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const LoginPage = (props) => {
    const classes = useStyles()
    const { auth, ClearMessage, Login, Register, history } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [modalState, setModalState] = useState(false)
    useEffect(() => {
        if (auth.msg && auth.msg.id === "LOGIN_FAILED") {
            setError(true)
            setOpenSnack(true)
            setMsg(auth.msg && auth.msg.content.msg)
            setSeverity('error')
        }
        else {
            if (auth.msg === "Login Successfully!") {
                setError(false)
                setOpenSnack(true)
                setMsg(auth.msg)
                setSeverity('success')
            }

            if (auth.isAuthenticated) {
                setTimeout(() => {
                    history.push('/home')
                }, 600)

            }
        }
    }, [auth])
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleLogin = (e) => {
        const data = {
            email: email.toLowerCase(),
            password
        }
        Login(data)
    }
    const handleFocus = () => {
        setError(false)
        ClearMessage()
    }
    const handlePasswordVisibility = () => {
        setIsVisible(!isVisible)
    }
    const handleRegisterModal = () => {
        setModalState(!modalState)
    }
    const handleClose = (state) => {
        setModalState(state)
    }
    return (
        <Container className={classes.rootContainer}>
            <RegisterModal ClearMessage={ClearMessage} auth={auth} Register={Register} state={modalState} handleClose={handleClose} />
            <div className={classes.rootDiv}>
                <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={severity}>
                        {msg}
                    </Alert>
                </Snackbar>
                <form onSubmit={handleLogin}>
                    <Grid container className={classes.gridContainer}>
                        <Grid className={classes.gridImage} item xs={12}>
                            <img className={classes.image} src={Logo} alt="App Logo" />
                        </Grid>
                        <Grid className={classes.gridEmail} item xs={12}>
                            <TextField
                                className={classes.textField}
                                fullWidth
                                type="text"
                                placeholder="Enter email"
                                label="Email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={handleFocus}
                                error={error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                fullWidth
                                placeholder="Enter password"
                                label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={handleFocus}
                                error={error}
                                type={isVisible ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handlePasswordVisibility}
                                            >
                                                {isVisible ? <VisibilityIcon className={classes.visiblilityIcons} /> : <VisibilityOffIcon className={classes.visiblilityIcons} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid className={classes.gridLoginbtn} item xs={12}>
                            {auth.isLoading ? <CircularProgress /> :

                                <Button
                                    className={classes.loginBtn}
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    onClick={handleLogin}
                                //onSubmit={handleLogin}
                                >Login
                                </Button>


                            }
                        </Grid>
                        <Grid className={classes.gridSignup} item xs={12}>
                            <Typography variant="body1">
                                Don't have an account? <span
                                    onClick={handleRegisterModal}
                                    className={classes.signUpbtn}>Sign up!</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
LoginPage.propTypes = {
    auth: PropTypes.any,
    Login: PropTypes.func.isRequired,
    Register: PropTypes.func.isRequired,
    ClearMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Login: loginAction,
        Register: registerAction,
        ClearMessage: clearMsgAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)