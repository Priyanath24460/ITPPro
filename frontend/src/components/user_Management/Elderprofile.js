import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './user_management_CSS/ElderProfile.css';

const ElderProfile = () => {
  const { nic } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token from localStorage
    navigate('/login'); // Navigate to the logout route
  };
  
  

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token does not exist, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        console.log('Fetching user details for NIC:', nic);
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(`http://localhost:8070/customerA/elderprofile/${nic}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Unauthorized - redirect to login page
          navigate('/login');
        } else {
          setError('Error fetching user details. Please try again.');
          console.error('Profile Error:', error.response?.data?.error || error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [nic, navigate]);

  return (
    <div lassName="signup-page"id="signup-section">
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
    <div>
      <h1>User Details</h1>
      {user ? (
        <table>
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td><strong>NIC:</strong></td>
              <td>{user.nic}</td>
            </tr>
            <tr>
              <td><strong>Age:</strong></td>
              <td>{user.age}</td>
            </tr>
            <tr>
              <td><strong>Birthdate:</strong></td>
              <td>{user.birthdate}</td>
            </tr>
            <tr>
              <td><strong>Gender:</strong></td>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td><strong>Contact Number:</strong></td>
              <td>{user.contactnumber}</td>
            </tr>
            <tr>
              <td><strong>Guardian's Name:</strong></td>
              <td>{user.gname}</td>
            </tr>
            <tr>
              <td><strong>Guardian's NIC:</strong></td>
              <td>{user.gnic}</td>
            </tr>
            <tr>
              <td><strong>Guardian's Contact Number:</strong></td>
              <td>{user.gcontactnumber}</td>
            </tr>
            <tr>
              <td><strong>Guardian's Address:</strong></td>
              <td>{user.gaddress}</td>
            </tr>
            <tr>
              <td><strong>Password:</strong></td>
              <td>{user.password}</td>
            </tr>
          </tbody>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </table>
      ) : (
        <p>User not found.</p>
      )}
    </div>
    </div>
  );
};

export default ElderProfile;
