import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './user_management_CSS/Guardianlogin.css';

const Login = () => {
  const [formData, setFormData] = useState({
    nic: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8070/customerA/login', formData);
      console.log('Login successful:', response); // Log the entire response object
      localStorage.setItem('token', response.data.token);
  
      // Redirect to the profile page with email as a parameter
      navigate(`/elderprofile/${formData.nic}`); // Changed formData.nic to formData.email
    } catch (error) {
      setError('Invalid nic or password. Please try again.'); // Updated error message
      console.error('Login Error:', error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" id="login-section">
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
      <div className="page-wrapper"></div>
      <div className="container-login">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-container">
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  NIC:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNIC"
                  name="nic"
                  onChange={(e) => handleChange("nic", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
  
              {error && <p className="text-danger">{error}</p>}
  
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            
          </form>
          <div className="form-footer"></div>
      <div className="vertical-line"></div>
        </div>
        <div></div>
        <div className="dont-have-account">
          <p>Don't have an account? </p>
            
          <Link to="/signup" className="signup-button">Sign Up Here</Link>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
