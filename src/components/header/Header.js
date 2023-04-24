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
      let sumbitData = await fetch("https://2d694b78-e6ad-4498-bd95-f5bb64a477d2.mock.pstmn.io/post",
        {
          method: "POST",
          body: JSON.stringify({searchKeyword: searchKeyword})
        }
      )
      console.log(sumbitData)
      let dataJson = await sumbitData.json();
      if (sumbitData.status === 200) {
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
        <div>
          <button><Link to={`../login`}>Login</Link></button>
          <button><Link to={`../signup`}>Signup</Link></button>
        </div>
    </div>
  )
}

