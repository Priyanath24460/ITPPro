import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Update = () => {
  const { nic } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    age: "",
    birthdate: "",
    gender: "",
    address: "",
    contactnumber: "",
    gname: "",
    gnic: "",
    gcontactnumber: "",
    gaddress: "",
    password: "",
  });

  // State variables for form validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getCustomer() {
      try {
        if (nic) {
          const response = await axios.get(
            `http://localhost:8070/customerA/get/${nic}`
          );
          const customerData = response.data.customer;
          setFormData({
            name: customerData.name,
            nic: customerData.nic,
            age: customerData.age,
            birthdate: customerData.birthdate,
            gender: customerData.gender,
            address: customerData.address,
            contactnumber: customerData.contactnumber,
            gname: customerData.gname,
            gnic: customerData.gnic,
            gcontactnumber: customerData.gcontactnumber,
            gaddress: customerData.gaddress,
            password: customerData.password,
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    getCustomer();
  }, [nic]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitP = async (e) => {
    e.preventDefault();

    // Modify formData to include only name, age, and gender
    const updatedData = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender
    };
    
    try {
        await axios.put(`http://localhost:8070/patients/updateP/${nic}`, updatedData);
       // alert("Customer Updated Successfully!");
    
    } catch (error) {
        console.error(error.message);
        alert("Error updating customer. Please try again.");
    }
};

  const handleKeyDown = (e, regex) => {
    if (e.key === "Backspace") return; // Allow backspace
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data before submitting
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await axios.put(
        `http://localhost:8070/customerA/update/${nic}`,
        formData
      );
      alert("Customer Updated Successfully!");
      window.location.href = `/elderprofile/${nic}`;
    } catch (error) {
      console.error(error.message);
      alert("Error updating customer. Please try again.");
    }
  };

  // Function to validate form data
  const validateForm = (data) => {
    const errors = {};
  
    if (!data.name || !/^[a-zA-Z\s]+$/.test(data.name)) {
      errors.name = "Name is required and can only contain letters and spaces.";
    }
  
    if (!data.nic || !/^[Vv0-9]+$/.test(data.nic)) {
      errors.nic = "NIC is required and can only contain 'v', 'V', and numbers.";
    }
  
    if (!data.age || isNaN(data.age) || data.age < 0) {
      errors.age = "Age is required and must be a valid number.";
    }
  
    if (!data.birthdate) {
      errors.birthdate = "Birth date is required.";
    }
  
    if (!data.gender || !["male", "female"].includes(data.gender)) {
      errors.gender =
        "Gender is required and must be either 'male' or 'female'.";
    }
  
    if (!data.address || !/^[a-zA-Z0-9\s\/]+$/.test(data.address)) {
      errors.address =
        "Address is required and can only contain letters, numbers, and '/'.";
    }
  
    if (
      !data.contactnumber ||
      !/^\d{10}$/.test(data.contactnumber)
    ) {
      errors.contactnumber =
        "Contact number is required and must be a valid 10-digit number.";
    }
  
    if (!data.gname || !/^[a-zA-Z\s]+$/.test(data.gname)) {
      errors.gname = "Guardian's name is required and can only contain letters.";
    }
  
    if (!data.gnic || !/^[Vv0-9]+$/.test(data.gnic)) {
      errors.gnic =
        "Guardian's NIC is required and can only contain 'v', 'V', and numbers.";
    }
  
    if (
      !data.gcontactnumber ||
      !/^\d{10}$/.test(data.gcontactnumber)
    ) {
      errors.gcontactnumber =
        "Guardian's contact number is required and must be a valid 10-digit number.";
    }
  
    if (!data.gaddress || !/^[a-zA-Z0-9\s\/]+$/.test(data.gaddress)) {
      errors.gaddress =
        "Guardian's address is required and can only contain letters, numbers, and '/'.";
    }
  
    if (!data.password || data.password.length < 6) {
      errors.password =
        "Password is required and must be at least 6 characters long.";
    }
  
    return errors;
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Update Customer</h1>
      <form style={formStyle} onSubmit={(e) => { handleSubmit(e); handleSubmitP(e); }}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[a-zA-Z\s]$/)}
            style={inputStyle}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>NIC:</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[Vv0-9]$/)}
            style={inputStyle}
          />
          {errors.nic && <span style={{ color: "red" }}>{errors.nic}</span>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[0-9]$/)}
            style={inputStyle}
          />
          {errors.age && <span style={{ color: "red" }}>{errors.age}</span>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Birth Date:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[0-9-]$/)}
            style={inputStyle}
          />
          {errors.birthdate && (
            <span style={{ color: "red" }}>{errors.birthdate}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[a-zA-Z]$/)}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span style={{ color: "red" }}>{errors.gender}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[a-zA-Z0-9\s\/]$/)}
            style={inputStyle}
          />
          {errors.address && (
            <span style={{ color: "red" }}>{errors.address}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Contact Number:</label>
          <input
            type="text"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[0-9]$/)}
            style={inputStyle}
          />
          {errors.contactnumber && (
            <span style={{ color: "red" }}>{errors.contactnumber}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Name:</label>
          <input
            type="text"
            name="gname"
            value={formData.gname}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[a-zA-Z\s]$/)}
            style={inputStyle}
          />
          {errors.gname && (
            <span style={{ color: "red" }}>{errors.gname}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's NIC:</label>
          <input
            type="text"
            name="gnic"
            value={formData.gnic}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[Vv0-9]$/)}
            style={inputStyle}
          />
          {errors.gnic && <span style={{ color: "red" }}>{errors.gnic}</span>}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Contact Number:</label>
          <input
            type="text"
            name="gcontactnumber"
            value={formData.gcontactnumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[0-9]$/)}
            style={inputStyle}
          />
          {errors.gcontactnumber && (
            <span style={{ color: "red" }}>{errors.gcontactnumber}</span>
          )}
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Address:</label>
          <input
            type="text"
            name="gaddress"
            value={formData.gaddress}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, /^[a-zA-Z0-9\s\/]$/)}
            style={inputStyle}
          />
          {errors.gaddress && (
            <span style={{ color: "red" }}>{errors.gaddress}</span>
          )}
        </div>

        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

// Styles and constants
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  maxWidth: "800px",
  margin: "auto",
};

const headerStyle = {
  color: "#333",
  borderBottom: "2px solid #333",
  paddingBottom: "10px",
};

const formStyle = {
  marginTop: "20px",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
};

export default Update;
