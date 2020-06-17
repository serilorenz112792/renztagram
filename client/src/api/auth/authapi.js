import axios from 'axios'

export const tokenConfig = (getState) => {
    const token = getState.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}
export async function loadUserApi(auth) {
    console.log("auth", auth)
    return await axios.get('/api/auth', tokenConfig(auth))
}

export const tokenConfigFormData = getState => {
    // Get token from local storage
    const token = getState.token;

    //Headers
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    //if token, add to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

export async function loginApi({ email, password }) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password })
    return await axios.post('/api/auth/login', body, config)
}

export async function registerApi({ firstName, lastName, email, password }) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ firstName, lastName, email, password })
    return await axios.post('/api/user/register', body, config)
}


export async function fetchUsersApi(auth) {
    return await axios.get('/api/user/fetch-users', tokenConfig(auth))
}