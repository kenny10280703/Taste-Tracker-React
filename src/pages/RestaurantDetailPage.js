import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import restaurantData from '../restaurantData'

export default function RestaurantDetailPage() {
    // API call, send id to get a restaurant
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = React.useState({})
    const [formData, setFormData] = React.useState({newRating: 0, newReviewText: ""})
    React.useEffect(() => {
        getInfo()
    },[])

    const getInfo = async() => {
        const res = await fetch(`https://2d694b78-e6ad-4498-bd95-f5bb64a477d2.mock.pstmn.io/get/${id}`)
        setRestaurantInfo(await res.json())
    }

    const getReviews = async() => {
        const res = await fetch()
    }

    const changeRating = (r) => {
        setFormData(prevState => {
            return {
                ...prevState,
                newRating: r
            }
        })
    }

    const handleSubmit = async() => {
        try{
            const res = await fetch("", 
            {
                method: "POST",
                body: JSON.stringify({rating: formData.newRating, text: formData.newReviewText})
            }
            )
        } catch(error) {
            console.log("Something goes wrong")
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    let{ name, rating, cuisine, description, address1, address2, averageDishCost, menu, distance} = restaurantInfo

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
            <span>
                {'  '}
                Average main course price: £{averageDishCost}
            </span>
            <span>
                {'  '}
                {cuisine}
            </span>
        </div>
        <br></br>
        <div>
            <span>
                {address1} {address2}
            </span>
            <span>
                {'  '}
                {distance} meters away
            </span>
        </div>
        <div>
            <h3>About</h3>
            {description}
        </div>
        <div>
            <h3>Menu</h3>
            {menu}
        </div>
        <div>
            <h3>Reviews</h3>
            <form>
                <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    onChange={changeRating}
                    />
                <textarea
                    placeholder='Leave your review'
                    name='newReviewText'
                    onChange={handleChange}
                    value={formData.newReviewText}
                    />
                <button>Post</button>
            </form>
        </div>
    </div>
  )
}