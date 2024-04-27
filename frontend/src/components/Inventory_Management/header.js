import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-bg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Inventory Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Items Catalog
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/inventory/" className="dropdown-item">Medical Items Catalog</Link></li>
                                {/* Use Link component to navigate to Event Inventory List page */}
                                <li><Link to="/eventinventory/" className="dropdown-item">Event Items Catalog</Link></li>
                            
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">View Medical Item Report</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">User Account</a>
                        </li>
                        
                    </ul>
                </div>
            </div>  
        </nav>
    );
}

export default Header;
