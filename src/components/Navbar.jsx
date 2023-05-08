import React from "react";
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';

function Navbar() {
    /* 
    Renders a navigation bar component containing links to different pages.
    Retrieve the user's object from AppContext to determine if the user is logged in.
    If user is logged in, hides the Login and Signup button; display username and Logout button instead
    */
    const { userObj, logout } = React.useContext(AppContext)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        logout()
        toast.success("Logged out successfully")
        setOpen(false)
    }

    
return (
    <nav>
        <ul sx={{ ml: '20px'}}>
        <Button component={Link} to='/about' variant='text' color='secondary' >
            About
        </Button>
        {/* If user is logged in, the user object is not null, so the the following pages are not shown */}
        { !userObj &&
        <Button component={Link} to='/login' variant='text' color='secondary'>
            Login
        </Button>}
        { !userObj && <Button component={Link} to='/signup' variant='text' color='secondary' sx={{ whiteSpace: 'nowrap' }}>
            Sign up
        </Button>}
        {/* If user is logged in, the user object is not null, so the the following pages are shown */}
        { userObj && <Typography display="inline">{userObj.username}</Typography>}
        { userObj && 
        <Button onClick={handleClickOpen} variant='text' color='secondary' sx={{ whiteSpace: 'nowrap' }}>
            Logout
        </Button> }
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirm-logout"
            aria-describedby="confirm-logout">
                <DialogTitle id="confirm-logout-title">
                    {"Confirm logout?"}
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
                </DialogActions>
        </Dialog>
        </ul>
        <ToastContainer 
            autoClose={3000}
        />
    </nav>
    );
}

export default Navbar;