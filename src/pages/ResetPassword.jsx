import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { AppContext } from '../AppContext'
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, CssBaseline, Container, Typography, Card, Box, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyContainer, MySlogan } from '../styles.js'
import { Navigate } from 'react-router-dom';

export default function ResetPassword() {
    const [formData, setFormData] = React.useState({
        email: ""
    })
    const [status, setStatus] = React.useState({
        success: false,
        message: ""
    })
    const mainRef = React.useRef(null);
    const headerRef = React.useRef(null);
    const theme = createTheme();
    const { userObj } = React.useContext(AppContext)

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
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        setStatus({
            success: false,
            message: ""
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("http://localhost:9090/", 
            {
                headers: {
                    "Content-Type": "application/json"
                  },
                  method: "POST",
                  body: JSON.stringify({
                    email: formData.email
                  })
            }) 
            if (res.status === 200) {
                alert("You will receive a password reset email if the email you submited is a valid one")
            } else {
                const { message } = await res.json()
                setStatus({
                    success: false,
                    message: message
                })
            }
        } catch (error) {
            setStatus({
                success: false,
                message: error.message
            })
        }
    }

  return (
    <div>
      {userObj && <Navigate replace to="/"/>}
      {status.success && <Navigate replace to="/login"/>}
    <CssBaseline />
      <div ref={headerRef}>
      <Header  />
      </div>
      <Box>
      <main ref={mainRef}>
        <MyContainer maxWidth='sm' >
          <Card> 
            <MySlogan align='center' sx={{ top: '15vh' }}>
              Reset Password
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
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    autoComplete="email"
                    onChange={handleChange}
                    autoFocus
                  />
                  <Box sx={{color: 'red'}}>{status.message}</Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onSubmit={handleSubmit}
                  >
                    Send password reset email
                  </Button>
                  <Grid container>
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
