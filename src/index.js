import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home'
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ResetPassword from './pages/ResetPassword';
import theme from './theme';
import {
  BrowserRouter,
  Route, 
  Routes,
} from "react-router-dom";
import { AppContextProvider } from './AppContext';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));

/* 
  AppContext as a React Context to allow access/modification of user object, toke, login function and logoit function
*/
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                    <Route path="/login" element={ <Login />}  />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                </Routes>
        </BrowserRouter>
        </AppContextProvider>
    </ThemeProvider>
);
