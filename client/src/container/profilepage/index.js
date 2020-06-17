import React, { useState, useEffect } from 'react'
import UnauthorizedPage from '../unauthorizedpage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Container, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { logoutAction } from '../loginpage/action'
import { bindActionCreators } from 'redux'

const ProfilePage = (props) => {
    const { history, auth, Logout } = props
    const handleLogout = () => {
        Logout()
        history.push('/')
    }
    console.log("profile", auth && auth.isAuthenticated)
    return (
        <Container>
            {auth && auth.isAuthenticated ?
                <Grid>
                    <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>
                </Grid>
                :
                <UnauthorizedPage history={history} />}


        </Container>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        Logout: logoutAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)