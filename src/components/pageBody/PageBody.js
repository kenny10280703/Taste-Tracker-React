import React from 'react'
import { Link } from 'react-router-dom'

export default function PageBody(props) {
    const [formData, setFormData] = React.useState({
        cuisine: "",
        price: "",
        rating: ""
    })
    const { handleChange, value, restaurantInfo } = props
    const list = Array.from(new Set(restaurantInfo.map(restaurant => restaurant.cuisine))).sort()
    const cuisines = list.map(c => {
        return (
            <option 
                key={c}
                value={c}
            >
                {c}
            </option>
        )
    })


  return (
    <div>
        <h1>Restauarnts within a 1 mile radius to you</h1>
        <h3>Filter by: </h3>
        <form>
            <select 
                id="cusineFilter"
                name='cuisine'
                value={value.cusine}
                onChange={(event) => {handleChange(event)}}
            >
                <option
                    value="none">
                    --Select--
                </option>
                {cuisines}
            </select>
            <select 
                id="priceFilter"
                name="price"
                value={value.price}
                onChange={(event) => {handleChange(event)}}
            >
                <option value="none">--Select--</option>
                <option value="range1">Less than 100</option>
                <option value="range2">100 to 1000</option>
                <option value="range3">Greater than 1000</option>
            </select>
            <select 
                id="ratingFilter"
                name="rating"
                value={value.rating}
                onChange={(event) => {handleChange(event)}}
            >
                <option value="none">--Select--</option>
                <option value="2">2 stars or above</option>
                <option value="2.5">2.5 stars or above</option>
                <option value="3">3 stars or above</option>
                <option value="3.5">3.5 stars or above</option>
                <option value="4">4 stars or above</option>
                <option value="4.5">4.5 stars or above</option>
            </select>
           
        </form>
        <h3>Currently Showing: </h3>
    </div>
  )
}
