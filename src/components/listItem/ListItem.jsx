import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem(props) {
    let { id,name, rating } = props.restaurantInfo
  return (
    <div>
        <Link to={`/restaurants/${id}`}>
        <h3>{name}</h3>
        <span>{rating}</span>
        </Link>
    </div>
  )
}
