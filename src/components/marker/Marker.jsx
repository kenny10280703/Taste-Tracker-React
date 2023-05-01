import React from 'react'
import RestaurantCard from '../restaurantCard/RestaurantCard'

export default function Marker(props) {
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: 'red',
        cursor: 'pointer',
        zIndex: 10,
    }

    
  return (
    <div style={markerStyle} onClick={props.toggle}>
        {props.show && <RestaurantCard restaurantInfo={props.restaurantInfo} />}
    </div>
  )
}