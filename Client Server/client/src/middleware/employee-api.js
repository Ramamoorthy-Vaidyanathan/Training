import { axiosConfig } from './axios-config'

export const getAllEmployee = async (param) => {
    const response = await axiosConfig.get(`/employees?search=${param}`)
                                .then(res => res.data)
                                .catch(err => err)
    return response;
}