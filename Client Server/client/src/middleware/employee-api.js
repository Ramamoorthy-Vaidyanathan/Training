import { axiosConfig } from './axios-config'

export const getAllEmployee = async () => {
    const response = await axiosConfig.get('/employees')
                                .then(res => res.data)
                                .catch(err => err)
    return response;
}