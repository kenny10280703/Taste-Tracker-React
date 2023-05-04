import React from 'react';


export const AppContext = React.createContext();



// Use React Context to allow easy access of filter, user object, token, login and logout function from different components
export const AppContextProvider = (props) => {
  // userObj contains the user object, which contains the username property
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
