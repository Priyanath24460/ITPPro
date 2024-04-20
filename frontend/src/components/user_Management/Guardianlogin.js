import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Guardianlogin = () => {
  const [formData, setFormData] = useState({
    email: '', // Changed nic to email
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
      const response = await axios.post('http://localhost:8070/guardian/guardianlogin', formData);
      console.log('Login successful:', response); // Log the entire response object
      localStorage.setItem('token', response.data.token);
  
      // Redirect to the profile page with email as a parameter
      navigate(`/guardianprofile/${formData.email}`); // Changed formData.nic to formData.email
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Updated error message
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
      <div className="container">
        <h1>Guardian Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label"> {/* Changed inputNIC to inputEmail */}
              Email:
            </label>
            <input
              type="email" // Changed input type to email
              className="form-control"
              id="inputEmail"
              name="email" // Changed name to email
              onChange={(e) => handleChange("email", e.target.value)} // Changed handleChange parameter from "nic" to "email"
              required
              disabled={loading} // Disable input during loading
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
              disabled={loading} // Disable input during loading
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Don't have an account? <Link to="/guardiansignup">Sign Up Here</Link></p>
      </div>
    </div>
  );
};

export default Guardianlogin;
