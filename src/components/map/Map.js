import React from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from '../marker/Marker';
import restaurantData from '../../restaurantData';

export default function Map() {
  const [centre, setCentre] = React.useState()
  const [allRestaurants, setAllRestaurants] = React.useState([])
  const zoom = 17

  React.useEffect(() => {
    getLocation()
  }, [])

  React.useEffect(() => {
    if(centre){
      getRestaurants()
    }
  }, [centre])

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            setCentre([position.coords.latitude, position.coords.longitude])
        }, 
        function(error) {
            console.log(error)
        }
    )
}


  const getRestaurants = async() => {
    try{
        const res = await fetch("", 
        {
            method: "POST",
            body: JSON.stringify({lat: centre[0], lng: centre[1]})
        }
        )
        setAllRestaurants(await res.json())
        setAllRestaurants(prevState => prevState.restaurants)
    } catch(error) {
        console.log("error")
    }
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
        bootstrapURLKeys={{ key: "AIzaSyB4FivKF39kWR9YGBG7qVflD7xy_Drh5Qk" }}
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
