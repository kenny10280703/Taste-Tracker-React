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
import { ToastContainer, toast } from 'react-toastify';

/**
 * A page to display the following information of a restaurant:
 * Images, name, phone, rating, cuisine, distance from user, walking time, operating hours of the week, link to menu (if any),
 * address, average main dish cost
 * 
 * @returns {JSX.Element} Returns the login page JSX element.
 */
export default function RestaurantDetailPage() {
    /* 
    * UseParams from React Router Dom to get the id from url parameter.
    * This id will be insert to the backend API to fetch information of restaurant with the correct id.
    * If user is redirected to this page from Mapview or List view, the two components will be resposible to insert
    * the correct restaurant id into the url.
    */ 
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = React.useState({})
    const [formData, setFormData] = React.useState({newRating: 0, newComment: ""})
    const [allReviews, setAllReviews] = React.useState([])
    const { token, logout, baseURL } = React.useContext(AppContext)
    const [location, setLocation] = React.useState()
    const [noPage, setNoPage] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    
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

    /**
     * Gets the user's current location using the Geolocation API and sets it as the component state.
     * 
     * @function
     * @async
     * @returns {void}
     */
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

    /**
     * Function to fetch backend API to send user's location, and then get restaurant information with a given id,
     * the id is the parameter of the url of the webpage
     * If successful, store in the React State getRestaurantInfo
     * If failed to fetch the restaurant information, will set the noPage state to true
     * 
     * @async
     * @returns {void}
     */
    const getRestaurantInfo = async() => {
        try{
            const res = await fetch(`${baseURL}/food_finder/restaurants/${id}`, 
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
            } else {
                setNoPage(true)
            }
        } catch(error) {
            setNoPage(true)
        }
    }

    /**
     * Function to fetch backend API to get an array of reviews, and store in the React State allReviews
     * If failed to fetch reviews, will not display anything on the screen
     * 
     * @async
     * @returns {void}
     */
    const getReviews = async() => {
        try{
            const res = await fetch(`${baseURL}/food_finder/restaurants/reviews/${id}`)
            if (res.status === 200) {
                setAllReviews(await res.json())
            }
        } catch (error) {
            console.log("Error fetching reviews")
        }
    }

    /**
     * Handles the submission of the new review, sends a POST request to the server.
     * If successfully submitted, will get the list of reviews again to show the newly submited review by user.
     * Otherwise, alert user with corresponding messages according to backend's response status.
     * 
     * @returns {void}
     */
    const handleSubmit = async() => {
        try{
            const res = await fetch(`${baseURL}/food_finder/restaurants/reviews/${id}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({
                    token: token,
                    rating: formData.newRating, 
                    comment: formData.newComment})
            }
            )
            if (res.status === 201) {
                setFormData({newRating: 0, newComment: ""})
                toast.success("Review submited!")
                getReviews()
            } else if (res.status === 500) {
                toast.error("Please login to submit a new review!")
                logout()
            } else if (res.status === 409){
                toast.error("You have already posted review for this restaurant!")
            }
        } catch(error) {
            toast.error(`Failed to post review due to ${error.message}`)
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
    }

    const { name, overallRating, cuisine, address, averageCostOfADish, menuLink, distanceFromUser, 
        imagesLink, approximateWalkingTimeFromUser, phoneNumber, operatingHoursOfTheWeek} = restaurantInfo

  return (
    <div>
        {/* If no page is true, redirect user to error page */}
        {noPage && <Navigate replace to="../notexist"/>}
        <CssBaseline />
        <div ref={headerRef}>
        <Header  />
        </div>
        <main ref={mainRef}>
        {/* Displays header image with page title */}
        {!location &&
        <Typography align="center" sx={{ alignItems: "center", justifyContent: "center", paddingBottom: 10}}>
                <div>
                    <img src={loading} alt='Loading...' />
                    <br />
                    <h2>Getting your location...</h2> 
                </div>
        </Typography>}
        {location && <div>
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
                                loading="loading..."
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
                         <Rating name="rating" value={overallRating || 0} precision={0.5} readOnly />
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
                    {console.log(allReviews)}
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
        <ToastContainer 
            autoClose={3000}
        />
        </div>}
        </main>
        <Footer />
    </div>
  )
}