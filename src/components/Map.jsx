import React from 'react'
import Marker from './Marker'
import GoogleMapReact from 'google-map-react';
import { AppContext } from '../AppContext';
import loading from '../image/loading.gif'
import { Typography } from '@mui/material'
import UserLocation from './UserLocation';

/**
 * Render a map displaying markers for each restaurant using Google Map React with custom components on the map.
 * 
 * @returns {JSX.Element} 
 * @author Kenny Yeung, Connor Cliff
 */
export default function Map() {
    /*
    * Store user's latitude and longitude in an array as Google Map React component take them as parameter in array format 
    * centre[0] is latitude, centre[1] is longitude
    */
    const [centre, setCentre] = React.useState()
    // Default the zoom level of the Google Map React component
    const zoom = 17
    // store any array of restaurants
    const [allRestaurants, setAllRestaurants] = React.useState([])
    // store an object of filter data
    const { filterData, baseURL } = React.useContext(AppContext)
    // Determine a distance between the marker and cursor to trigger the hover effect
    const hoverDistance = 35
    // get the API key from the .env file
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    
    /**
     * Fetch user's current location and update the centre state
     * Runs only once, when the component mounts.
     * @function
     * @name useEffect
     * @param {function} getLocation - A function that fetch user's current location and sets it as the component state.
     * @param {Array} dependencies - No dependencies means this usEffect hook will only run once
     * @returns {void}
    */
    React.useEffect(() => {
        getLocation()
      }, [])
    
    /**
     * Fetch restaurants and update the allRestaurants state when the location state changes.
     * @function
     * @name useEffect
     * @param {function} getRestaurants - A function that fetches restaurants and updates the allRestaurants state.
     * @param {Object} location - An object that contains latitude and longitude coordinates of the user's location.
     * @returns {void}
     */
    React.useEffect(() => {
    if(centre){
        getRestaurants()
    }
    }, [centre])

    /**
     * Run the updateRestaurantsShown function whenever the filterData state changes.
     * @function
     * @name useEffect
     * @param {function} updateRestaurantsShown - A function that updates the state of allRestaurants based on the cuisine filter.
     * @param {Array} dependencies - An array of state variables that this useEffect hook depends on. In this case, filterData.
     * @returns {void}
    */
    React.useEffect(() => {
        updateRestaurantsShown()
      }, [filterData])

    /**
    * Update the state of allRestaurants to show only the restaurants that match the cuisine filter.
    *
    * @function
    * @returns {void}
    */
    const updateRestaurantsShown = () => {
            setAllRestaurants(prevState => {
            return prevState.map(state => {
                // Add a new property "filtered" to each restaurant objects
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

    /**
     * Gets the user's current location using the Geolocation API and sets it as the component state.
     * 
     * @function
     * @async
     * @returns {void}
     */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setCentre([position.coords.latitude, position.coords.longitude])
        }, error => {
            // show dialog box to user and then refresh the page when user closed the box
            if(!alert("Please allow the web browser to access your location!")){window.location.reload()}
        }
        )
    }

    /**
     * Retrieves a list of restaurants from the server based on the current location, and updates the React state with the results.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     *
     */
    const getRestaurants = async() => {
    try{
        const res = await fetch(`${baseURL}/food_finder/restaurants`, 
        {
            headers: {
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({latitude: centre[0], longitude: centre[1]})
        }
        )
        // the array of restaurants is stored in the React State allRestaurants
        if (res.status === 200) {
            setAllRestaurants(await res.json())
        } else {
            if(!alert("Error communicating with server, website will refresh after closing this dialog box.")){window.location.reload()}
        }
    } catch(error) {
        if(!alert("Error communicating with server, website will refresh after closing this dialog box.")){window.location.reload()}
    }
    }
    /**
     * Toggles the show property of the restaurant with the given id to true, and sets all other restaurants' show property to false.
     * If show property is true, will show the restaurant info card on the map
     * This function is passed down to the Marker Componenet
     *
     * @function
     * @param {number} id - The id of the restaurant to toggle.
     * @returns {void}
     */
    function toggle(id) {
        setAllRestaurants(prevState => {
            return prevState.map(state => {
            return state.id === id ? {...state, show: true} : {...state, show: false}
            })
        })
    }

    /**
     * Closes the currently opened restaurant card and updates the React state accordingly.
     * This function is passed down to the ReestaurantCard component
     *
     * @param {Event} event - The click event that triggered the function.
     * @returns {void}
     */
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
                { /* Show loading animation if loaded is false, otherwise show the map*/ }
                {!centre &&
                <Typography align="center" sx={{ alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                    <div>
                        <img src={loading} alt='Loading...' />
                        <br />
                        <h2>Getting your location...</h2> 
                    </div>
                </Typography>}
                {/* 
                * bootstrapURLKeys is the Google Map Api key
                * centre: centre the map according to the latitude and longtitude provided
                * zoom: zoom level of the map
                * hoverDistance: Determine the distance between the marker and cursor to trigger the hover effect
                */}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey}}
                    center={centre}
                    zoom={zoom}
                    hoverDistance={hoverDistance}
                >
                    {/* Show a marker on user's current location */}
                    {centre && <UserLocation
                        lat={centre[0]}
                        lng={centre[1]}
                    />}
                    {/* Render markers on the map if the restaurant is not filtered */}
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
