import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FormSideBar(props) {
    const navigate = useNavigate();
  return (
    <div className={props.from == "left" ? 'form-side-wrapper-left' : 'form-side-wrapper'}>
        <h1>{props.heading}</h1>
        <p>{props.description}</p>
        <button type="button" onClick={() => navigate(`/${props.route}`)}>{props.route}</button>
    </div>
  )
}
