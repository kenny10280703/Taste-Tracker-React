import React from 'react'
import RestaurantCard from './RestaurantCard'
import marker from '../image/marker.png'
import marker_hovered from '../image/marker_hovered.png'

/**
 * Render a marker on the map from a restaurant. If clicked, will pop up a restaurant info card componenet.
 * 
 * @returns {JSX.Element} 
 * @author Kenny Yeung
 */
export default function Marker(props) {
  // Using the built in detect hover function from Google Map API. When hovering a marker, render another marker image
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