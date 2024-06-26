import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/home" className="nav-link"> Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/" className="nav-link"> AllCustomers</Link>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <Link to="/add" className="nav-link"> Signup</Link>
                </li>
                <li className="nav-item">
                <Link to="/login" className="nav-link"> Login</Link>
                </li>
                <li className="nav-item">
                <Link to="#" className="nav-link"> Log Out</Link>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default Header;