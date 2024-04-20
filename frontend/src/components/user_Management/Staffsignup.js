import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StaffSignup() {
  const [formData, setFormData] = useState({
    // Staff's Details
    name: "",
    nic: "",
    contactnumber: "",
    email: "",
    password: "",
    role: "", // Default role is "Staff"

    // Login details
    confirmpassword: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [validationErrors, setValidationErrors] = useState([]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    // Check if password and confirm password match
    if (formData.password !== formData.confirmpassword) {
      setValidationErrors(["Password and Confirm Password must match."]);
      return; // Stop form submission if passwords don't match
    }
  
    try {
      // Send details to the backend without hashing the password
      await axios.post("http://localhost:8070/staff/addstaff", formData);
      alert("Staff added successfully");
      setValidationErrors([]); // Clear previous validation errors on successful submission
    } catch (error) {
      alert("Signup Error:", error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        setValidationErrors(
          error.response.data.errors.map((error) => error.msg)
        );
      } else if (error.response && error.response.data && error.response.data.error) {
        setValidationErrors([error.response.data.error]);
      } else {
        setValidationErrors([
          "An unexpected error occurred. Please try again."
        ]);
      }
    }
  };


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

      <div className="container">
        <h1>Staff Signup</h1>
        {validationErrors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSignupSubmit}>
          {/* Staff's Details */}
          <div className="row mb-3">
            <label htmlFor="inputFullName" className="col-sm-2 col-form-label">Full Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputFullName"
                name="name"
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputNic" className="col-sm-2 col-form-label">NIC</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputNic"
                name="nic"
                onChange={(e) => handleChange("nic", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputContactNumber" className="col-sm-2 col-form-label">Contact Number</label>
            <div className="col-sm-10">
              <input
                type="tel"
                className="form-control"
                id="inputContactNumber"
                name="contactnumber"
                onChange={(e) => handleChange("contactnumber", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                name="confirmpassword"
                onChange={(e) => handleChange("confirmpassword", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Staff Role */}
          <div className="row mb-3">
            <label htmlFor="inputRole" className="col-sm-2 col-form-label">Role</label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="inputRole"
                name="role"
                onChange={(e) => handleChange("role", e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Financial Manager">Receptionist</option>
                <option value="Inventory Manager">Cleaner</option>
                <option value="Event & Reservation Cordinator">Event & Reservation Cordinator</option>
                <option value="Meal Manager">Meal Manager</option>
                <option value="Medical Manager">Medical Manager</option>
                {/* Add more roles as needed */}
              </select>
            </div>
          </div>

          {validationErrors.length > 0 && (
            <div className="alert alert-danger">
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
}
