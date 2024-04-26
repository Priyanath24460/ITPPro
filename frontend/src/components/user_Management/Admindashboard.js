import React, { useState ,useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './user_management_CSS/Admindashboard.css';
import { jwtDecode } from 'jwt-decode';
import LoginPieChart from './Loginchart.js'; // Import the LoginPieChart component

const Admindashboard = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Extract 'email' parameter from URL
  const { nic } = useParams();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/stafflogin');
    } else {
      // Decode the token
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Log the decoded token

      // Access the role from the decoded token
      const role = decodedToken.role;
      console.log('Role:', role); // Log the role extracted from the token

      // Make a request to the backend to check if the user is an admin
      axios.get('http://localhost:8070/staff/admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // If the user is an admin, stay on the admin dashboard
        console.log('Admin logged in:', response.data);
        // You can check if the response contains the expected message
        if (response.data.message === 'Welcome to the Admin Dashboard') {
          // User is an admin, no need to navigate
        } else {
          // If the user is not an admin, navigate them back to the staff dashboard
          navigate('/staff-dashboard');
        }
      })
      .catch(error => {
        // If there's an error or the user is not an admin, navigate them back to the staff dashboard
        console.error('Error or user not authenticated as admin:', error.response.data.message);
        navigate('/staff-dashboard');
      });
    }
  }, [navigate]);

  useEffect(() => {
    axios.get(`http://localhost:8070/admin/nic/${email}`)
      .then(response => {
        const adminNic = response.data.nic;
        console.log('Admin NIC:', adminNic);
        // Now you can use the admin NIC for further processing
      })
      .catch(error => {
        console.error('Error fetching admin NIC:', error);
      });
  }, [email]); 

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/stafflogin');
  };

  return (
    <div className='Main'>
      {/* Sidebar */}
      <nav className="sidebar">
      <div className="sidebar-brand">Admin Dashboard</div>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              All Elders
            </Link>
          </li>
          <li className="nav-item">
          <Link to={`/staffprofile/${nic}`} className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/stafflogin" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-staff" className="nav-link">
              Add Staff
            </Link>
          </li>
        </ul>
      </div>
    </nav>

      {/* Main content area */}
      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* Increase the size of Product Distribution chart */}
            <div className="col-md-12"> {/* Modified the column size to take the full width */}
              <div className="chart-placeholder">
                <h2>Product Distribution</h2>
                {/* Display the LoginPieChart component here */}
                <LoginPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
