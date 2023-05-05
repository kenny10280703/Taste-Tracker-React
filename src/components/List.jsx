import React from 'react'
import { Box, Button, CardMedia, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import { MyBold, MyCard, MyCardContent } from '../styles';
import { Link } from "react-router-dom";
import loading from '../image/loading.gif'

export default function List() {
    const [location, setLocation] = React.useState()
    const [allRestaurants, setAllRestaurants] = React.useState([])
    // if loaded is false, will display the loading animation
    const [loaded, setLoaded] = React.useState(false)

    /* 
    To accurately show restaurants within one mile, will assume user may move while switching from Map View to List View,
    so list view will get user's location again
    */
    React.useEffect(() => {
        getLocation()
      }, [])
    
    // Use React useEffect to make sure only fetch backend API to get restaurants after getting user's location
    React.useEffect(() => {
        // change loaded to true after getting user's location
        if (location) {
            getRestaurants()
            setLoaded(true)
        }
      }, [location])
    
        /* 
        Get user's location with Javascript's Geolocation API. Using precision location to make sure restaurants are actually within
        1 mile of user's locationm, which affects performance
        */
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setLocation({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            })
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
                body: JSON.stringify({latitude: location.latitude, longitude: location.longitude})
            }
            )
            // the array of restaurants is stored in the React State allRestaurants
            setAllRestaurants(await res.json())
            /*
            Restaurants may has more than 1 image, backend will include all image links in a single string separated with ","
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
            console.log("error")
        }
    }

    // Defines a function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
    })};



    return (
        <div>
        <Box sx={{ mt: '40px' }}>
        {/* show the loading animation of loaded is false*/}
        <Typography align="center" sx={{ alignItems: "center", justifyContent: "center" }}>
            {!loaded && 
                <div>
                    <img src={loading} alt='Loading...' />
                    <br />
                    <h2>Getting your location...</h2> 
                </div>
            }
            </Typography>
            <Grid container spacing={4}>
                {/* Map over the array of resturants and display each one */}
                {allRestaurants.map((restaurant) => (
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
                                    <MyBold>Average main price: </MyBold>£{restaurant.overallRating}
                                </Typography>
                                <Button component={Link} to={"/restaurants/" + restaurant.id} variant='contained' size='small' color='primary' sx={{ mt: '7px' }} onClick={scrollToTop}>See more details</Button>
                                </Container>
                            </MyCardContent>
                        </MyCard>
                </Grid>
                ))}
            </Grid>
        </Box>
        </div>
    )
}