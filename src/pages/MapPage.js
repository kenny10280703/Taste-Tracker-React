import React, { Component } from 'react'
import Header from "../components/header/Header"
import PageBody from '../components/pageBody/PageBody'
import Map from '../components/map/Map'
import { Link } from 'react-router-dom'

export default function MapPage (){
  const [location, setLocation] = React.useState({
    lat: "",
    lng: ""
  })

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, 
      function(error) {
        console.log(error)
      }
    )
  }, [])
  return (
    <div>
        <Header />
        <PageBody />
        <button><Link to={`../restaurants`}>To list page</Link></button>
        <Map 
          lat={location.lat}
          lng={location.lng}
        />
    </div>
  )
}
