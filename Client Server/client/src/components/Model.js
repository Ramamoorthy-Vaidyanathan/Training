import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { postMovie, getMovieById, updateMovie } from "../middleware/movie-api"

export default function Model(props) {
    const formInitialState = {
        name: "",
        image_url: "",
        gener: "",
        year: "",
        run_time: ""
    }
    const [movieDetails, setMovieDetails] = React.useState(formInitialState)
    const handleChange = (event) => {
        setMovieDetails({
            ...movieDetails,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if(props.movieId == ""){
            await postMovie(movieDetails);
        }
        else{
            await updateMovie(movieDetails, props.movieId)
        }
        modelCloseHandler()
    }

    const getDatById = async () => {
        const result = await getMovieById(props.movieId)
        var fetchedMovie = {}
        Object.keys(result[0]).map((item) => {
            if(Object.keys(formInitialState).indexOf(item) != -1) fetchedMovie[item] = result[0][item]
        })
        console.log(fetchedMovie)
        setMovieDetails(fetchedMovie)
    }

    const modelCloseHandler = () => {
        props.setShowModel(false)
        props.setMovieId('')
    }

    React.useEffect(() => {
        if(props.movieId != ''){
            getDatById();
        }
    },[props])

    return (
        <div className='model-wrapper'>
            <form className='model-form' onSubmit={submitHandler}>
                <MdOutlineClose className='icon close-icon' onClick={modelCloseHandler} />
                <label>Name</label>
                <input type="text" name='name' value={movieDetails.name} onChange={handleChange} required />
                <label>Image URL</label>
                <input type="url" name='image_url' value={movieDetails.image_url} onChange={handleChange} required />
                <label>Gener</label>
                <input type="text" name='gener' value={movieDetails.gener} onChange={handleChange} required />
                <label>Year</label>
                <input type="number" name='year' value={movieDetails.year} onChange={handleChange} required />
                <label>Run Time</label>
                <input type="text" name='run_time' value={movieDetails.run_time} onChange={handleChange} required />
                <button type='submit'>{props.movieId == '' ? 'Submit' : 'Update'}</button>
            </form>
        </div>
    )
}
