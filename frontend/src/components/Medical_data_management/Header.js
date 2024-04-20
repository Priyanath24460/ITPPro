import React from "react";
import {Link} from 'react-router-dom';

function Header(){
    return(

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" style={{color:"red"}} href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/get" className="nav-link">medical</Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className="nav-link">Add</Link>
        </li>
        <li className="nav-item">
          <Link to="/medicine" className="nav-link">Medicine</Link>
        </li>
        
      
      </ul>
    </div>
  </div>
</nav>

    )
}

export default Header;