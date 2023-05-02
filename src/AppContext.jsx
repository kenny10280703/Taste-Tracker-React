import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = React.useState("User");
  const [token, setToken] = React.useState(null);
  const [filterData, setFilterData] = React.useState({
    cuisine: "Any cuisine"
  })
  const updateFilter = (name, value) => {
    setFilterData(prevFilterData => {
      return {
        ...prevFilterData,
        [name]: value
      }
    })
  }

  const login = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AppContext.Provider value={{ user, token, login, logout, filterData, updateFilter }}>
      {props.children}
    </AppContext.Provider>
  );
};
