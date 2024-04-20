// src/components/HomePage.js
import React from 'react';
import { Link } from "react-router-dom";
import './user_management_CSS/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page"id="home-section">
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
                <li className="nav-item">
                <Link to="/loginchoice" className="nav-link"> Sign In</Link>
                </li>
                <li className="nav-item">
                <Link to="/registrationchoice" className="nav-link">Sign Up</Link>
                </li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Elder Care System</h1>
          <p>Providing compassionate care for your loved ones.</p>
        </div>
      </section>

      <section className="main-content">
        <h2>Our Services</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          augue id mi tincidunt, vitae aliquet orci fringilla.
        </p>

        <h2>About Us</h2>
        <p>
          Vestibulum auctor metus et ante malesuada, vel fermentum augue
          aliquet. Nullam sit amet erat a velit commodo luctus.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Elder Care System</p>
      </footer>
    </div>
  );
};

export default HomePage;
