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
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        getLocation()
      }, [])
    
    React.useEffect(() => {
        if (location) {
            getRestaurants()
            setLoaded(true)
        }
      }, [location])
    
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setLocation({
                lat: position.coords.latitude, 
                lng: position.coords.longitude
            })
        }, error => {
            // show dialog box to user and then refresh the page when user closed the box
            if(!alert('Please allow the web browser to access your location!')){window.location.reload()}
        }
        )
    }

    const getRestaurants = async() => {
        try{
            const res = await fetch("http://localhost:9090/food_finder/restaurants", 
            {
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({lat: location.lat, lng: location.lng})
            }
            )
            setAllRestaurants(await res.json())
            setAllRestaurants(prevState => {
                return prevState.map(restaurant => {
                    const imageLinkArray = restaurant.imageLink.split(",")
                    console.log(imageLinkArray)
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