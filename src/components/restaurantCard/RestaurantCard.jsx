import React from 'react'
import { Link } from 'react-router-dom'

export default function RestaurantCard(props) {
    const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    }


  return (
    <div style={infoWindowStyle}>
        <Link to={`../restaurants/${props.restaurantInfo.id}`}>
        <div style={{fontSize: 16}}>
            {props.restaurantInfo.name}
        </div>
        <div style={{fontSize: 14}}>
            <span style={{color: 'grey'}}>
                {props.restaurantInfo.rating}
                {' '}
            </span>
            <span style={{color: 'orange'}}>
                {String.fromCharCode(9733).repeat(Math.floor(props.restaurantInfo.overallRating))}
            </span>
            <span style={{color: 'grey'}}>
            {String.fromCharCode(9733).repeat(Math.floor(5 - props.restaurantInfo.overallRating))}
            </span>
        </div>
        </Link>
    </div>
  )
}

