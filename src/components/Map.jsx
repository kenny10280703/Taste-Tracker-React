import React from 'react'
import Marker from './marker/Marker'
import GoogleMapReact from 'google-map-react';
import { AppContext } from '../AppContext';

export default function Map() {
    const [centre, setCentre] = React.useState()
    const zoom = 17
    const [allRestaurants, setAllRestaurants] = React.useState([])
    const { filterData } = React.useContext(AppContext)
    
    React.useEffect(() => {
        getLocation()
      }, [])
    
    // make sure that only make API call when user's current location is available
    React.useEffect(() => {
    if(centre){
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
    navigator.geolocation.getCurrentPosition(
        function(position) {
            setCentre([position.coords.latitude, position.coords.longitude])
        }, 
        function(error) {
            console.log(error)
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
        console.log(allRestaurants)
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

    return (
        <div>
            <div style={{ height: '75vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    center={centre}
                    zoom={zoom}
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
