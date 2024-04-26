import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./medicalCSS/SideNavigation.css"; // Import the CSS file
const SideNavigation = () => {
  return (
    <div className="side-navigation">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;