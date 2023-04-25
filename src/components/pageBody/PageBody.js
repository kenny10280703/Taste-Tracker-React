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
           <input
                type="checkbox"
                id='star1'
                name='star1'
                checked={value.star1}
                onChange={(event) => {handleChange(event)}}
            />
            <label htmlFor='star1'>1 Star</label>
            <input
                type="checkbox"
                id='star2'
                name='star2'
                checked={value.star2}
                onChange={(event) => {handleChange(event)}}
            />
            <label htmlFor='star2'>2 Stars</label>
            <input
                type="checkbox"
                id='star3'
                name='star3'
                checked={value.star3}
                onChange={(event) => {handleChange(event)}}
            />
            <label htmlFor='star3'>3 Stars</label>
            <input
                type="checkbox"
                id='star4'
                name='star4'
                checked={value.star4}
                onChange={(event) => {handleChange(event)}}
            />
            <label htmlFor='star4'>4 Star</label>
            <input
                type="checkbox"
                id='star5'
                name='star5'
                checked={value.star5}
                onChange={(event) => {handleChange(event)}}
            />
            <label htmlFor='star5'>5 Stars</label>
        </form>
        <h3>Currently Showing: </h3>
    </div>
  )
}
