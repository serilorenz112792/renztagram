import React, { useEffect, useState } from 'react'

import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { fetchUserProfileAction } from '../profilepage/action'
import dotenv from 'dotenv'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Logo from '../../assets/rsz_generatedtext.png'
dotenv.config()
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    // search: {
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: fade(theme.palette.common.white, 0.15),
    //     '&:hover': {
    //         backgroundColor: fade(theme.palette.common.white, 0.25),
    //     },
    //     marginRight: theme.spacing(2),
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing(3),
    //         width: 'auto',
    //     },
    // },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}))

const NavBar = (props) => {
    const classes = useStyles();
    const { auth, profile, FetchUserProfile } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('')

    const [searchPopUpState, setSearchPopUpState] = useState('')

    const [searchData, setSearchData] = useState([])
    const [searchText, setSearchText] = useState('')



    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const userId = auth.user && auth.user._id
    const userInfo = profile && profile.userProfiles.filter(user => user.userId === userId)
    ////
    const allUsers = profile && profile.users
    const allUserProfileWhoIsPublic = profile && profile.userProfiles.filter(userP => userP.isPrivate === false).filter(userP => allUsers.some(user => user._id === userP.userId))
    //console.log("allUserProfileWhoIsPublic", allUserProfileWhoIsPublic)


    const mergeById = (a1, a2) =>
        a1.map(itm => ({
            ...a2.find((item) => (item.userId === itm._id) && item),
            ...itm
        }));

    const finalMergedUserProfile = mergeById(allUsers, allUserProfileWhoIsPublic).filter(userP => userP.isPrivate === false)
    //console.log("finalMergedUserProfile", searchData)
    const finalDataToBeSearch = finalMergedUserProfile.map((obj) => { return { userId: obj.userId, fullName: `${obj.firstName} ${obj.lastName}`, profileImageFile: obj.profileImageFile } })

    //console.log("finalSearchedData", finalDataToBeSearch)
    const handleChangePopOver = (e) => {

        setSearchText(e.target.value.toLowerCase())


        //setAnchorElPopOver(e.currentTarget)
    }

    const handleGetSelectedResult = (e, val) => {
        //console.log("val", val)
        //console.log("window.loca", window.location)
        setSearchText('')
    }


    //console.log("search Text", searchText)
    ////
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        handleMobileMenuClose()
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                {window.location.pathname.includes('/profile') ?
                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/home`}>
                        Home
                    </NavLink>
                    :
                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${auth.user && auth.user._id}`}>
                        Profile
                </NavLink>
                }
            </MenuItem>
        </Menu>
    );
    const loginMenuId = 'primary-account-menu'
    //console.log("asdasd", window.location.pathname === "/login")
    const loginMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={loginMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                {window.location.pathname === "/login" ? <NavLink to="/">Welcome</NavLink> : <NavLink to="/login">Login</NavLink>}
            </MenuItem>
        </Menu>
    )
    const loginMobileMenuId = 'primary-account-menu-mobile'
    const loginMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={loginMobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                {window.location.pathname === "/login" ? <NavLink to="/">Welcome</NavLink> : <NavLink to="/login">Login</NavLink>}
            </MenuItem>
        </Menu>
    )
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}
            <MenuItem onClick={handleMobileMenuClose}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <HomeIcon />
                </IconButton>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/home`}>Home</NavLink>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {auth.isAuthenticated ? <Avatar src={`data:image/jpeg;base64,${arrayBufferToBase64(userInfo[0] && userInfo[0].profileImageFile && userInfo[0].profileImageFile.data.data)}`} /> : <AccountCircle />}
                </IconButton>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${auth.user && auth.user._id}`}>Profile</NavLink>
            </MenuItem>
        </Menu>
    );


    useEffect(() => {
        FetchUserProfile()
        // if (process.env.NODE_ENV === 'production') {
        //     setProfileImageUrl(`https://renztagram.herokuapp.com/`)
        // }
        // else {
        //     setProfileImageUrl(`http://localhost:5999/`)
        // }
        if (searchText === '' || searchText === null) {

            setSearchData([])

        }
        if (searchText !== '') {

            setSearchData(finalDataToBeSearch.filter(obj => obj.fullName.toLowerCase().includes(searchText)))
            //setSearchPopUpState('visible')
        }
    }, [profileImageUrl, searchText])

    //console.log("searchData", searchData)
    return (
        <div className={classes.grow}>
            {/* <SearchPopup searchText={searchText} data={searchData} state={searchPopUpState} /> */}
            <AppBar style={{ backgroundColor: '#ad0ea3' }} position="static">

                <Toolbar>

                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography className={classes.title} variant="h6" noWrap>
                        {auth.isAuthenticated ? <NavLink style={{ textDecoration: 'none', color: '#FFF' }} to="/home"><div style={{ width: '150px', height: '40px' }}><img style={{ width: 'inherit', height: 'inherit' }} src={Logo} alt="Main Logo" /></div></NavLink> : null}
                    </Typography>
                    <div>

                    </div>

                    <div className={classes.search}>
                        {auth.isAuthenticated ? <div>
                            {/* <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div> */}
                            {/* <InputBase

                                onChange={handleChangePopOver}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            /> */}
                            <div style={{ width: 300 }}>
                                <Autocomplete
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    // freeSolo
                                    // id="free-solo-2-demo"
                                    inputValue={searchText}
                                    disableClearable
                                    open={searchText.length >= 3}
                                    noOptionsText={'User not found ma nigga!'}
                                    blurOnSelect
                                    //options={searchData.map(user => user.fullName)}
                                    // onInputChange={(event, newInputValue) => {
                                    //     setSearchText('');
                                    // }}
                                    options={searchData}
                                    getOptionLabel={option => option.fullName}
                                    renderOption={(option => {
                                        return (

                                            <Grid style={{ "&:hover": { backgroundColor: 'lightgray' } }} container>
                                                <Grid item xs={8}>
                                                    <Typography style={{ textAlign: 'center', paddingTop: 10, fontWeight: 'bold' }} variant="body1">
                                                        <NavLink style={{ textDecoration: 'none', color: '#ad0ea3' }} to={`/profile/${option.userId}`}>{option.fullName}</NavLink>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <NavLink to={`/profile/${option.userId}`}><Avatar style={{ cursor: 'pointer', textAlign: 'center' }} src={`data:image/jpeg;base64,${arrayBufferToBase64(option.profileImageFile.data.data)}`} /></NavLink>
                                                </Grid>
                                                {searchData.length > 1 ?
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                    : null
                                                }
                                            </Grid>

                                        )
                                    })}
                                    //disableCloseOnSelect
                                    onChange={(e, value) => handleGetSelectedResult(e, value)}

                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            onChange={handleChangePopOver}


                                            label="Search Users"
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps, type: 'search',

                                            }}

                                        />

                                    )}
                                />
                            </div>
                        </div> : null}

                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {auth.isAuthenticated ? <div>
                            {/* <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                        </div>
                            : null
                        }
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {auth.isAuthenticated ? <Avatar src={`data:image/jpeg;base64,${arrayBufferToBase64(userInfo[0] && userInfo[0].profileImageFile && userInfo[0].profileImageFile.data.data)}`} /> : <AccountCircle />}
                        </IconButton>


                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>

                </Toolbar>

            </AppBar>
            {auth.isAuthenticated ?
                <div>
                    {renderMobileMenu}
                    {renderMenu}
                </div> :
                <div>
                    {loginMenu}
                    {loginMobileMenu}
                </div>}
        </div>
    );
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        FetchUserProfile: fetchUserProfileAction
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)