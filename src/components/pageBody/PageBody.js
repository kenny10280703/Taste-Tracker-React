import React from 'react'
import { Link } from 'react-router-dom'

export default function PageBody() {
    const [formData, setFormData] = React.useState({
        cuisine: "",
        price: "",
        rating: ""
    })

  return (
    <div>
        <h1>Restauarnts within a 1 mile radius to you</h1>
        <h3>Filter by: </h3>
        <form>
            <select 
                id="cusineFilter"
                name='cuisine'
                value={formData.cuisine}>
                <option value="american">American</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
            </select>
            <select id="priceFilter">
                <option value="<100">Less than 100</option>
                <option value="100 - 1000">100 to 1000</option>
                <option value="1000>">Greater than 1000</option>
            </select>
            <select id="ratingFilter">
                <option value="1star">1 star</option>
                <option value="2star">2 stars</option>
                <option value="3star">3 stars</option>
                <option value="4star">4 stars</option>
                <option value="5star">5 stars</option>
            </select>
        </form>
        <h3>Currently Showing: </h3>
    </div>
  )
}
