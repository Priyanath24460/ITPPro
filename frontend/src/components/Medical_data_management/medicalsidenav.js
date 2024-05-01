import React from 'react';
import { Link } from 'react-router-dom';
import './medicalCSS/medicalsidenav.css';

const medicalsidenav = () => {
    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Medical Data Manager</h3>
                    <button className="btn btn-profile">
                        <Link to="#" className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/get" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                       
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <button className="btn btn-logout" onClick={handleLogout}>
                        <Link to="#" className="logout-link">Logout</Link>
                    </button>
                </div>
            </nav>

           
        </div>
    );
};

export default medicalsidenav;
