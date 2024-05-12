import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'

function Nav(){
  return (
    <div>
      <ul className="home-ul">
        <li className="home-11">
            <Link to ="/mainhome" className="active home-a">
            <h1>Home</h1>
            </Link>
        </li>
        <li className="home-li">
        <Link to ="/addEvent" className="active home-a">
            <h1>Add Event</h1>
            </Link>
        </li>
        <li className="home-11">
        <Link to ="/eventDetails" className="active home-a">
            <h1>Event Details</h1>   
            </Link> 
        </li>    
        <li className="home-11">
        <Link to ="/totalCost" className="active home-a">
            <h1>Total Cost</h1>   
            </Link> 
        </li>  
      </ul>
    </div>
  )
}

export default Nav;
