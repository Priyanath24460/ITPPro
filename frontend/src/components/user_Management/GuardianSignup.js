import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user_management_CSS/signup.css';

const Guardiansignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    contactnumber: '',
    email: '',
    password: '',
    role: 'guardian' // Set the default role to 'guardian'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/guardian/addguardian', formData);
      setFormData({
        name: '',
        nic: '',
        contactnumber: '',
        email: '',
        password: '',
        role: 'guardian' // Reset role to 'guardian' after submission
      });
      alert('Guardian registered successfully!');
      navigate('/guardianlogin');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration error. Please try again.');
    }
  };

  return (
    <div className="container-register">
      <div className="registration-form">
      <div className="heading-container">
        <h2>Guardian Registration</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="nic" className="form-label">NIC</label>
            <input type="text" className="form-control" id="nic" name="nic" value={formData.nic} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="contactnumber" className="form-label">Contact Number</label>
            <input type="text" className="form-control" id="contactnumber" name="contactnumber" value={formData.contactnumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          {/* Add a hidden input field for the role */}
          <input type="hidden" name="role" value={formData.role} />
          <div className="register-container">
          <button type="submit" className="register">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Guardiansignup;