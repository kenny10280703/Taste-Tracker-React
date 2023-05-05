import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, CardMedia, Container, CssBaseline, Grid, Rating, Stack, Table, TableBody, TableRow, TextField, Typography } from '@mui/material';
import { MyBold, MyContainer, MyTableCell } from '../styles.js';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import Review from '../components/Review.jsx';
import { Link } from "react-router-dom";
import { AppContext } from '../AppContext.jsx';

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = React.useState({})
    const [formData, setFormData] = React.useState({newRating: 0, newComment: ""})
    const [allReviews, setAllReviews] = React.useState([])
    const { token, logout } = React.useContext(AppContext)
    const test = [0, 1, 2]
    
    /* Gets the height of the header and footer an subtracts it from the total height of the 
    viewport so the footer is positioned at the bottom of the page */
    const mainRef = React.useRef(null);
    const headerRef = React.useRef(null);


    React.useEffect(() => {
        getInfo()
    },[])

    React.useEffect(() => {
        const handleResize = () => {
          mainRef.current.style.minHeight = `calc(100vh - ${headerRef.current.clientHeight + document.querySelector('footer').clientHeight}px)`;
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    React.useEffect(() => {
        if(restaurantInfo) {
            getReviews()
        }
    }, [restaurantInfo])

    

    const getInfo = async() => {
        const res = await fetch(`http://localhost:9090/food_finder/restaurants/${id}`)
        setRestaurantInfo(await res.json())
        setRestaurantInfo(prevState => {
            const imagesLinkArray = prevState.imagesLink.split(",")
            return {
                ...prevState,
                imagesLink: imagesLinkArray
            }
        })
    }

    const getReviews = async() => {
        try{
            const res = await fetch(`https://2df61d42-c535-41a1-96ab-1d4ea8564f33.mock.pstmn.io/reviews/${id}`)
            if (res.status === 200) {
                setAllReviews(await res.json())
            } else {
                const message = res.json()
                console.log("status wrong")
            }
        } catch (error) {
            console.log("error")
        }
    }

    const handleSubmit = async() => {
        try{
            const res = await fetch("", 
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    token: token, 
                    rating: formData.newRating, 
                    text: formData.newReviewText})
            }
            )
            if (res.status === 200) {
                setFormData({newRating: 0, newComment: ""})
                // TODO: getreviews
            } else if (res.status === 400) {
                alert("Your session has expired, please login again")
            } else {
                const message = res.json()
                alert(`Failed to post review due to ${message}`)
            }
        } catch(error) {
            alert(`Failed to post review due to ${error.message}`)
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        console.log(formData)
    }

    let{ name, overallRating, cuisine, address, averageCostOfADish, menuLink, distanceFromUser, 
        imagesLink, approximateWalkingTimeFromUser, websiteLink, phoneNumber} = restaurantInfo

  return (
    <div>
        <CssBaseline />
        <div ref={headerRef}>
        <Header  />
        </div>
        <main ref={mainRef}>
        {/* Displays header image with page title */}
        <MyContainer maxWidth='sm' >
        <Card>
            <Box sx={{ position: 'relative' }}>
                {imagesLink && <CardMedia 
                    component="img"
                    sx={{ height: '30vh' }}
                    image={imagesLink[0]}
                    alt="Images are not available for this restaurant"
                />} 
            </Box>
        </Card>
        </MyContainer>
        <MyContainer maxWidth='sm' >
            <Box sx={{ ml: '18vw', mr: '18vw' }} > 
                <Typography gutterBottom variant='h2' sx={{ ml: '15px' }}>
                    {name}
                </Typography>
                <Grid container>
                    <Grid item>
                        <Stack spacing={1} sx={{ ml: 2, mt: 1, mb: 1 }}>
                        <Rating name="rating" value={overallRating} precision={0.5} readOnly />
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ ml: '5px', mt: '10px' }}>
                            {allReviews.length} Rating
                        </Typography>
                    </Grid>
                </Grid>
                <Container>
                    <Typography gutterBottom>
                        <MyBold>Cuisine: </MyBold>{cuisine}
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Average main price: </MyBold>£{averageCostOfADish}
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Address: </MyBold>{address}
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Approx walking time: </MyBold>{approximateWalkingTimeFromUser} minutes
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Distance: </MyBold>{distanceFromUser}m
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Menu: </MyBold><Link to={menuLink} color='inherit'>{menuLink}</Link>
                    </Typography>
                    <Typography gutterBottom>
                        <MyBold>Phone: </MyBold>{phoneNumber}
                    </Typography>
                    {/* Displays the opening times of the restaurant as a table */}
                    <Typography gutterBottom>
                        <MyBold>Opening times</MyBold> 
                    </Typography>
                    <Table sx={{ maxWidth: 300, maxHeight: 300 }}>
                        <TableBody>
                            <TableRow>
                                <MyTableCell>Monday</MyTableCell>
                                <MyTableCell>12:00 - 22:30</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Tuesday</MyTableCell>
                                <MyTableCell>12:00 - 22:30</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Wednesday</MyTableCell>
                                <MyTableCell>12:00 - 22:30</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Thursday</MyTableCell>
                                <MyTableCell>12:00 - 22:30</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Friday</MyTableCell>
                                <MyTableCell>12:00 - 23:00</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Saturday</MyTableCell>
                                <MyTableCell>09:00 - 23:00</MyTableCell>
                            </TableRow>
                            <TableRow>
                              <MyTableCell>Sunday</MyTableCell>
                              <MyTableCell>09:00 - 23:00</MyTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography gutterBottom variant='h6' sx={{ mt: '20px' }}>
                        Ratings
                    </Typography>
                    {/* Renders a card for users to select a star rating and leave a review */}
                    <Card sx={{ boxShadow: '1px 1px 5px grey' }}>
                        <CardContent>
                            <div>
                                <Grid container alignItems='center' >
                                    <Grid item>
                                       <Rating name="newRating" value={formData.newRating} precision={0.5} onChange={handleChange}/>
                                    </Grid>
                                    <Grid item sx={{ ml: 'auto', mb: '10px'}}>
                                        <Button variant='contained' size='medium' color='primary' onClick={handleSubmit}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </div>
                           <div>
                             <TextField
                                id="outlined-multiline-flexible"
                                label="Leave a review"
                                multiline
                                maxRows={4}
                                sx={{ width: '100%' }}
                                name="newComment"
                                value={formData.newComment}
                                onChange={handleChange}
                             />           
                           </div>
                        </CardContent>
                    </Card>
                    {allReviews.map(review => {
                        return (<Review 
                            key={review.id}
                            username={review.username}
                            rating={review.rating}
                            comment={review.comment}
                        />
                    )})}
                </Container>
            </Box>
        </MyContainer>
        </main>
        <Footer />
    </div>
  )
}