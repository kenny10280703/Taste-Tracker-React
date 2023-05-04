import React from 'react'
import Marker from './Marker'
import GoogleMapReact from 'google-map-react';
import { AppContext } from '../AppContext';
import loading from '../image/loading.gif'
import { Typography } from '@mui/material'

export default function Map() {
    const [centre, setCentre] = React.useState()
    const zoom = 17
    const [allRestaurants, setAllRestaurants] = React.useState([])
    const { filterData } = React.useContext(AppContext)
    const [loaded, setLoaded] = React.useState(false)
    const hoverDistance = 35
    
    React.useEffect(() => {
        getLocation()
      }, [])
    
    // make sure that only make API call when user's current location is available
    React.useEffect(() => {
    if(centre){
        setLoaded(true)
        getRestaurants()
    }
    }, [centre])

    React.useEffect(() => {
        updateRestaurantsShown()
        console.log(allRestaurants)
      }, [filterData])

   const updateRestaurantsShown = () => {
        setAllRestaurants(prevState => {
          return prevState.map(state => {
            if (filterData.cuisine != "Any cuisine" && !(state.cuisine === filterData.cuisine)) {
              return {
                ...state,
                filtered: true
              }
            } else {
                return {
                ...state,
                filtered: false
              }
            }
            }
          )
        })
      }
    
    
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( position => {
            setCentre([position.coords.latitude, position.coords.longitude])
        }, error => {
            // show dialog box to user and then refresh the page when user closed the box
            if(!alert('Please allow the web browser to access your location!')){window.location.reload()}
        }
        )
    }

    const getRestaurants = async() => {
    try{
        console.log(JSON.stringify({lat: centre[0], lng: centre[1]}))
        const res = await fetch("http://localhost:9090/food_finder/restaurants", 
        {
            headers: {
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({lat: centre[0], lng: centre[1]})
        }
        )
        setAllRestaurants(await res.json())
        setAllRestaurants(prevState => {
            return prevState.map(restaurant => {
                const imageLinkArray = restaurant.imageLink.split(",")
                console.log(imageLinkArray)
                return {
                    ...restaurant,
                    imageLink: imageLinkArray
                }
            })
        })
    } catch(error) {
        console.log("error")
    }
    }

    function toggle(id) {
    setAllRestaurants(prevState => {
        return prevState.map(state => {
        return state.id === id ? {...state, show: true} : {...state, show: false}
        })
    })
    }

    const close = (event) => {
        event.stopPropagation()
        setAllRestaurants(prevState => {
            return prevState.map(state => {
            return {...state, show: false}
            })
        })
    }

    return (
        <div>
            <div style={{ height: '75vh', width: '100%' }}>
                <Typography align="center" sx={{ alignItems: "center", justifyContent: "center" }}>
                    {!loaded && 
                    <div>
                        <img src={loading} alt='Loading...' />
                        <br />
                       <h2>Getting your location...</h2> 
                    </div>
                    }
                </Typography>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    center={centre}
                    zoom={zoom}
                    hoverDistance={hoverDistance}
                >
                {allRestaurants.map( restaurant => {
                    if (!restaurant.filtered) {
                        return (
                            <Marker
                            key={restaurant.id}   
                            lat={restaurant.latitude}
                            lng={restaurant.longitude}
                            restaurantInfo={restaurant}
                            show={restaurant.show}
                            toggle={()=> toggle(restaurant.id)}
                            close={close}
                            />
                        )
                    }
                }
                )}
                </GoogleMapReact>
            </div>
        </div>
    )
}
