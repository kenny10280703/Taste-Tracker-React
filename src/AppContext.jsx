import React from 'react';


export const AppContext = React.createContext();
// Use React Context to allow easy access of filter, user object, token, login and logout function from different components
export const AppContextProvider = (props) => {
  // userObj contains the user object, which contains the username property
  const [userObj, setUserObj] = React.useState(JSON.parse(localStorage.getItem("userJSON")) || null)
  const [token, setToken] = React.useState(localStorage.getItem("token") || null)
  const [filterData, setFilterData] = React.useState({
    cuisine: "Any cuisine"
  })

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

  const updateFilter = (name, value) => {
    setFilterData(prevFilterData => {
      return {
        ...prevFilterData,
        [name]: value
      }
    })
  }

  const login = (userObj, token) => {
    localStorage.setItem("userJSON", JSON.stringify(userObj))
    localStorage.setItem("token", token)
    window.dispatchEvent(new Event("storage"))
  };

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

  return (
    <AppContext.Provider value={{ userObj, token, login, logout, filterData, updateFilter }}>
      {props.children}
    </AppContext.Provider>
  );
};
