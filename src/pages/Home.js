import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header/Header'

export default function Home() {
    const footer = <div>
        <button><Link to={`map`}>To map page</Link></button>
    </div>
  return (
    <div>
      <Header />
        <h1>What's for dinner?</h1> 
        {footer}
    </div>
  )
}

