import React, { Component } from 'react'
import Header from "../components/header/Header"
import PageBody from '../components/pageBody/PageBody'
import Map from '../components/map/Map'
import { Link } from 'react-router-dom'

export default function MapPage (){
  
  return (
    <div>
        <Header />
        <PageBody />
        <button><Link to={`../restaurants`}>To list page</Link></button>
        <Map />
    </div>
  )
}
