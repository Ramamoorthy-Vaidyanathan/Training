import { axiosConfig } from './axios-config'

export const login = async (credentials) => {
    const response = await axiosConfig.post('/login', credentials)
                                .then(res => res.data)
                                .catch(err => err)
    return response
}

export const registerUser = async (userDetails) => {
    const response = await axiosConfig.post('/register', userDetails)
                                .then(res => res.data)
                                .catch(err => err)
    return response
}