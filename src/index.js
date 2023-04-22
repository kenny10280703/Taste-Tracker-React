import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import RestaurantList from './pages/RestaurantList';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/map",
    element: <MapPage />
  },
  {
    path: "/restaurants",
    element: <RestaurantList />
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetailPage />
  },
  {
    path: "/login",
    element: <div>Login page</div>
  },
  {
    path: "/signup",
    element: <div>Sign up page</div>
  }])
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
