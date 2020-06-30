import React, { useState, useEffect } from 'react'
import UnauthorizedPage from '../unauthorizedpage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Container, CircularProgress, BottomNavigation, BottomNavigationAction, Snackbar, Typography, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert';
import { fetchPostAction, fetchCommentAction, addCommentAction, clearMessageAction, addPostAction } from './action'
import { fetchUserProfileAction, fetchUsersAction } from '../profilepage/action'
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux'
import Post from './post'
import AddPostModal from './addPostModal'
import { set } from 'mongoose'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root2: {
        paddingTop: 50,
        //position: 'relative'
    },
    gridSuggested: {

        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },

        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            display: 'block',
            //backgroundColor: 'green',
            position: 'sticky',
            // See link
            top: 0, //to make it stick to the top of the screen
            height: 200,
            paddingLeft: 20
        },

        [theme.breakpoints.up('lg')]: {
            display: 'block',
            //backgroundColor: 'green',
            position: 'sticky',
            // See link
            top: 0, //to make it stick to the top of the screen
            height: 200,
            paddingLeft: 20
            //position: 'absolute',
            //right: 0
        },
    },
    bottomNav: {
        position: 'sticky',
        bottom: 0,
        //paddingBottom: 0
    },
    root: {
        paddingTop: 0
    },
    circularLoading: {
        textAlign: 'center',
        paddingTop: 50,

    },
    gridPost: {
        paddingBottom: 40
    },
    addPostIcon: {
        border: 'solid 1px gray',
        borderRadius: 5,
        padding: 10
    }
}))
const HomePage = (props) => {
    const classes = useStyles()
    const { auth, home, profile, FetchPost,
        FetchComment, FetchUserProfiles, FetchUsers,
        AddComment, AddPost, AddLinearProgress, ClearMsg, history } = props
    const [modalState, setModalState] = useState(false)

    // const [openSnack, setOpenSnack] = useState(false)
    // const [severity, setSeverity] = useState(false)
    // const [addPostMsg, setAddPostMsg] = useState('')
    useEffect(() => {
        FetchPost()
        FetchUserProfiles()
        FetchUsers()
        FetchComment()

    }, [])
    // const handleCloseSnack = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpenSnack(false);
    // }
    const handleClose = (state) => {
        setModalState(state)
    }

    const handleAddModal = () => {
        setModalState(!modalState)
    }
    //console.log("modalState", modalState)
    return (
        <Container className={classes.root2}>
            {auth.isAuthenticated
                ?
                <Grid container>
                    {/* <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity={severity}>
                            {addPostMsg}
                        </Alert>
                    </Snackbar> */}

                    <AddPostModal ClearMsg={ClearMsg} home={home} auth={auth} AddPost={AddPost} state={modalState} handleClose={handleClose} />
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        {
                            home.isLoading ? <Grid style={{ height: 450 }}><div className={classes.circularLoading} ><CircularProgress color="secondary" /></div></Grid> :
                                home && home.posts.map((post, ind) =>

                                    <Post index={ind} FetchComment={FetchComment} ClearMsg={ClearMsg} AddComment={AddComment} history={history} home={home} auth={auth} profile={profile} key={post._id} post={post} />
                                )
                        }
                    </Grid>
                    <Grid className={classes.gridSuggested} item lg={4} md={4}>
                        <div style={{ backgroundColor: 'red', height: 100 }}>

                        </div>
                    </Grid>
                    <Grid className={classes.bottomNav} item lg={12} xs={12} md={12} sm={12}>
                        <BottomNavigation
                            className={classes.root}>
                            <BottomNavigationAction style={{ paddingTop: 10 }} icon={<Tooltip title="Add a post" placement="top"><AddIcon onClick={handleAddModal} className={classes.addPostIcon} /></Tooltip>} />
                        </BottomNavigation>
                    </Grid>
                </Grid>
                :
                <UnauthorizedPage history={history} />}
        </Container>
    )
}
HomePage.propTypes = {
    auth: PropTypes.any,
    home: PropTypes.any,
    FetchPost: PropTypes.func.isRequired,
    FetchComment: PropTypes.func.isRequired,
    FetchUserProfiles: PropTypes.func.isRequired,
    FetchUsers: PropTypes.func.isRequired,
    AddComment: PropTypes.func.isRequired,
    AddPost: PropTypes.func.isRequired,
    ClearMsg: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    home: state.home,
    profile: state.profile
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        FetchPost: fetchPostAction,
        FetchComment: fetchCommentAction,
        FetchUserProfiles: fetchUserProfileAction,
        FetchUsers: fetchUsersAction,
        AddComment: addCommentAction,
        AddPost: addPostAction,
        ClearMsg: clearMessageAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)