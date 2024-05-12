import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './user_management_CSS/signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    // Elder's Details
    name: "",
    nic: "",
    age: "",
    birthdate: "",
    gender: "",
    address: "",
    contactnumber: "",

    // Guardian's Details
    gname: "",
    gnic: "",
    gcontactnumber: "",
    gaddress: "",

    // Login details
    password: "",
    confirmpassword: "",

    
  });


  const [validationErrors, setValidationErrors] = useState([]);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [passwordMatchWarning, setPasswordMatchWarning] = useState(false); 


  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleKeyDown = (event, regex) => {
    if (event.key === "Backspace") return; // Allow backspace
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const nameRegex = /^[a-zA-Z ]+$/;
  const nicRegex = /^[vV0-9]+$/;
  const addressRegex = /^[a-zA-Z0-9/ ]+$/;
  const contactNumberRegex = /^[0-9]+$/;
  const passwordRegex = /^.{8,12}$/;
  const validateForm = () => {
    let errors = [];
  
    // Validation rules...
    
    // Check if name is empty
    if (!formData.name.trim()) {
      errors.push("Name is required.");
    }
    // Add additional validation rules for name
    else if (!nameRegex.test(formData.name)) {
      errors.push("Name can only contain letters and spaces.");
    }
  
    // Check if NIC is empty
    if (!formData.nic.trim()) {
      errors.push("NIC is required.");
    }
    // Add additional validation rules for NIC
    else if (!nicRegex.test(formData.nic)) {
      errors.push("NIC can only contain 'v', 'V', and numbers.");
    }
  
    // Check if address is empty
    if (!formData.address.trim()) {
      errors.push("Address is required.");
    }
    // Add additional validation rules for address
    else if (!addressRegex.test(formData.address)) {
      errors.push("Address can only contain letters, numbers, and '/'.");
    }
  
    // Check if contact number is empty
    if (!formData.contactnumber.trim()) {
      errors.push("Contact number is required.");
    }
    // Add additional validation rules for contact number
    else if (!contactNumberRegex.test(formData.contactnumber)) {
      errors.push("Contact number can only contain numbers.");
    }
  
    // Check if guardian's name is empty
    if (!formData.gname.trim()) {
      errors.push("Guardian's name is required.");
    }
    // Add additional validation rules for guardian's name
    else if (!nameRegex.test(formData.gname)) {
      errors.push("Guardian's name can only contain letters.");
    }
  
    // Check if guardian's NIC is empty
    if (!formData.gnic.trim()) {
      errors.push("Guardian's NIC is required.");
    }
    // Add additional validation rules for guardian's NIC
    else if (!nicRegex.test(formData.gnic)) {
      errors.push("Guardian's NIC can only contain 'v', 'V', and numbers.");
    }
  
    // Check if guardian's contact number is empty
    if (!formData.gcontactnumber.trim()) {
      errors.push("Guardian's contact number is required.");
    }
    // Add additional validation rules for guardian's contact number
    else if (!contactNumberRegex.test(formData.gcontactnumber)) {
      errors.push("Guardian's contact number can only contain numbers.");
    }
  
    // Check if guardian's address is empty
    if (!formData.gaddress.trim()) {
      errors.push("Guardian's address is required.");
    }
    // Add additional validation rules for guardian's address
    else if (!addressRegex.test(formData.gaddress)) {
      errors.push("Guardian's address can only contain letters, numbers, and '/'.");
    }
  
    // Check if password is empty
    if (!formData.password.trim()) {
      errors.push("Password is required.");
    }
    // Add additional validation rules for password
    else if (!passwordRegex.test(formData.password)) {
      errors.push("Password must be between 8 and 12 characters.");
    }
  
    // Check if confirm password is empty
    if (!formData.confirmpassword.trim()) {
      errors.push("Confirm Password is required.");
    }
    // Check if passwords match
    else if (formData.password !== formData.confirmpassword) {
      errors.push("Passwords do not match.");
    }
  
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmpassword) {
      setValidationErrors(["Password and Confirm Password must match."]);
      return; // Stop form submission if passwords don't match
    }

    // Send details to the backend
    axios
      .post("http://localhost:8070/customerA/add", formData)
      .then(() => {
        alert("Data added successfully");
        setValidationErrors([]); // Clear previous validation errors on successful submission
        window.location.href = "/login";
      })
      .catch((err) => {
        alert("Signup Error:", err);
        if (err.response && err.response.data && err.response.data.errors) {
          setValidationErrors(
            err.response.data.errors.map((error) => error.msg)
          );
        } else if (err.response && err.response.data && err.response.data.error) {
          setValidationErrors([err.response.data.error]);
        } else {
          setValidationErrors([
            "An unexpected error occurred. Please try again."
          ]);
        }
      });
  };
  


  return (
    <div className="container-register">
      <div className="heading-container">
        <h2>Sign Up</h2>
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
      <form onSubmit={handleSignupSubmit}>
        {/* Elder's Details */}
        <div className="row mb-3">
          <label htmlFor="inputFullName" className="col-sm-2 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputFullName"
              name="name"
              onChange={(e) => handleChange("name", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nameRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputNic" className="col-sm-2 col-form-label">
            NIC
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputNic"
              name="nic"
              onChange={(e) => handleChange("nic", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nicRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputAge" className="col-sm-2 col-form-label">
            Age
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="inputAge"
              name="age"
              onChange={(e) => handleChange("age", e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="row mb-3">
  <label htmlFor="inputGender" className="col-sm-2 col-form-label">
    Gender
  </label>
  <div className="col-sm-10 d-flex align-items-center">
    <div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="male"
        name="gender"
        value="male"
        onChange={(e) => handleChange("gender", e.target.value)}
        required
      />
      <label className="form-check-label" htmlFor="male">
        Male
      </label>
    </div>
    <div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="female"
        name="gender"
        value="female"
        onChange={(e) => handleChange("gender", e.target.value)}
        required
      />
      <label className="form-check-label" htmlFor="female">
        Female
      </label>
    </div>
  </div>
</div>
        

        <div className="row mb-3">
          <label htmlFor="inputBirthDate" className="col-sm-2 col-form-label">
            Birth Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="inputBirthDate"
              name="birthdate"
              onChange={(e) => handleChange("birthdate", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              name="address"
              onChange={(e) => handleChange("address", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addressRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputContactNumber" className="col-sm-2 col-form-label">
            Contact Number
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="inputContactNumber"
              name="contactnumber"
              onChange={(e) => handleChange("contactnumber", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, contactNumberRegex)}
              required
            />
          </div>
        </div>

        {/* Guardian's Details */}
        <div className="row mb-3">
          <label htmlFor="inputGName" className="col-sm-2 col-form-label">
            Guardian's Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputGName"
              name="gname"
              onChange={(e) => handleChange("gname", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nameRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputGNIC" className="col-sm-2 col-form-label">
            Guardian's NIC
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputGNIC"
              name="gnic"
              onChange={(e) => handleChange("gnic", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nicRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputGContactNumber" className="col-sm-2 col-form-label">
            Guardian's Contact Number
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="inputGContactNumber"
              name="gcontactnumber"
              onChange={(e) => handleChange("gcontactnumber", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, contactNumberRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputGAddress" className="col-sm-2 col-form-label">
            Guardian's Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputGAddress"
              name="gaddress"
              onChange={(e) => handleChange("gaddress", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addressRegex)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            {passwordWarning && (
              <div className="text-danger">Password must be between 8 and 12 characters.</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputConfirmPassword"
              name="confirmpassword"
              onChange={(e) => handleChange("confirmpassword", e.target.value)}
              required
            />
            {passwordMatchWarning && (
              <div className="text-danger">Passwords do not match.</div>
            )}
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

        {/* Submit button */}
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Submit   
            </button>
          </div>
        </div>

        {/* Link to login page */}
        <Link to="/login">Already have an account? Login here</Link>
      </form>
    </div>
  );
}