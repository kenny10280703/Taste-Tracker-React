import React from 'react'
import GoogleMapReact from 'google-map-react';
import restaurantData from '../../restaurantData';
import Marker from '../marker/Marker';

export default function Map(props) {
  const centre = [props.lat, props.lng]
  const zoom = 17
  const [restaurants, setRestaurants] = React.useState(restaurantData.data.restaurants.map(restaurant => {
    return {...restaurant, show: false}
  }))
  console.log(restaurants)
  function toggle(id) {
    setRestaurants(prevState => {
      return prevState.map(state => {
        return state.id === id ? {...state, show: true} : {...state, show: false}
      })
    })
  }
  const allRestaurants = restaurants.map(restaurant => {
    return (
      <Marker
      key={restaurant.id} 
      lat={restaurant.lat}
      lng={restaurant.lng}
      restaurantInfo={restaurant}
      show={restaurant.show}
      toggle={()=> toggle(restaurant.id)}
      />
    )
  })


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB4FivKF39kWR9YGBG7qVflD7xy_Drh5Qk" }}
        center={centre}
        zoom={zoom}
      >
        {allRestaurants}
      </GoogleMapReact>
    </div>
  )
}
