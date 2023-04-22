import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import restaurantData from '../restaurantData'

export default function RestaurantDetailPage() {
    // API call, send id to get a restaurant
    const { id } = useParams()
    let restaurantInfo
    for (let i = 0 ; i < restaurantData.data.restaurants.length ; i++) {
        if (restaurantData.data.restaurants[i].id === id) {
            restaurantInfo = restaurantData.data.restaurants[i]
        }
    }
    let {name, rating} = restaurantInfo
  return (
    <div>
        <Header />
        <h2>{name}</h2>
        <div>
            <span style={{color: 'black'}}>
                {rating}
                {' '}
            </span>
            <span style={{color: 'orange'}}>
                {String.fromCharCode(9733).repeat(Math.floor(rating))}
            </span>
            <span style={{color: 'grey'}}>
                {String.fromCharCode(9733).repeat(Math.floor(5 - rating))}
            </span>
        </div>
    </div>
    
  )
}
