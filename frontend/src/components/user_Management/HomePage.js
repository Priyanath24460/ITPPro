import React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './user_management_CSS/HomePage.css';

import image1 from '../../image1.jpg';
import image2 from '../../image2.jpg';
import image3 from '../../image3.jpg';
import logo from '../../ourLogo.png'

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  
  };

  return (
    <div className="home-page" id="home-section">
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
              <Link to="/loginchoice" > Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/registrationchoice" >Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>

      

      <section className="hero-section">
  <div className="hero-content">
    <img src={logo} alt="Home Logo" className="home-logo" />
    <h1>Welcome to Our Elder Care System</h1>
    <p>Providing compassionate care for your loved ones.</p>
  </div>
</section>

      <Slider {...settings}>
        <div>
          <img src={image1} alt="Slide 1" className="slider-image" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="slider-image" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="slider-image" />
        </div>
      </Slider>

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
