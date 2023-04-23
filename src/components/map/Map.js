import React from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from '../marker/Marker';
import restaurantData from '../../restaurantData';

export default function Map(props) {
  const centre = [props.lat, props.lng]
  const zoom = 17
  
  const [allRestaurants, setAllRestaurants] = React.useState([])
  React.useEffect(() => {
    getRestaurants()
  }, [])

  const getRestaurants = async() => {
    const res = await fetch("https://2d694b78-e6ad-4498-bd95-f5bb64a477d2.mock.pstmn.io/get?test=123")
    setAllRestaurants(await res.json())
    setAllRestaurants(prevState => prevState.restaurants)
    setAllRestaurants(prevState => {
      return prevState.map(state => {
        return {...state, show: false}
      })
    })
  }

  function toggle(id) {
    setAllRestaurants(prevState => {
      return prevState.map(state => {
        return state.id === id ? {...state, show: true} : {...state, show: false}
      })
    })
  }


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={centre}
        zoom={zoom}
      >
        {allRestaurants.map( restaurant => {
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
        }
        )}
      </GoogleMapReact>
    </div>
  )
}
