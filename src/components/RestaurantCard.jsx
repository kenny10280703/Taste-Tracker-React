import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, Typography, CardActionArea, CardContent, Rating, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Renders a card that displays information about a restaurant, displayed in the restaurant map view when user click a marker.
 * @param {object} props - The restaurant information passed as a prop
 * @param {string} props.id - The ID of the restaurant
 * @param {string} props.name - The name of the restaurant
 * @param {number} props.overallRating - The overall rating of the restaurant
 * @param {Array<string>} props.imagesLink - An array of image links for the restaurant
 * @param {number} props.distanceFromUser - The distance from the user to the restaurant
 * @param {function} props.close - A callback function for hiding this restaurant card on the map
 * @returns {JSX.Element} - A component that displays the restaurant information
 * @author Kenny Yeung
 */
export default function RestaurantCard(props) {
    const { id, name, overallRating, imagesLink, distanceFromUser } = props.restaurantInfo
    const infoWindowStyle = {
    position: 'relative',
    left: '-45px',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    }
    const close = (event) => {
        props.close(event)
    }
    // When user click this Restaurant Card Component, website will be able to dynamically open a restaurant page 
    // with the correct restaurant id
    const url = `/restaurants/${id}`


  return (
    <div style={infoWindowStyle}>
        <Card sx={{width: 200, maxWidth: 200, boxShadow: '1px 1px 5px grey'}}>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <IconButton size='small' onClick={close} >
                <CloseIcon />
            </IconButton>
         </Box>
         <CardActionArea component={Link} to={url}>
                {imagesLink && <CardMedia
                    component="img"
                    image={imagesLink[0]}
                    height="60"
                    alt="loading..."
                />}
                <CardContent>
                    <Typography variant="h6" component="div"> 
                        {name}
                    </Typography>
                   <Box display="flex" flexWrap="wrap">
                        <Rating name="rating" value={overallRating} precision={0.5} readOnly />
                        {distanceFromUser}m away
                   </Box>
                </CardContent>
             </CardActionArea>
        </Card>
    </div>
  )
}

