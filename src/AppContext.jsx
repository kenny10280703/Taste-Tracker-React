import React from 'react';


export const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [userObj, setUser] = React.useState();
  const [token, setToken] = React.useState();
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

  const login = (userObj, token) => {
    setUser(userObj);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AppContext.Provider value={{ userObj, token, login, logout, filterData, updateFilter }}>
      {props.children}
    </AppContext.Provider>
  );
};
