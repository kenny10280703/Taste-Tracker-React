import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home'
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import theme from './theme';
import NoPage from './pages/NoPage';
import {
  BrowserRouter,
  Route, 
  Routes,
} from "react-router-dom";
import { AppContextProvider } from './AppContext';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Use React Router DOM to render components based on url.
 * Added ToastContainer to make sure the toast could be shown in every page
 * Added AppContextProvider to make sure all components can access data inside the AppContext
 */

root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
        <ToastContainer 
          autoClose={3000}
        />
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                    <Route path="/login" element={ <Login />}  />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
        </BrowserRouter>
        </AppContextProvider>
    </ThemeProvider>
);
