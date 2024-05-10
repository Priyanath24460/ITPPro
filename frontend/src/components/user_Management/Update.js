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
            password : customerData.password
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/customerA/update/${nic}`, formData);
      alert("Customer Updated Successfully!");
      window.location.href = `/view/${nic}`;
    } catch (error) {
      console.error(error.message);
      alert("Error updating customer. Please try again.");
    }
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
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>NIC:</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Birth Date:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Contact Number:</label>
          <input
            type="text"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Name:</label>
          <input
            type="text"
            name="gname"
            value={formData.gname}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's NIC:</label>
          <input
            type="text"
            name="gnic"
            value={formData.gnic}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Contact Number:</label>
          <input
            type="text"
            name="gcontactnumber"
            value={formData.gcontactnumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Guardian's Address:</label>
          <input
            type="text"
            name="gaddress"
            value={formData.gaddress}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>          
        
        <button >View Customer</button>
      </form>
    </div>
  );
};

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

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

export default Update;
