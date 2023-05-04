import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardMedia, Typography, CardActionArea, CardContent, Rating, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function RestaurantCard(props) {
    const { id, name, overallRating, imageLink, distanceFromUser } = props.restaurantInfo
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
                <CardMedia
                    component="img"
                    image={imageLink[0]}
                    height="60"
                    alt="loading..."
                />
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

