import { axiosConfig } from './axios-config'

export const getAllMovies = async () => {
    const response = await axiosConfig.get('/movies')
                                .then(res => res.data)
                                .catch(err => err)
    return response;
}

export const getMovieById = async (id) => {
    const response = await axiosConfig.get(`/movies/${id}`)
                                .then(res => res.data)
                                .catch(err => err)
    return response;
}


export const postMovie = async (movieDetails) => {
    const response = await axiosConfig.post('/movie', movieDetails)
                                      .then(res => res.data)
                                      .catch(err => err);
    return response;
}

export const updateMovie = async (movieDetails, movieId) => {
    const response = await axiosConfig.put(`/movie/${movieId}`, movieDetails)
                                      .then(res => res.data)
                                      .catch(err => err);
    return response;
}

export const deleteMovie = async (id) => {
    const response = await axiosConfig.delete(`/movie/${id}`)
                                .then(res => res.data)
                                .catch(err => err)
    return response;
}