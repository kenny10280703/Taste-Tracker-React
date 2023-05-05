import { Avatar, Box, Card, CardContent, CssBaseline, Grid, Rating, Typography } from '@mui/material';
import React from 'react'

/* Renders a users review of a restaurant */

function Review(props) {
    const { username, rating, comment } = props
  return (
    <>
        <CssBaseline />
        <Card sx={{ mt: '40px', boxShadow: '1px 1px 5px grey' }}>
            <CardContent>
                <Grid container spacing={2} alignItems='center' >
                    <Grid item xs={2}>
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection= 'column'>
                            <div>
                                <Avatar sx={{ bgcolor: "#F45152" }}>{username.charAt(0).toUpperCase()}</Avatar>
                            </div>
                            <div>
                                <Typography>
                                    {username}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <div>
                            <Rating name="rating" value={rating} precision={0.5} readOnly/>
                        </div>
                        <div>
                            <Typography>
                            {comment}
                            </Typography>    
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>
  )
}

export default Review;