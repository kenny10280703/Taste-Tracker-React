import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import ReviewCard from '../components/reviewCard/ReviewCard'

export default function RestaurantDetailPage() {
    // API call, send id to get a restaurant
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = React.useState({})
    const [formData, setFormData] = React.useState({newRating: 0, newReviewText: ""})
    const [allReviews, setAllReviews] = React.useState([])
    React.useEffect(() => {
        getInfo()
    },[])

    React.useEffect(() => {
        if(restaurantInfo) {
            getReviews()
        }
    }, [restaurantInfo])

    const getInfo = async() => {
        const res = await fetch(`https://2df61d42-c535-41a1-96ab-1d4ea8564f33.mock.pstmn.io/get/${id}`)
        setRestaurantInfo(await res.json())
    }

    const getReviews = async() => {
        const res = await fetch(`http://localhost:9090/food_finder/restaurants/reviews/${id}`)
        setAllReviews(await res.json())
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

    const displayReviews = allReviews.map(review => {
        return (
            <ReviewCard
                id={review.id}
                username={review.username}
                rating={review.rating}
                comment={review.comment}
            />
        )
    })

    let{ name, overallRating, cuisine, address, averageCostOfADish, menu, distance} = restaurantInfo

  return (
    <div>
        <Header />
        <h2>{name}</h2>
        <div>
            <span style={{color: 'black'}}>
                {overallRating}
                {' '}
            </span>
            <span style={{color: 'orange'}}>
                {String.fromCharCode(9733).repeat(Math.floor(overallRating))}
            </span>
            <span style={{color: 'grey'}}>
                {String.fromCharCode(9733).repeat(Math.floor(5 - overallRating))}
            </span>
            <span>
                {'  '}
                Average main course price: £{averageCostOfADish}
            </span>
            <span>
                {'  '}
                {cuisine}
            </span>
        </div>
        <br></br>
        <div>
            <span>
                {address}
            </span>
            <span>
                {'  '}
                {distance} meters away
            </span>
        </div>
        <div>
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
        {displayReviews}
    </div>
  )
}