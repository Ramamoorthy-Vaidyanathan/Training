import React from 'react'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'
import { BiLogOutCircle } from 'react-icons/bi'
import { getAllMovies, deleteMovie } from "../middleware/movie-api"
import { logout } from '../middleware/user-api';
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
    getData()
  }, [showModel])

  const editHandler = (id) => {
    setMovieId(id);
    setShowModel(true);
  }

  const deleteHandler = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const result = await deleteMovie(id)
      if (result) {
        getData()
      }
    }
  }

  const logoutHandler = async () => {
    if(window.confirm("Are you sure you want to logout?")){
      await logout()
      window.location.href = "http://localhost:8080/login"
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
          movieList.length > 0 ? movieList.map(item => (
            <Card {...item} editHandler={editHandler} deleteHandler={deleteHandler} />
          )) : <h1 style={{width: 'max-content', margin: '30px auto'}}>Add Movies to your dashboard by clicking on "+Add Movie" button</h1>
        }
      </div>
      {showModel && <Model setShowModel={setShowModel} movieId={movieId} setMovieId={setMovieId} />}
      <div className='logout-wrapper' title='Logout'>
        <BiLogOutCircle onClick={logoutHandler} />
      </div>
    </div>

  )
}
