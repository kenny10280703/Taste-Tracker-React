import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Dropdown from '../components/Dropdown'
import Map from '../components/Map'
import List from '../components/List'
import { Box, Button, Card, CardMedia, CssBaseline, Grid, Typography, Container } from '@mui/material';
import { MyContainer, MySlogan } from '../styles';

/**
 * The Home component displays the landing page of the application, which includes a header, a main content area, and a footer. 
 * It uses the React.useState hook to manage the state of the view mode (map or list), 
 * and toggles between the two views when the toggle button is clicked.
 *
 * @return {JSX.Element} The JSX code for the Home component
 * @author Connor Cliff, Nyan Lin Naing
 */
export default function Home() { 
  const [isMapView, setIsMapView] = React.useState(true);

    const toggleView = () => {
    setIsMapView((prevIsMapView) => !prevIsMapView);
    };
  
  return (
    <div>
            <CssBaseline />
            <Header />
            <main>
                <div>
                    {// make myslogan on two lines by default
                    }
                    <MyContainer maxWidth='sm' >
                        <Card> 

                            <Box sx={{ width: '100px' }}>
                                <MySlogan align='center' sx={{ top: '25vh' }}>
                                    Find your next favorite restaurant
                                </MySlogan>
                            </Box>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia 
                                    component="img"
                                    sx={{ height: '50vh', filter: 'brightness(35%)' }}
                                    image="https://images.squarespace-cdn.com/content/v1/5a44e092e45a7c5289a2c962/1579452035230-HX17FJMPYEZC4L66AKDO/Food-photography-lacnashire-005.jpg"
                                    alt="random"
                                /> 
                            </Box>
                        </Card>
                        <Container sx={{ mt: '20px' }}>
                            <Typography variant='h1' align='left' color='textPrimary' >
                                Restaurants within a mile of you
                            </Typography>
                            <Typography variant='h5' align='left' color='textSecondary' paragraph>
                                Explore the map or customise the filter options to match your taste. 
                            </Typography>
                            <div>
                                <Grid container spacing={2} justifyContent='left'>
                                    <Grid item>
                                        <Typography variant='h5' color='textSecondary'>
                                            Filter by: 
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Dropdown />
                                    </Grid>
                                    <Grid item>
                                        <Button variant='contained' color='primary' onClick={toggleView} >
                                        {isMapView ? "Switch to List View" : "Switch to Map View"}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Container>
                                  {isMapView ? <Map /> : <List />}
                                </Container>
                            </div>
                        </Container>       
                    </MyContainer>
                </div>
            </main>
            <Footer />
        </div>
  )
}

