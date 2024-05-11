import React from 'react';
import { Link } from 'react-router-dom';
import './inventorydashboard.css';

const InventoryDashboard = () => {
    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Inventory Manager</h3>
                    <button className="btn btn-profile">
                        <Link to="#" className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="#" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/inventory/" className="nav-link-staffdb">
                                Medical Catalog
                            </Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link to="/eventinventory/" className="nav-link-staffdb">
                                Event Catalog
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/history/" className="nav-link-staffdb">
                                View history
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

export default InventoryDashboard;