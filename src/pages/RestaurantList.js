import React from 'react'
import restaurantData from '../restaurantData'
import Header from '../components/header/Header'
import PageBody from '../components/pageBody/PageBody'
import { Link } from 'react-router-dom'
import ListItem from '../components/listItem/ListItem'

export default function RestaurantList() {
    /** 
     * Assume user will move tp a new location when entering List page from map page
     * Therefore, this page will get user location again and get a new array of restaurants
     */
    const [location, setLocation] = React.useState()
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
    const restaurants = restaurantData.data.restaurants
    const listItems = restaurants.map(restaurant => {
        return (<ListItem 
                    key={restaurant.id}
                    restaurantInfo={restaurant}
                />)
    })


    
      

  return (
    <div>
        <Header />
        <PageBody />
        <button><Link to={`../map`}>To map page</Link></button>
        {listItems}
    </div>
  )
}
