import React from 'react'
import locationMarker from '../image/location.png'


/**
 * Renders a marker on the map to show user's location
 *
 * @returns {JSX.Element}
 * @author Kenny Yeung
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
