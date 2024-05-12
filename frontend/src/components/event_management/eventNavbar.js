import React from 'react';
import { Link } from 'react-router-dom';
import './eventNavbar.css';

const medicalsidenav = () => {
    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Event and Reservation Coordinator</h3>
                    <button className="btn btn-profile">
                        <Link to="/staffprofile" className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/Home" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                       
                    </ul>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/addEvent" className="nav-link-staffdb">
                            Add Event
                            </Link>
                        </li>
                       
                    </ul>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/eventDetails" className="nav-link-staffdb">
                            Event Details
                            </Link>
                        </li>
                       
                    </ul>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/totalCost" className="nav-link-staffdb">
                            Total Cost
                            </Link>
                        </li>
                       
                    </ul>
                </div>


                <div className="sidebar-footer">
                    <button className="btn btn-logout" onClick={handleLogout}>
                        <Link to="/stafflogin" className="logout-link">Logout</Link>
                    </button>
                </div>
            </nav>

           
        </div>
    );
};

export default medicalsidenav;
