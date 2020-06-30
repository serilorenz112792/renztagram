import React, { useState, useEffect } from 'react'
import { fetchUsersAction, fetchUserProfileSuccessAction } from '../action'
import { editProfileInfoAction, clearMessageAction } from './action'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Typography, TextField, Button, Avatar, CircularProgress, IconButton, InputLabel, Select, MenuItem, FormControl, Switch, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import UnauthorizedPage from '../../unauthorizedpage'
import arrayBufferToBase64 from '../../../utils/arrayBufferToBase64'
const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#ad0ea3'
    },
    rootGridContainer: {
        paddingTop: 30,
        paddingBottom: 30
    },
    textField: {
        maxWidth: 500
    },
    saveBtn: {
        textTransform: 'none',
        backgroundColor: '#ad0ea3',
        color: 'white',
        "&:hover": {
            backgroundColor: '#f719e9'
        },
        float: 'right'
    }
}))

const EditProfilePage = props => {
    const classes = useStyles()
    const { auth, profile, editProfile, FetchUsers, match, history, EditProfileInfo, ClearMessage } = props
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [birthDay, setBirthday] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [motto, setMotto] = useState('')
    const [disableSaveBtn, setDisableSaveBtn] = useState(false)

    const userId = match.params.id
    //const myUsers = profile.users && profile.users.filter(user => user)
    const myUserProfile = profile.userProfiles && profile.userProfiles.filter(userProfile => userProfile.userId === userId)
    const myUser = profile.users && profile.users.filter(user => user._id === userId)
    const genders = [{ value: 'Male' }, { value: 'Female' }]
    useEffect(() => {

        FetchUsers()
        setFirstName(myUser[0] && myUser[0].firstName)
        setLastName(myUser[0] && myUser[0].lastName)
        if (myUserProfile[0] && myUserProfile[0].gender) {
            setGender(myUserProfile[0] && myUserProfile[0].gender)
        }
        else {
            setGender('Male')
        }
        if (myUserProfile[0] && myUserProfile[0].age) {
            setAge(myUserProfile[0] && myUserProfile[0].age)
        }
        if (myUserProfile[0] && myUserProfile[0].birthday) {
            setBirthday(myUserProfile[0] && myUserProfile[0].birthday.substring(0, myUserProfile[0] && myUserProfile[0].birthday.lastIndexOf("T")))
        }
        if (myUserProfile[0] && myUserProfile[0].motto) {
            setMotto(myUserProfile[0] && myUserProfile[0].motto)
        }
        if (myUserProfile[0] && myUserProfile[0].isPrivate) {
            setIsPrivate(myUserProfile[0] && myUserProfile[0].isPrivate)
        }

        if (myUserProfile.length < 1) {
            setBirthday(new Date().toISOString().substring(0, new Date().toISOString().lastIndexOf("T")))
            setAge(0)
            setGender('Male')
            setMotto('')
            setIsPrivate(false)

        }

        if (editProfile.msg && editProfile.msg.msg === 'Profile info editted!') {
            setDisableSaveBtn(false)
            ClearMessage()
            history.push(`/profile/${userId}`)
        }
    }, [auth, editProfile, myUserProfile[0] && myUserProfile[0]])
    //console.log("users", myUserProfile)
    // console.log("myUserProfile", myUserProfile.map((userProfile) => { return userProfile }))
    // console.log("firstName", gender)
    // console.log("Age", age)
    //console.log("Birthday", birthDay)
    // console.log("bio", motto)
    // console.log("isPrivaet", isPrivate)


    const handleGetGender = (e) => {
        setGender(e.target.value)
    }


    const handleSave = () => {
        const data = {
            firstName,
            lastName,
            age,
            gender,
            birthday: birthDay,
            isPrivate,
            motto,
            userId: userId
        }
        EditProfileInfo(data)

    }
    return (
        <Container>
            {auth && auth.isAuthenticated ?
                <Grid className={classes.rootGridContainer} container>
                    <Grid container justify="center" item xs={12}>
                        <Typography className={classes.title} variant="h3">Edit Profile</Typography>
                    </Grid>

                    <Grid container justify="center" item xs={12}>
                        <TextField
                            value={firstName}
                            className={classes.textField}
                            type="text"
                            autoFocus
                            autoCapitalize
                            label="First Name"
                            placeholder="Enter first name"
                            fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <TextField
                            value={lastName}
                            className={classes.textField}
                            type="text"
                            autoCapitalize
                            label="Last Name"
                            placeholder="Enter last Name"
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Grid style={{ maxWidth: 500 }} item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="category">Gender</InputLabel>
                                <Select
                                    style={{ maxWidth: 500 }}
                                    labelId="category"
                                    onChange={handleGetGender}
                                    value={gender}
                                >
                                    {genders.map((gender, ind) => <MenuItem key={ind} value={gender.value}>
                                        {gender.value}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" item xs={12}>

                        <TextField
                            value={age}
                            className={classes.textField}
                            type="number"
                            label="Age"
                            placeholder="Enter age"
                            fullWidth
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Grid style={{ maxWidth: 500 }} item xs={12}>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                value={birthDay}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <TextField
                            value={motto}
                            className={classes.textField}
                            type="text"
                            label="Bio"
                            placeholder="Enter bio"
                            fullWidth
                            onChange={(e) => setMotto(e.target.value)}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Grid style={{ maxWidth: 500 }} item xs={12}>
                            <FormControlLabel
                                control={<Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} name="Private" />}
                                label="Set profile to private"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Grid style={{ maxWidth: 500 }} item xs={12}>
                            {editProfile.isLoading ? <CircularProgress style={{ float: 'right' }} /> : <Button onClick={handleSave} className={classes.saveBtn} variant="contained">Save</Button>}
                        </Grid>
                    </Grid>
                </Grid>
                : <UnauthorizedPage history={history} />}

        </Container>
    )
}
EditProfilePage.propTypes = {
    auth: PropTypes.any,
    profile: PropTypes.any,
    editProfile: PropTypes.any,
    FetchUsers: PropTypes.func.isRequired,
    EditProfileInfo: PropTypes.func.isRequired,
    ClearMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    editProfile: state.editProfile
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        FetchUsers: fetchUsersAction,
        EditProfileInfo: editProfileInfoAction,
        ClearMessage: clearMessageAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)