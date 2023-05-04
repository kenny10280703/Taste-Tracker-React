import React from "react";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

function Navbar() {
    /* 
    Get the user's object from AppContext to determine if the user is logged in.
    If user is logged in, will hide the Login and Signup button; display username and Logout button instead
    */
    const { userObj, logout } = React.useContext(AppContext)
return (
    <nav>
        <ul sx={{ ml: '20px' }}>
        <Button component={Link} to='/about' variant='text' color='secondary' >
            About
        </Button>
        { !userObj  &&
        <Button component={Link} to='/login' variant='text' color='secondary'>
            Login
        </Button>}
        { !userObj && <Button component={Link} to='/signup' variant='text' color='secondary' sx={{ whiteSpace: 'nowrap' }}>
            Sign up
        </Button>}
        { userObj && `Hello ${userObj.username}`}
        { userObj && <Button onClick={logout} variant='text' color='secondary' sx={{ whiteSpace: 'nowrap' }}>
            Logout
        </Button>}
        </ul>
    </nav>
    );
}

export default Navbar;