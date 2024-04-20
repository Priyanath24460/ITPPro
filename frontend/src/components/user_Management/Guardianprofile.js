import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Guardianprofile = () => {
  const { email } = useParams(); // Use 'email' instead of 'nic'
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/guardianlogin');
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/guardianlogin');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        console.log('Fetching user details for email:', email); // Log email, not NIC
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8070/guardian/guardianprofile/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/guardianlogin');
        } else {
          setError('Error fetching user details. Please try again.');
          console.error('Profile Error:', error.response?.data?.error || error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [email, navigate]);

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
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>NIC:</strong></td>
                <td>{user.nic}</td>
              </tr>
              <tr>
                <td><strong>Contact Number:</strong></td>
                <td>{user.contactnumber}</td>
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

export default Guardianprofile;
