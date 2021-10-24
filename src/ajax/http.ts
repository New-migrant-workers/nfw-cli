import axios from 'axios'

import store from '../store/index'

const http = axios.create({
    baseURL: '',
    timeout: 3000
})

http.interceptors.request.use(
    (config) => {
        config.headers.Authorization = store.state.token
            ? `Bearer ${store.state.token}`
            : 'Bearer'
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

http.interceptors.response.use(
    (config) => {
        return config.data
    },
    (error) => {
        return Promise.reject(error.response)
    }
)

export default http
