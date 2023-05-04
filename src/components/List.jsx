import React from 'react'
import { Grid, CardMedia, Typography, Button, Container, Rating, Box, Stack } from '@mui/material';
import { MyCard, MyCardGrid, MyCardContent } from '../styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            const res = await fetch("http://2df61d42-c535-41a1-96ab-1d4ea8564f33.mock.pstmn.io/post", 
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
                    const imageLinkArray = restaurant.imageLink.split(",")
                    return {
                        ...restaurant,
                        imageLink: imageLinkArray
                    }
                })
            })
        } catch(error) {
            console.log("error")
        }
    }



    return (
        <div>
        <MyCardGrid maxWidth='md'>
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
                {allRestaurants.map(restaurant => (
                    <Grid item key={restaurant.id} xs={12} sm={6} md={6}>
                        <MyCard>
                            <CardMedia 
                                component="img"
                                image={restaurant.imageLink[0]}
                                alt="random"
                                title='Image title here'

                            /> 
                            <MyCardContent >
                                    <Typography gutterBottom variant='h5' sx={{ ml: '15px', mt: '10px' }}>
                                        {restaurant.name}
                                    </Typography>
                                    <Stack spacing={1} sx={{ ml: 2, mt: 1, mb: 1 }}>
                                        <Rating name="half-rating-read" defaultValue={restaurant.overallRating} precision={0.5} readOnly />
                                    </Stack>
                                    <Container gutterBottom variant='h6'>
                                        <Typography>
                                            Average cost of main dish: £{restaurant.averageCostOfADish}
                                        </Typography>
                                        <Typography>
                                            Distance in metres: {restaurant.distanceFromUser}m
                                        </Typography>
                                        <Typography gutterBottom>
                                            Approximate walking time: {restaurant.walkingTime}
                                        </Typography>
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Accordion sx={{ boxShadow: '1px 1px 5px grey', width: '18vw', mb: '30px' }}>
                                                        <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                        >
                                                        <Typography>Opening times</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                        <Typography sx={{ whiteSpace: 'pre-line' }}>
                                                            {restaurant.operatingHoursOfTheDay}
                                                        </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant='contained' size='small' color='primary' sx={{ mt: '7px' }}>Go to website</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Container>
                            </MyCardContent>
                        </MyCard>
                </Grid>
                ))}
            </Grid>
        </MyCardGrid>
        </div>
    )
}