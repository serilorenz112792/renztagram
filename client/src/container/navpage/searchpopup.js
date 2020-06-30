import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    rootContainer: {
        position: 'fixed',
        top: 30,
        left: '50%'
    }
}))

const SearchPopup = props => {
    const classes = useStyles()
    const { data, state, searchText } = props
    const [modalState, setModalState] = useState('hidden')
    useEffect(() => {
        setModalState(state)
    }, [])
    return (
        <Container className={classes.rootContainer} style={{ visibility: modalState }}>
            {data.length > 0 && searchText !== '' ?
                data.map((user) => console.log("Users", user))
                : 'No search results!'}
        </Container>
    )
}

export default SearchPopup

