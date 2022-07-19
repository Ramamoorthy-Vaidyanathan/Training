import React from 'react';
import { getMovieById } from '../middleware/movie-api'
import { useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useNavigate } from "react-router-dom"



export default function MovieDescription() {
  const param = useParams()
  const navigate = useNavigate()
  const [movieDetail, setmovieDetail] = React.useState({})
  const getDatById = async () => {
    const result = await getMovieById(param.id)
    setmovieDetail(result[0])
  }
  React.useEffect(() => {
    if (Cookie.get('cid') == undefined) {
      navigate('/login')
    }

    if (param.id != '') {
      getDatById();
    }
  }, [])
  console.log(movieDetail)
  return (
    <div>
      {
        movieDetail && movieDetail.id &&
        <div>
          <div className='desc-img-wrapper'>
            <img src={movieDetail.image_url} alt='Vikram' />
          </div>

          <div className='desc-movie'>
            <h1>{movieDetail.name}</h1>
            <p>{movieDetail.gener}</p>
            <p>{movieDetail.run_time}</p>
            <p>{movieDetail.year}</p>

          </div>
        </div>
      }

    </div>

  )
}
