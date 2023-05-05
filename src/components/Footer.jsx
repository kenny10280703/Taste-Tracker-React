import React from 'react'
import { Box, Button, Container, CssBaseline, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { AppContext } from '../AppContext';

/* Renders a footer component with social media links and navigation buttons. */
/* 
Get the user's object from AppContext to determine if the user is logged in.
If user is logged in, will hide the Login and Signup button
*/

function Footer() {
    const { userObj, logout } = React.useContext(AppContext)
  return (
    <>
    <CssBaseline />
        <Box 
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            width: '100%',
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800]
        }}>      
            <Container sx={{ backgroundColor: 'primary'}}>
                <Grid container spacing={3} gutterBottom justifyContent='center' >
                    <Grid item>
                        <Facebook />
                    </Grid>
                    <Grid item>
                        <Instagram />
                    </Grid>
                    <Grid item>
                        <Twitter />
                    </Grid>
                </Grid>
                <Grid>
                    <nav align='center'>
                        <Button component={Link} to='/' variant='text' color='primary' >
                            Home
                        </Button>
                        <Button component={Link} to='/about' variant='text' color='primary' >
                            About
                        </Button>
                        { !userObj && <Button component={Link} to='/login' variant='text' color='primary'>
                        Login
                        </Button> }
                        { !userObj && <Button component={Link} to='/signup' variant='text' color='primary' sx={{ whiteSpace: 'nowrap' }}>
                            Sign up
                        </Button> }
                    </nav>
                </Grid>
            </Container>
        </Box>
    </>
  )
}

export default Footer;