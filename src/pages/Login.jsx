import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { AppContext } from '../AppContext'
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, CssBaseline, Container, Typography, Card, Box, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyContainer, MySlogan } from '../styles.js'
import { Navigate } from 'react-router-dom';

export default function Login() {
    const { userObj, token, login } = React.useContext(AppContext)
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    })
    const [status, setStatus] = React.useState({
      sucess: false,
      message: ""
    })

    /* this gets the height of the header and footer an subtracts it from the total height of the 
    viewport so the footer is positioned at the bottom of the page */
    const mainRef = React.useRef(null);
    const headerRef = React.useRef(null);
    const theme = createTheme();

    React.useEffect(() => {
        const handleResize = () => {
        mainRef.current.style.minHeight = `calc(100vh - ${headerRef.current.clientHeight + document.querySelector('footer').clientHeight}px)`;
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("http://localhost:9090/food_finder/users/login", 
            {
                headers: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            if (res.status === 200) {
                const { userObj, token} = await res.json()
                login(userObj, token)
                console.log(userObj)
                console.log(token)
            } else {
                const { message } = res.json
                setStatus({
                  success: false,
                  message: message
                })
            }
        } catch(error) {
            setStatus({
              success: false,
              message: error.message
            })
        }
    }
  return (
    <div>
      {userObj && <Navigate replace to="/"/>}
        <CssBaseline />
      <div ref={headerRef}>
      <Header  />
      </div>
      <Box>

      <main ref={mainRef}>
        <MyContainer maxWidth='sm' >
          <Card> 
            <MySlogan align='center' sx={{ top: '15vh' }}>
              Login
            </MySlogan>
            <Box sx={{ position: 'relative' }}>
              <CardMedia 
                component="img"
                sx={{ height: '30vh', filter: 'brightness(35%)' }}
                image="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="random"
              /> 
            </Box>
          </Card>
        </MyContainer>
        <Container>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    autoComplete="username"
                    onChange={handleChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={formData.password}
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Box sx={{color: 'red'}}>{status.message}</Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onSubmit={handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/resetpassword" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Container>
        </main>
      </Box>
        <Footer />
    </div>
  )
}
