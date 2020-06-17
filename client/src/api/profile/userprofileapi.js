import axios from 'axios'

import { tokenConfig } from '../auth/authapi'

export async function fetchUserProfileApi(auth) {
    return await axios.get('/api/user/user-profile', tokenConfig(auth))
}