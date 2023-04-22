import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  const [searchKeyword, setsearchKeyword] = useState("")
  const [message, setMessage] = useState("")
  function handleChange(event) {
    setsearchKeyword(event.target.value)
  }
  let handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let sumbitData = await fetch("localhost:3000/",
        {
          method: "POST",
          body: JSON.stringify({searchKeyword: searchKeyword})
        }
      )
      let dataJson = await sumbitData.json();
      if (sumbitData.json === 200) {
        setsearchKeyword("")
      } else {
        setsearchKeyword("")
        setMessage("An error occured, please try later.")
      }
    } catch(error) {
      console.log("Error")
      setMessage("An error occured, please try later.")
      setsearchKeyword("")
    }
    console.log(message)
  }
  return (
    <div className="header">
        <Link to={`../`}><h1>Food Finder</h1></Link>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={searchKeyword} 
            placeholder="Search..." 
            onChange={handleChange}>
          </input>
          <button>Search</button>
          <div className='errorMessage'> {message ? <p>{message}</p> : null} </div>
        </form>
    </div>
  )
}

