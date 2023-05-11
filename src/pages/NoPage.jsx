import React, { useRef, useEffect } from 'react';
import { Box, Card, CardMedia, Container, CssBaseline, Typography } from '@mui/material';
import { MyContainer, MyTitle } from '../styles.js'
import Footer from '../components/Footer.jsx';
import Header from '../components/Header';

/* */

/**
 * This page is displayed when the user tries to access a page which does not exist 
 * 
 * @returns {JSX.Element} Returns the error page JSX element.
 * @author Connor Cliff
 */
export default function NoPage() {

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
      <Box>

      <main ref={mainRef}>
        {/* displays header image with page title */}
        <MyContainer maxWidth='sm' >
          <Card> 
            <MyTitle align='center' sx={{ top: '15vh' }}>
              Error 404 page not found
            </MyTitle>
            <Box sx={{ position: 'relative' }}>
              <CardMedia 
                component="img"
                sx={{ height: '30vh', filter: 'brightness(35%)' }}
                image="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="random"
              />
            </Box>
          </Card>
        </MyContainer>
        <Container>
          <Typography variant='h5' align='center' color='textSecondary' paragraph sx={{ whiteSpace: 'pre-line' }}>
          The page you are looking for doesn't exist or another error occured.{'\n'}Go back, or use the navigation bar to choose another direction. 
          </Typography>
        </Container>
        
      </main>
      </Box>
      <Footer />
    </>
  )
};
