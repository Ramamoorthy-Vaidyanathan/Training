import React from 'react';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';

export default function (props) {
  return (
    <div className='card-wrapper'>
        <img src={props.image_url} alt={props.name} />
        <h3>{props.name}</h3>
        <p>{props.gener}</p>
        <div className='icon-controll'>
            <AiFillEye className='icon' />
            <AiFillEdit className='icon' onClick={() => props.editHandler(props.id)} />
            <AiFillDelete className='icon' onClick={() => props.deleteHandler(props.id, props.name)} />
        </div>
    </div>
  )
}
