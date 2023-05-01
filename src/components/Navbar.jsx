import React from "react";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

function Navbar() {
return (
    <nav>
        <ul sx={{ ml: '20px' }}>
        <Button component={Link} to='/about' variant='text' color='secondary' >
            About
        </Button>
        <Button component={Link} to='/login' variant='text' color='secondary'>
            Login
        </Button>
        <Button component={Link} to='/signup' variant='text' color='secondary' sx={{ whiteSpace: 'nowrap' }}>
            Sign up
        </Button>
        </ul>
    </nav>
    );
}

export default Navbar;