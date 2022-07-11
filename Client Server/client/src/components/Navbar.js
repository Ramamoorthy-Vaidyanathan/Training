import React, { useEffect } from 'react'
import "../styles/navbar.scss"

export default function Navbar() {
  const locationArr = window.location.href.split('/')
  if(locationArr[locationArr.length - 1] == 'login' || locationArr[locationArr.length - 1] == 'signup'){
    return 
  }

  return (
    <div className='navbar-wrapper'>

    </div>
  )
}
