import React from 'react'
import { Button, Grid, Container, CssBaseline } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
    <CssBaseline />
    <footer>
        <Container sx={{ backgroundColor: 'primary', padding: '35px' }}>
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
                    <Button component={Link} to='/login' variant='text' color='primary'>
                        Login
                    </Button>
                    <Button component={Link} to='/signup' variant='text' color='primary' sx={{ whiteSpace: 'nowrap' }}>
                        Sign up
                    </Button>
                </nav>
            </Grid>
        </Container>
    </footer>
    </>
  )
}

export default Footer;