import React from 'react'
import Header from '../components/header/Header'
import PageBody from '../components/pageBody/PageBody'
import { Link } from 'react-router-dom'
import ListItem from '../components/listItem/ListItem'

export default function RestaurantList() {
    /*
     * Assume user will move tp a new location when entering List page from map page
     * Therefore, this page will get user location again and get a new array of restaurants
     */
    const [location, setLocation] = React.useState()
    const [allRestaurants, setAllRestaurants] = React.useState([])
    const [filterData, setFilterData] = React.useState({
        cuisine: "none",
        price: "none",
        rating: "none",
        star1: true,
        star2: true,
        star3: true,
        star4: true,
        star5: true
      })
 
    React.useEffect(() => {
        getLocation()
      }, [])
    
    React.useEffect(() => {
        if (location) {
            getRestaurants()
        }
      }, [location])

    React.useEffect(() => {
        updateRestaurantsShown()
      }, [filterData])

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
        try{
            const res = await fetch("https://2df61d42-c535-41a1-96ab-1d4ea8564f33.mock.pstmn.io/post", 
            {
                method: "POST",
                body: JSON.stringify({lat: location.lat, lng: location.lng})
            }
            )
            setAllRestaurants(await res.json())
            setAllRestaurants(prevState => prevState.restaurants)
        } catch(error) {
            console.log("error")
        }
    }

    // This function will be passed to Page Body component to keep unified state values in the parent
    const handleChange = (event) => {
        setFilterData(prevFilterData => {
          const { name, value, type, checked } = event.target
          if (name === "price") {
            return {
              ...prevFilterData,
              [name]: value
            }
          } else if(type === "checkbox") {
            return {
              ...prevFilterData,
              [name]: checked
            }
          } else {
            return {
              ...prevFilterData,
              [name]: value
            }
          }
        })
      }

      const updateRestaurantsShown = () => {
        setAllRestaurants(prevState => {
          return prevState.map(state => {
            if (filterData.cuisine != "none" && !(state.cuisine === filterData.cuisine)) {
              return {
                ...state,
                filtered: true
              }
            } else if(filterData.price != "none" && !inPriceRange(filterData.price, state.averageDishCost)) {
              return {
                ...state,
                filtered: true
              }
            } else if(!equalToRatingFilter(state.rating)) {
              return {
                ...state,
                filtered: true
              }
            } else {
              return {
                ...state,
                filtered: false
              }
            }
            }
          )
        })
      }

          // return true if the price falls in the filter range
    const inPriceRange = (range, value) => {
        let numberRange
        if (range === "range1") {
          numberRange = {min: 1, max: 10}
        } else if (range == "range2") {
          numberRange = {min: 11, max: 20}
        } else if (range === "range3") {
          numberRange = {min: 21, max: Infinity}
        } else {
          numberRange = {min: 1, max: Infinity}
        }
        return value >= numberRange.min && value < numberRange.max
      }
  
      // return true if the rating of that restaurant is selected, return false otherwise
      const equalToRatingFilter = (rating) => {
        const roundedRating = Math.round(rating)
        const propName = "star" + roundedRating
        return (filterData[propName])
      }


  return (
    <div>
        <Header />
        <PageBody
            handleChange={handleChange}
            value={filterData}
            restaurantInfo={allRestaurants}
        />
        <button><Link to={`../map`}>To map page</Link></button>
        {allRestaurants.map(restaurant => {
            if (!restaurant.filtered) {
                return (
                    <ListItem
                        key={restaurant.id}
                        restaurantInfo={restaurant}
                    />
                )   
            }
        })}
    </div>
  )
}
