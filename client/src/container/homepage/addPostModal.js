import React, { useState, useEffect } from 'react'

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Typography, Grid, Button, Divider, Snackbar, CircularProgress, LinearProgress, Box
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'
import nophoto from '../../assets/nophoto.png'
const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        textAlign: 'center',
        color: "#ad0ea3"
    },
    postBtn: {
        textTransform: 'none',
        backgroundColor: '#ad0ea3',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    },
    cancelBtn: {
        textTransform: 'none'
    },
    uploadBtn: {
        //textTransform: 'none',
        color: '#FFF',
        backgroundColor: '#ad0ea3',
        "&:hover": {
            backgroundColor: '#f719e9'
        }
    },
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddPostModal = props => {
    const classes = useStyles()
    const { state, handleClose, auth, home, AddPost, AddLinearProgress, ClearMsg } = props
    const [modalState, setModalState] = useState(false)
    const [caption, setCaption] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [imgData, setImgData] = useState({})
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)
    const [postBtnDisable, setPostBtnDisable] = useState(true)
    const [imgIconBtnDisable, setImgIconBtnDisable] = useState(false)
    const [msg, setMsg] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setModalState(state)
        if (home.addPostMsg && home.addPostMsg.msg === 'Post created!') {
            setBtnDisable(false)

            handleCloseModal()
            ClearMsg()
        }

        // if (!home.isAddPostLoading) {
        //     setBtnDisable(false)
        // }
        if (imgData && imgData.name === '' || caption === '') {
            setPostBtnDisable(true)
        }

        if (imgData && imgData.name !== '' && imgData.name !== undefined && caption !== '') {
            setPostBtnDisable(false)
        }
        if (home.isAddPostLoading) {
            setBtnDisable(true)
            setPostBtnDisable(true)
            setImgIconBtnDisable(true)
        }

    }, [props, caption, postBtnDisable, imgData])

    //console.log("imgData", imgData.name)
    //console.log("home", progress)
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    }
    const handleCloseModal = () => {
        setImgUrl('')
        setImgData({})
        setCaption('')
        handleClose(false)
        setPostBtnDisable(true)
        setImgIconBtnDisable(false)
    }
    const handleChange = (event) => {
        //setData(event.target.files)
        const file = event.target.files[0]
        if (file === undefined) {
            setPostBtnDisable(true)
        }
        const reader = new FileReader();
        setImgData(file)


        reader.onloadend = () => {
            setImgUrl(reader.result)
        }
        if (file) {
            //alert("pumasok")
            reader.readAsDataURL(file);
            setImgUrl(reader.result);
        }
        else {
            setImgUrl("");
        }

    }
    const handleSubmitPost = () => {
        const data = {
            userId: auth.user && auth.user._id,
            imgData,
            title: caption
        }
        //console.log("data", data)
        AddPost(data)
        //handleCloseModal()
    }
    const handleChangeCaption = (e) => {
        // if (e.target.value !== '' || e.target.value !== null) {
        //     setPostBtnDisable(false)
        //     setCaption(e.target.value)
        // }
        // if (e.target.value === '' || e.target.value == null) {
        //     setPostBtnDisable(true)
        // }


        setCaption(e.target.value)
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            maxWidth='sm'
            open={modalState}
            onClose={handleCloseModal}
        >
            <DialogTitle>
                <Typography className={classes.dialogTitle} variant="h5">Add your <span style={{ fontStyle: 'italic' }}>Renztagram</span> post !</Typography>
                {home.isAddPostLoading ? <div className={classes.root}>
                    <LinearProgress color="secondary" variant="indeterminate" />
                </div> : null}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container>
                    <Grid container justify="center" item xs={12}>
                        <input disabled={imgIconBtnDisable} onChange={handleChange} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton disabled={imgIconBtnDisable} className={classes.uploadBtn} aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        {imgUrl ? <img style={{ width: 330, height: 230 }} src={imgUrl} alt="Renztagram Image" /> : <AddAPhotoIcon style={{ width: 330, height: 230 }} />}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            placeholder="Your caption...."
                            label="Caption"
                            onChange={handleChangeCaption}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                {/* {home.isAddPostLoading ? <CircularProgress color="secondary" /> : <Button disabled={postBtnDisable} onClick={handleSubmitPost} className={classes.postBtn} variant="contained" color="primary">Post</Button>} */}
                <Button disabled={postBtnDisable} onClick={handleSubmitPost} className={classes.postBtn} variant="contained" color="primary">Post</Button>
                <Button disabled={btnDisable} className={classes.cancelBtn} onClick={handleCloseModal} variant="contained" color="default">Cancel</Button>
            </DialogActions>
            {/* <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar> */}
        </Dialog>
    )
}

export default AddPostModal