import React from 'react'
import locationMarker from '../image/location.png'


/*
Renders a component that displays the user's location marker on a map.
*/
export default function UserLocation() {
    const markerStyle = {
        height: 35,
        width: 35
    }
  return (
    <div>
        <img src={locationMarker} style={markerStyle}/>
    </div>
  )
}
