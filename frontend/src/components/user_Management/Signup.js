import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    confirmpassword: ""
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [validationErrors, setValidationErrors] = useState([]);

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
    <div className="container">
      <h1>Signup</h1>
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
      
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
    </div>
  </div>
  <Link to="/login">Already have an account? Login here</Link>
      </form>
    </div>
  );
}