import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './user_management_CSS/ElderProfile.css';

const ElderProfile = () => {
  const { nic } = useParams(); // Extracting NIC from URL params
  const [user, setUser] = useState({}); // State to store user details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate(); // Navigation function

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token from localStorage
    navigate('/login'); // Navigate to the logout route
  };

  // Function to handle update
  const handleUpdate = () => {
    navigate(`/update/${nic}`); // Navigate to the Update page with the NIC parameter
  };
  
  // Check authentication status before rendering
  useLayoutEffect(() => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    if (!token) {
      // If token does not exist, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user details on component mount
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        console.log('Fetching user details for NIC:', nic);
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(`http://localhost:8070/customerA/elderprofile/${nic}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include JWT token in the request header
          }
        });
        setUser(response.data.user); // Set user details in state
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Unauthorized - redirect to login page
          navigate('/login');
        } else {
          setError('Error fetching user details. Please try again.');
          console.error('Profile Error:', error.response?.data?.error || error.message);
        }
      } finally {
        setLoading(false); // Update loading status
      }
    }

    fetchUserDetails(); // Call fetchUserDetails function
  }, [nic, navigate]); // Dependency array with 'nic' and 'navigate'

  return (
    <div className="signup-page" id="signup-section">
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
          <>
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
                  <td><strong>District:</strong></td>
                  <td>{user.district}</td>
                </tr>
              </tbody>
            </table>
            <div className="btn-group">
              <button className="btn btn-update" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default ElderProfile;
