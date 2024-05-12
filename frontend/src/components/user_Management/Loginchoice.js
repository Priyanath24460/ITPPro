import React from 'react';
import { Link } from 'react-router-dom';
import './user_management_CSS/Loginchoice.css';

const Loginchoice = () => {
  return (
    <>
      {/* Header Component */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">Leisure Home</div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home" className="nav-link"> Home</Link>
            </li>
            <li className="nav-item">Services</li>
            <li className="nav-item">About Us</li>
            <li className="nav-item">Contact</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="page-wrapper"> 
        <div className="container-loginchoice">
          <h1>Welcome to Elderly Care Home</h1>
          <div className="login-options">
            <div className="login-option">
              <Link to="/guardianlogin" className="btn btn-primary">
                Login as Guardian
              </Link>
            </div>
            <div className="login-option">
              <Link to="/login" className="btn btn-primary">
                Login as Elder
              </Link>
            </div>
            <div className="login-option">
              <Link to="/stafflogin" className="btn btn-primary">
                Login as Staff Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginchoice;
