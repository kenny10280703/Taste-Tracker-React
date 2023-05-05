import React from 'react';
import { AppBar, Container, CssBaseline, Toolbar } from '@mui/material';
import MyIconButton from '../styles.js';
import Navbar from './Navbar';

/* Renders a header component with a logo and a navigation bar. */

function Header() {
  return (
    <>
    <CssBaseline />
    <AppBar position="relative" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
            <Container sx={{ ml: '18vw', mr: '18vw', display: 'flex', alignItems: 'center' }}> 
                <MyIconButton sx={{ fontSize: 90 }}/>
                <Container sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Navbar />
                </Container>
            </Container>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header