import React from 'react';
import { Link } from 'react-router-dom';
import './roomCss/dashboard.css';

const RoomDashboard = () => {
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
                            <Link to="/roomHome" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addRoom" className="nav-link-staffdb">
                                Add room
                            </Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link to="/allAssignments" className="nav-link-staffdb">
                                Room Allocation
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

export default RoomDashboard;
