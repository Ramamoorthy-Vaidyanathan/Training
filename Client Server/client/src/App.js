import React from 'react'
import "./styles/index.scss"
import "./styles/movie-styles.scss"
import "./styles/navbar.scss"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Movies from './pages/Movies'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movielist' element={<Movies />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
