import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, CssBaseline, Grid, ImageList, ImageListItem, Rating, Stack, Table, TableBody, TableRow, TextField, Typography } from '@mui/material';
import { MyBold, MyContainer, MyTableCell } from '../styles.js';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import Review from '../components/Review.jsx';
import { Link } from "react-router-dom";
import { AppContext } from '../AppContext.jsx';
import loading from '../image/loading.gif'
import { Navigate } from 'react-router-dom';

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = React.useState({})
    const [formData, setFormData] = React.useState({newRating: 0, newComment: ""})
    const [allReviews, setAllReviews] = React.useState([])
    const { token, logout } = React.useContext(AppContext)
    const [location, setLocation] = React.useState()
    const [loaded, setLoaded] = React.useState(false)
    const [noPage, setNoPage] = React.useState(false)

    
    /* Gets the height of the header and footer an subtracts it from the total height of the 
    viewport so the footer is positioned at the bottom of the page */
    const mainRef = React.useRef(null);
    const headerRef = React.useRef(null);

    /* 
    As distance and walking time is calculated by backend application, will get location of the user and send to backend
    */
    React.useEffect(() => {
        getLocation()
      }, [])
    
    
    // Use React useEffect to make sure only fetch backend API to get restaurants after getting user's location
    React.useEffect(() => {
        // change loaded to true after getting user's location
        if (location) {
            getRestaurantInfo()
            setLoaded(true)
        }
      }, [location])

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

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setLocation({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            })
        }, error => {
            // show dialog box to user and then refresh the page when user closed the box
            if(!alert('Please allow the web browser to access your location!')){window.location.reload()}
        }
        )
    }

    const getRestaurantInfo = async() => {
        try{
            const res = await fetch(`http://localhost:9090/food_finder/restaurants/${id}`, 
            {
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({latitude: location.latitude, longitude: location.longitude})
            }
            )
            if (res.status === 200) {
                setRestaurantInfo(await res.json())
            } else if(res.status == 400) {
                setNoPage(true)
            }
        } catch(error) {
            console.log("error")
        }
    }

    const getReviews = async() => {
        try{
            const res = await fetch(`https//localhost:9090/food_finder/restaurants/reviews/${id}`)
            if (res.status === 200) {
                setAllReviews(await res.json())
            } else {
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
        imagesLink, approximateWalkingTimeFromUser, websiteLink, phoneNumber, operatingHoursOfTheWeek} = restaurantInfo

  return (
    <div>
        {noPage && <Navigate replace to="../notexist"/>}
        <CssBaseline />
        <div ref={headerRef}>
        <Header  />
        </div>
        <main ref={mainRef}>
        {/* Displays header image with page title */}
        {!loaded &&
        <Typography align="center" sx={{ alignItems: "center", justifyContent: "center", paddingBottom: 10}}>
                <div>
                    <img src={loading} alt='Loading...' />
                    <br />
                    <h2>Getting your location...</h2> 
                </div>
        </Typography>}
        {loaded && <div>
        <MyContainer maxWidth='sm' >
        <Card>
            <Box sx={{ position: 'relative' }}>
                {/* Displays three photos in a row */}
                {/* https://www.dawnvale.com/wp-content/uploads/projects/tgi-fridays-newcastle/TGI-Newcastle-Hero-1920x1080.jpg */}
                {imagesLink && 
                 <ImageList sx={{ width: "100vw", height: 300 }} cols={imagesLink.length} rowHeight={350}>
                    {imagesLink.map(link => {
                        return (
                        <ImageListItem key={link}>
                             <img
                                src={`${link}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={"Image of " + name}
                                loading="lazy"
                            />
                        </ImageListItem>
                        )
                    })}
                 </ImageList>
                }
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
                    {operatingHoursOfTheWeek && 
                    <Table sx={{ maxWidth: 300, maxHeight: 300 }}>
                        <TableBody>
                            <TableRow>
                                <MyTableCell>Monday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[0]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Tuesday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[1]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Wednesday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[2]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Thursday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[3]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Friday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[4]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                                <MyTableCell>Saturday</MyTableCell>
                                <MyTableCell>{operatingHoursOfTheWeek[5]}</MyTableCell>
                            </TableRow>
                            <TableRow>
                              <MyTableCell>Sunday</MyTableCell>
                              <MyTableCell>{operatingHoursOfTheWeek[6]}</MyTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>}
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
        </div>}
        </main>
        <Footer />
    </div>
  )
}