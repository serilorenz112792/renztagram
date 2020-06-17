import { combineReducers } from 'redux'
import authReducer from './container/loginpage/reducer'
import homeReducer from './container/homepage/reducer'
import profileReducer from './container/profilepage/reducer'
export default combineReducers({
    auth: authReducer, home: homeReducer, profile: profileReducer
})