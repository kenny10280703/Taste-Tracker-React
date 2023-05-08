import React from 'react'
import { Box, Button, CardMedia, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import { MyBold, MyCard, MyCardContent } from '../styles';
import { Link } from "react-router-dom";
import loading from '../image/loading.gif'
import { AppContext } from '../AppContext'

export default function List() {
    // store the latitude and longitude of user
    const [location, setLocation] = React.useState()
    // store any array of restaurants
    const [allRestaurants, setAllRestaurants] = React.useState([])
    // a Boolean value to determine whether display the loading animation
    const [loaded, setLoaded] = React.useState(false)
    // store an object of filter data
    const { filterData } = React.useContext(AppContext) 

    /**
     * Fetch user's current location and update the location state
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
     * @param {boolean} setLoaded - A function that updates the loaded state to true after restaurants have been fetched.
     * @param {Object} location - An object that contains latitude and longitude coordinates of the user's location.
     * @returns {void}
     */
    React.useEffect(() => {
        if (location) {
            getRestaurants()
            setLoaded(true)
        }
      }, [location])

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
     * Gets the user's current location using the Geolocation API and sets it as the component state.
     * 
     * @function
     * @async
     * @returns {void}
     */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setLocation({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            })
        }, error => {
            // If unable to get user's location, display a dialog box remind user to grant permission.
            // Refresh the page after the dialog box is closed.
            if(!alert('Please allow the web browser to access your location!')){window.location.reload()}
        })
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
            const res = await fetch("http://localhost:9090/food_finder/restaurants", 
            {
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({latitude: location.latitude, longitude: location.longitude})
            }
            )
            // With successful response from server, the array of restaurants is stored in the React State allRestaurants
            if (res.status === 200) {
                setAllRestaurants(await res.json())
            } else {
                // If failed to get restaurants from server, display an alert to user.
                // Refresh the page after the dialog box is closed.
                if(!alert("Error communicating with server, website will refresh after closing this dialog box.")){window.location.reload()}
            }
        } catch(error) {
            // If failed to get restaurants from server, display an alert to user.
            // Refresh the page after the dialog box is closed.
            if(!alert("Error communicating with server, website will refresh after closing this dialog box.")){window.location.reload()}
        }
    }

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

    // Defines a function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
    })};

    return (
        <div>
        <Box sx={{ mt: '40px' }}>
        {/* show the loading animation if React state loaded is false*/}
        {!loaded &&
        <Typography align="center" sx={{ alignItems: "center", justifyContent: "center", paddingBottom: 10}}>
                <div>
                    <img src={loading} alt='Loading...' />
                    <br />
                    <h2>Getting your location...</h2> 
                </div>
        </Typography>}
            <Grid container spacing={4}>
                {/* Map over the array of resturants and display Card component */}
                {allRestaurants.map((restaurant) => {
                    // If the restaurant is filtered, will not render the card componenet
                    if (!restaurant.filtered) {
                        return (
                        <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                            {/* Displays a card */}
                            <MyCard>
                                <CardMedia 
                                    component="img"
                                    image={restaurant.imagesLink[0]}
                                    alt="loading..."
                                    title='Image title here'
                                /> 
                                <MyCardContent>
                                    <Typography color='inherit' gutterBottom variant='h5' sx={{ ml: '15px', mt: '10px' }}>
                                        {restaurant.name}
                                    </Typography>
                                    {/* Display the rating of the restaurant */}
                                    <Stack spacing={1} sx={{ ml: 2, mt: 1, mb: 1 }}>
                                        <Rating name="rating" defaultValue={restaurant.overallRating} precision={0.5} readOnly />
                                    </Stack>
                                    {/* Display the price and a button to see more details */}
                                    <Container variant='h6' sx={{ mb: '20px' }}>
                                    <Typography gutterBottom>
                                        <MyBold>Average main price: </MyBold>£{restaurant.averageCostOfADish}
                                    </Typography>
                                    {/* When user click this button, will redirect user to the restaurant page with the correct restaurant id */}
                                    <Button component={Link} to={"/restaurants/" + restaurant.id} variant='contained' size='small' 
                                    color='primary' sx={{ mt: '7px' }} onClick={scrollToTop}>See more details</Button>
                                    </Container>
                                </MyCardContent>
                            </MyCard>
                        </Grid>
                        )
                    }
                })}
            </Grid>
        </Box>
        </div>
    )
}