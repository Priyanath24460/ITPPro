import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './user_management_CSS/Guardianlogin.css';

const Stafflogin = () => {
  const [formData, setFormData] = useState({
    email: '',
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
      const { email, password } = formData; // Destructure email and password from formData
      // Check if email and password are provided
      if (!email || !password) {
        setError('Email and password are required.');
        setLoading(false);
        return;
      }
  
      const response = await axios.post('http://localhost:8070/staff/stafflogin', formData);
      console.log('Login successful:', response); // Log the entire response object
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage:', localStorage.getItem('token'));
  
      // Decode the token and access the role from the decoded token payload
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log('Role:', role); // Log the role extracted from the token
  
      // Redirect based on role
switch (role) {
  case 'Admin':
    navigate('/admin');
    break;
  case 'Meal Manager':
    navigate('/financial-manager-dashboard');
    break;
  case 'Medical Manager':
    navigate('/get');
    break;
  default:
    navigate('/default'); // Redirect to a default page if role is not recognized
    break;
}
    } catch (error) {
      setError('Invalid email or password. Please try again.');
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
      <div className="page-wrapper">
        <div className="container-login">
          <div className="login-form">
            <h1>Staff Login</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-container">
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
                    onChange={(e) => handleChange("email", e.target.value)}
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
          <div className="dont-have-account">
            <p>Don't have an account? </p>
            <Link to="/staff-signup" className="signup-button">Sign Up Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stafflogin;
