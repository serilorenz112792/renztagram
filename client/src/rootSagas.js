import { all } from 'redux-saga/effects';
import AuthSaga from './container/loginpage/saga'
import HomeSaga from './container/homepage/saga'
import ProfileSaga from './container/profilepage/saga'
import EditProfileSaga from './container/profilepage/edit-profile-container/saga'
export default function* sagas() {
    yield all([
        AuthSaga(),
        ProfileSaga(),
        HomeSaga(),
        EditProfileSaga()
    ]);
}