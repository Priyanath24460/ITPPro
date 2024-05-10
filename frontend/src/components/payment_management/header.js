import React from "react";
import { Link } from "react-router-dom";


function HeaderPay(){

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{color:"red"}}>Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User Details
                            </a>
                            <ul className="dropdown-menu">
                                <li>< Link to = '/addCardDetaiils' className="dropdown-item">Account Details</Link></li>
                                <li>< Link to = '/addn' className="dropdown-item" >Place Payment</Link></li>
                                <li>< Link to = '/addcost' className="dropdown-item" >Add Monthly Cost</Link></li>
                                <li>< Link to = '/n' className="dropdown-item" >Payment Details</Link></li>
                                
                            </ul>
                        </li>
                       
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export default HeaderPay;
