import React from 'react'
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
    const [allRestaurants, setAllRestaurants] = React.useState([])
 
    React.useEffect(() => {
        getLocation()
      }, [])
    
    const getLocation = () => {
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
    }
    const getRestaurants = async() => {
        const res = await fetch("https://2d694b78-e6ad-4498-bd95-f5bb64a477d2.mock.pstmn.io/get?test=123")
        setAllRestaurants(await res.json())
        setAllRestaurants(prevState => prevState.restaurants)
    }
    console.log(`location is ${location}` + ` restaurants are ${allRestaurants}`)

  return (
    <div>
        <Header />
        <PageBody />
        <button><Link to={`../map`}>To map page</Link></button>
        {allRestaurants.map(restaurant => {
            return (
                <ListItem
                    key={restaurant.id}
                    restaurantInfo={restaurant}
                />
            )
        })}
    </div>
  )
}
