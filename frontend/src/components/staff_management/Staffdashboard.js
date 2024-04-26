import React from 'react';
import { Link } from 'react-router-dom';
import './staffCss/staffmanagerdashboard.css';

const StaffDashboard = () => {
    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Staff Financial Manager</h3>
                    <button className="btn btn-profile">
                        <Link to="/staffprofile" className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/staff" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/getallpayrolls" className="nav-link-staffdb">
                                All Paysheets
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/getallstaff" className="nav-link-staffdb">
                            Staff Directory
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addPayInFo" className="nav-link-staffdb">
                                Add Pay Details
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AllPayInfo" className="nav-link-staffdb">
                                All Payment Information
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

            {/* Main content area */}
            <div className="main-content">
                <div className="container-fluid">
                    <div className="content-wrapper">
                        {/* Top right text "Leisure Home" */}
                        <div className="top-right-text">
                            <h2>Leisure Home</h2>
                            {/* Paragraph "Human Care Center" below the top right text */}
                            
                            <p>Human Care Center</p>
                        </div>

                        {/* Horizontal line */}
                        <hr />

                        {/* Add other content such as tasks or notifications for the staff here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
