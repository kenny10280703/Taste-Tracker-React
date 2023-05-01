import React from 'react';
import { CssBaseline, Container, Typography, Card, Box, CardMedia } from '@mui/material';
import { MyContainer, MySlogan } from '../styles.js'
import Footer from '../components/Footer.jsx';
import Header from '../components/Header';

function About() {
  return (
    <>
      <CssBaseline />
      <Header />
      <main>
      <MyContainer maxWidth='sm' >
        <Card>
            <MySlogan align='center' sx={{ top: '15vh' }} >
                About us
            </MySlogan>
            <Box sx={{ position: 'relative' }}>
                <CardMedia 
                    component="img"
                    sx={{ height: '30vh', filter: 'brightness(35%)' }}
                    image="https://images.squarespace-cdn.com/content/v1/5a44e092e45a7c5289a2c962/1579452052591-DZI2BWNBO07A27L4IJ3D/Food-photography-lacnashire-006.jpg?format=1500w"
                    alt="random"
                /> 
            </Box>
        </Card>
        </MyContainer>
        <div>
          <Container>
            <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Welcome to Menu Map, the go-to website for students new to the city looking for the best restaurants nearby. Our platform makes it easy to find delicious food options in your area with just a few clicks. Whether you're in the mood for a quick bite or a fancy dinner, Menu Map has got you covered. We strive to provide you with accurate and up-to-date information about local restaurants, including their menus, opening hours, and user ratings. So, whether you're new to the city or just looking for something new, let Menu Map be your guide to the culinary scene!
            </Typography>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About;