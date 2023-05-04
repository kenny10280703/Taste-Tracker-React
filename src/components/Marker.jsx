import React from 'react'
import RestaurantCard from './RestaurantCard'
import marker from '../image/marker.png'
import marker_hovered from '../image/marker_hovered.png'

export default function Marker(props) {
    const { $hover, toggle, close } = props
    const markerStyle = {
        height: 35,
        width: 35,
        cursor: 'pointer'
    }

    
  return (
    <div onClick={toggle}>
        { $hover? <img src={marker_hovered} style={markerStyle} /> :  <img src={marker} style={markerStyle} />}
        {props.show && <RestaurantCard restaurantInfo={props.restaurantInfo} close={close} />}
    </div>
  )
}