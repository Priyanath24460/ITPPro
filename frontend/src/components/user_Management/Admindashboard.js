import React, { useEffect } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import './user_management_CSS/Admindashboard.css';
import { jwtDecode } from 'jwt-decode';

const Admindashboard = () => {
  const navigate = useNavigate();

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
      axios.get('http://localhost:8070/staff/admindashboard', {
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
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content area */}
      <div className="main-content">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mt-4">Dashboard</h1>
            <div className="profile-button ml-auto">
              <Link to="/admin/profile" className="btn btn-primary">
                Profile
              </Link>
              <button className="btn btn-danger ml-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="chart-placeholder">
                <h2>Sales Chart</h2>
                <div>Placeholder for Sales Chart</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chart-placeholder">
                <h2>Product Distribution</h2>
                <div>Placeholder for Product Distribution Chart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
