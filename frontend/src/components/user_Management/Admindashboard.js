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
  const [showUserDistribution, setShowUserDistribution] = useState(false); 

  const handleUserDistributionClick = () => {
    // Set the state to true to show the user distribution
    setShowUserDistribution(true);
  }


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
      axios.get('http://localhost:8070/staff/admin/:nic', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // If the user is an admin, stay on the admin dashboard
        console.log('Admin logged in:', response.data);
        handleUserDistributionClick();
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
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Admin</h3>
                    <button className="btn btn-profile">
                        <Link to={`/staffprofile/${nic}`} className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                        <Link className="nav-link-staffdb" onClick={handleUserDistributionClick}>
                           User Distribution
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link-staffdb">
                               Registered Elders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addstaff" className="nav-link-staffdb">
                            Staff Registration
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/registrationtrend" className="nav-link-staffdb">
                            Registration Trends
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
          <hr className="full-width-line" />
          {/* Add other content such as tasks or notifications for the staff here */}

          {/* Render User Distribution chart if state is true */}
          {showUserDistribution && (
            <div className="user-distribution-container">
              <LoginPieChart />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default Admindashboard;
