import React from 'react';


/**
 * Context for App to allow different components to access and modify the data (works like a global variable)
 * @type {React.Context}
 */
export const AppContext = React.createContext();

/**
 * Provider for AppContext
 * @param {Object} props - Props for AppContextProvider component
 * @param {React.ReactNode} props.children - Child components to be rendered within the context
 * @returns {JSX.Element} - Returns JSX element for AppContext.Provider
 */
export const AppContextProvider = (props) => {
  // The react state userObj get the userJSON from local storage and convert to an object, 
  // contain null instead if it is not available
  const [userObj, setUserObj] = React.useState(JSON.parse(localStorage.getItem("userJSON")) || null)
  // The react state token get the token from local storage, contain null instead if it is not available
  const [token, setToken] = React.useState(localStorage.getItem("token") || null)
  // contain the filter in home page, allow map and list component to get filter
  const [filterData, setFilterData] = React.useState({
    cuisine: "Any cuisine"
  })

  /**
   * useEffect hook to listen for changes in localStorage
   */
  React.useEffect(() => {
    const handleStorageChange = () => {
      setUserObj(JSON.parse(localStorage.getItem("userJSON")))
      setToken(localStorage.getItem("token"))
      console.log(userObj)
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

   /**
   * Update filter data
   * @param {string} name - Name of the filter to be updated
   * @param {*} value - Value to update the filter with
   */
  const updateFilter = (name, value) => {
    setFilterData(prevFilterData => {
      return {
        ...prevFilterData,
        [name]: value
      }
    })
  }

  /**
   * Function oo login user, will store the user object and token received from backend,
   * and then store in local storage
   * @param {Object} userObj - User object to be stored in localStorage
   * @param {string} token - Token to be stored in localStorage
   */
  const login = (userObj, token) => {
    localStorage.setItem("userJSON", JSON.stringify(userObj))
    localStorage.setItem("token", token)
    window.dispatchEvent(new Event("storage"))
  };

  /**
   * Function to logout user, will submit the stored token to backend to allow backend to blacklist the used token.
   * If successful, will clear the user object and token from local storage.
   */
  const logout = async() => {
    try{
      const res = await fetch("http://localhost:9090/food_finder/users/logout", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({token: token})
      })
      if (res.status === 200) {
        localStorage.removeItem("userJSON")
        localStorage.removeItem("token")
        window.dispatchEvent(new Event("storage"))
      } else {
        alert("Error connecting with server, please try again")
      }
    } catch(error) {
      alert(`Error connecting with server due to ${error.message}, please try again`)
    }
  }

  const baseURL = "http://localhost:9090"

  return (
    <AppContext.Provider value={{ userObj, token, login, logout, filterData, updateFilter, baseURL }}>
      {props.children}
    </AppContext.Provider>
  );
};
