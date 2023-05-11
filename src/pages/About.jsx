import React, { useRef, useEffect } from 'react';
import { Box, Card, CardMedia, Container, CssBaseline, Typography } from '@mui/material';
import { MyContainer, MyTitle } from '../styles.js'
import Footer from '../components/Footer.jsx';
import Header from '../components/Header';

/**
 * Renders the about page which provides information about the website and its purpose.
 * Includes a header, a Title, and a description of the website.
 * @returns {JSX.Element} The JSX code for the About page.
 * @author Connor Cliff
 */


function About() {
    /* Gets the height of the header and footer an subtracts it from the total height of the 
    viewport so the footer is positioned at the bottom of the page */

    const mainRef = useRef(null);
    const headerRef = useRef(null);
  
    useEffect(() => {
      const handleResize = () => {
        mainRef.current.style.minHeight = `calc(100vh - ${headerRef.current.clientHeight + document.querySelector('footer').clientHeight}px)`;
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <>
      <CssBaseline />
      <div ref={headerRef}>
      <Header  />
      </div>
      <main ref={mainRef}>
      <MyContainer maxWidth='sm' >
        <Card>
            <MyTitle align='center' sx={{ top: '15vh' }} >
                About us
            </MyTitle>
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
            Welcome to Taste Tracker, the go-to website for students new to the city looking for the best restaurants nearby. Our platform makes it easy to find delicious food options in your area with just a few clicks. Whether you're in the mood for a quick bite or a fancy dinner, Taste Tracker has got you covered. We strive to provide you with accurate and up-to-date information about local restaurants, including their menus, opening hours, and user ratings. So, whether you're new to the city or just looking for something new, let Taste Tracker be your guide to the culinary scene!
            </Typography>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About;