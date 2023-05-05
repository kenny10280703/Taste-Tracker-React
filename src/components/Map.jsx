import React from 'react'
import Marker from './Marker'
import GoogleMapReact from 'google-map-react';
import { AppContext } from '../AppContext';
import loading from '../image/loading.gif'
import { Typography } from '@mui/material'

export default function Map() {
    const [centre, setCentre] = React.useState()
    const zoom = 17
    const [allRestaurants, setAllRestaurants] = React.useState([])
    const { filterData } = React.useContext(AppContext)
    // if loaded is false, will display the loading animation
    const [loaded, setLoaded] = React.useState(false)
    const hoverDistance = 35
    const api_key = process.env.REACT_APP_API_KEY
    
    // Use React Effect to get user's location, no dependencies means only get user's location once
    React.useEffect(() => {
        getLocation()
      }, [])
    
    // Use React useEffect to make sure only fetch backend API to get restaurants after getting user's location
    React.useEffect(() => {
    if(centre){
        // change loaded to true after getting user's location
        setLoaded(true)
        getRestaurants()
    }
    }, [centre])

    /* Use React useEffect to make filterData as dependencies, which means if filter is changed, will run the function to change
    restaurants displayed */
    React.useEffect(() => {
        updateRestaurantsShown()
      }, [filterData])

    /* 
    Update the restaurants to be displayed. Add a Boolean property filtered to all restaurants, and match the restaurant's info against the filter.
    If it does not match, filtered will be true, vice versa.
    */ 
    const updateRestaurantsShown = () => {
            setAllRestaurants(prevState => {
            return prevState.map(state => {
                if (filterData.cuisine != "Any cuisine" && !(state.cuisine === filterData.cuisine)) {
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

    /* 
    Get user's location with Javascript's Geolocation API. Using precision location to make sure restaurants are actually within
    1 mile of user's locationm, which affects performance
    */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setCentre([position.coords.latitude, position.coords.longitude])
        }, error => {
            // show dialog box to user and then refresh the page when user closed the box
            if(!alert('Please allow the web browser to access your location!')){window.location.reload()}
        }
        )
    }

    // Get an array of restaurants by fetching backend API
    const getRestaurants = async() => {
    try{
        const res = await fetch("http://localhost:9090/food_finder/restaurants", 
        {
            headers: {
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({latitude: centre[0], longitude: centre[1]})
        }
        )
        // the array of restaurants is stored in the React State allRestaurants
        console.log(res.json())
        //setAllRestaurants(await res.json())
        /*
        restaurants may has more than 1 image, backend will include all image links in a single string separated with ","
        so frontend need to split the string and convert it to an array of image links
        */
        setAllRestaurants(prevState => {
            return prevState.map(restaurant => {
                const imagesLinkArray = restaurant.imagesLink.split(",")
                return {
                    ...restaurant,
                    imagesLink: imagesLinkArray
                }
            })
        })
    } catch(error) {
        console.log(error.message)
    }
    }

    /* Function to toggle the restaurant card when user click the marker. 
    This function will show the selected restaurant's card and close all the shown Markers
    This function pass down to the Marker components and takes the Marker's id as parameter
    */ 
    function toggle(id) {
    setAllRestaurants(prevState => {
        return prevState.map(state => {
        // make sure that the correct marker is toggled.
        return state.id === id ? {...state, show: true} : {...state, show: false}
        })
    })
    }

    // function to close the restaurant card when user click the Close Icon
    //  This function pass down to the Restaurant Card component
    const close = (event) => {
        event.stopPropagation()
        setAllRestaurants(prevState => {
            return prevState.map(state => {
            // Given that only 1 restaurant card is display at a time, no need to match the restaurant card with correct id
            return {...state, show: false}
            })
        })
    }

    return (
        <div>
            <div style={{ height: '75vh', width: '100%' }}>
                <Typography align="center" sx={{ alignItems: "center", justifyContent: "center" }}>
                    {!loaded && 
                    <div>
                        <img src={loading} alt='Loading...' />
                        <br />
                       <h2>Getting your location...</h2> 
                    </div>
                    }
                </Typography>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: ""}}
                    center={centre}
                    zoom={zoom}
                    hoverDistance={hoverDistance}
                >
                {allRestaurants.map( restaurant => {
                    if (!restaurant.filtered) {
                        return (
                            <Marker
                            key={restaurant.id}   
                            lat={restaurant.latitude}
                            lng={restaurant.longitude}
                            restaurantInfo={restaurant}
                            show={restaurant.show}
                            toggle={()=> toggle(restaurant.id)}
                            close={close}
                            />
                        )
                    }
                }
                )}
                </GoogleMapReact>
            </div>
        </div>
    )
}
