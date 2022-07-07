import React from 'react'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'
import { getAllMovies, deleteMovie } from "../middleware/movie-api"
import Model from '../components/Model'

export default function Movies() {
  const navigate = useNavigate()
  const [movieList, setMovieList] = React.useState([])
  const [showModel, setShowModel] = React.useState(false)
  const [movieId, setMovieId] = React.useState('')

  const getData = async () => {
    const result = await getAllMovies();
    setMovieList(result)
  }

  React.useEffect(() => {
    if (Cookie.get('cid') == undefined) {
      navigate('/login')
    }
    console.log(decodeURIComponent(Cookie.get('cid')))
    getData()
  }, [showModel])

  const editHandler = (id) => {
    setMovieId(id);
    setShowModel(true);
  }

  const deleteHandler = async (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      const result = await deleteMovie(id)
      if(result){
        getData()
      }
    }
  }

  return (
    <div className='movie-dashboard-wrapper'>
      <div className='movie-navigation'>
        <div className='movie-search-bar'>

        </div>
        <button onClick={() => setShowModel(true)}> + Add Movie</button>
      </div>
      <div className='d-flex'>
        {
          movieList.length > 0 && movieList.map(item => (
            <Card {...item} editHandler={editHandler} deleteHandler={deleteHandler} />
          ))
        }
      </div>
      {showModel && <Model setShowModel={setShowModel} movieId={movieId} setMovieId={setMovieId} />}
    </div>

  )
}
