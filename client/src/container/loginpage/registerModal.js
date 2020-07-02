import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Divider,
    Grid,
    Snackbar,
    CircularProgress,
    IconButton,
    InputAdornment
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles({
    title: {
        fontSize: 20
    },
    textField: {
        width: '100%'
    },
    cancelBtn: {
        textTransform: 'none',
        paddingRight: 10,

    },
    registerBtn: {
        textTransform: 'none',
        paddingRight: 10,
        backgroundColor: '#ad0ea3',
        color: 'white',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    },
    visiblilityIcons: {
        color: 'black'
    }
})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const RegisterModal = (props) => {
    const classes = useStyles()
    const { state, handleClose, Register, auth, ClearMessage } = props
    const [modalState, setModalState] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        setModalState(state)
        if (auth.msg && auth.msg.id === "REGISTER_FAILED") {
            setSeverity('error')
            setError(true)
            setOpenSnack(true)
            setMsg(auth.msg && auth.msg.content.msg)
        }
        if (auth.msg.msg === "Registered successfully!") {
            setSeverity('success')
            setError(false)
            setOpenSnack(true)
            setMsg(auth.msg.msg)
        }

    }, [props])
    const handleCloseModal = () => {
        handleClose(!modalState)
    }
    const handlePasswordVisibility = () => {
        setIsVisible(!isVisible)
    }
    const handleRegister = () => {
        const data = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password
        }
        Register(data)
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleFocus = () => {
        ClearMessage()
        setError(false)
    }
    return (
        <Dialog maxWidth="lg" disableBackdropClick className={classes.dialog} open={modalState} onClose={handleCloseModal}>
            <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <DialogTitle>
                <Typography className={classes.title}>Renztagram Registration</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid item xs={12}>
                    <TextField
                        onFocus={handleFocus}
                        error={error}
                        fullWidth
                        className={classes.textField}
                        autoFocus
                        type="text"
                        label="First Name"
                        placeholder="Enter first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onFocus={handleFocus}
                        error={error}
                        fullWidth
                        className={classes.textField}
                        type="text"
                        label="Last Name"
                        placeholder="Enter last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onFocus={handleFocus}
                        error={error}
                        fullWidth
                        className={classes.textField}
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onFocus={handleFocus}
                        error={error}
                        fullWidth
                        className={classes.textField}

                        label="Password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
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
            </DialogContent>
            <Divider />
            <DialogActions>
                {auth.isLoadingRegister ? <CircularProgress /> :
                    <Button className={classes.registerBtn} onClick={handleRegister} variant="contained" color="primary">Register</Button>
                }

                <Button className={classes.cancelBtn} onClick={handleCloseModal} variant="contained" color="default">Cancel</Button>


            </DialogActions>
        </Dialog>
    )
}

export default RegisterModal

