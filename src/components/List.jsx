import React from 'react'
import { Grid, CardMedia, Typography, Button, Container, Rating, Box, Stack } from '@mui/material';
import { MyCard, MyCardGrid, MyCardContent } from '../styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';


export default function List() {
    const [location, setLocation] = React.useState()
    const [allRestaurants, setAllRestaurants] = React.useState([])
    const [directionService, serDirectionService] = React.useState()
    const [centre, setCentre] = React.useState()
    const zoom = 17

    React.useEffect(() => {
        getLocation()
      }, [])
    
    React.useEffect(() => {
        if (location) {
            getRestaurants()
        }
      }, [location])
    
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
                })
                setCentre([position.coords.latitude, position.coords.longitude])
            }, 
            function(error) {
                console.log(error)
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
        } catch(error) {
            console.log("error")
        }
    }

    const handleApiLoaded = (map, maps) => {
        const dr = new maps.DirectionsService()
        serDirectionService(dr)
        console.log(directionService)
    }

    const GetWalkingTime = ({origin, destination}) => {
        if (directionService) {
            const request = {
                origin: origin,
                destination: destination,
                travelMode: 'WALKING'
            }
            directionService.route(request, (result, status) => {
                if (status === 'OK') {
                    return (result.routes[0].legs[0].duration.text)
                } else {
                    console.error(`Directions request failed due to ${status}`)
                    return null
                }
            })
        } else { return null}
    }

    return (
        <div>
        <GoogleMapReact 
            bootstrapURLKeys={{ key: "" }}
            center={centre}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            apiOptions={{
                mapTypeId: 'none', 
                streetViewControl: false, 
                zoomControl: false 
                }}
        />
        <MyCardGrid maxWidth='md'>
            <Grid container spacing={4}>
                {allRestaurants.map(restaurant => (
                    <Grid item key={restaurant.id} xs={12} sm={6} md={6}>
                        <MyCard>
                            <CardMedia 
                                component="img"
                                image={restaurant.imagesLink}
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
                                            Approximate walking time:
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
                                                            Mon 12 - 10:30 pm{'\n'}
                                                            Tue 12 - 10:30 pm{'\n'}
                                                            Wed 12 - 10:30 pm{'\n'}
                                                            Thu 12 - 10:30 pm{'\n'}
                                                            Fri 12 - 11 pm{'\n'}
                                                            Sat 9 am - 11 pm{'\n'}
                                                            Sun 9 am - 11 pm
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