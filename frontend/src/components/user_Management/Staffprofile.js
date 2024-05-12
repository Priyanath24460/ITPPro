import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StaffProfile() {
  const { nic } = useParams();
  const [staff, setStaff] = useState({ name: "", nic: "", role: "", contactnumber: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getStaff() {
      try {
        if (nic) {
          const response = await axios.get(`http://localhost:8070/staff/staffprofile/${nic}`);
          setStaff(response.data.staffMember);
        }
      } catch (err) {
        setError("Error fetching staff data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    getStaff();
  }, [nic]);

  

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/staff/updatestaff/${nic}`, staff);
      console.log("Update successful:", response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating staff data:", err);
    }
  };


  const handleNameChange = (e) => {
    const nameRegex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
    if (nameRegex.test(e.target.value) || e.target.value === "") {
      setStaff({ ...staff, name: e.target.value });
    }
  };

  const handleContactNumberChange = (e) => {
    const numberRegex = /^[0-9]*$/; // Allow only numbers
    if (numberRegex.test(e.target.value) || e.target.value === "") {
      setStaff({ ...staff, contactnumber: e.target.value });
    }
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Validate email format
    if (emailRegex.test(e.target.value) || e.target.value === "" || e.target.value === "@" || e.target.value.endsWith("@")) {
      setStaff({ ...staff, email: e.target.value });
    }
  };

  if (!nic) {
    return <p>NIC parameter is missing.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1 className="heading">Staff Profile</h1>
      <div className="profile-wrapper">
        <div className="profile-info">
          <span className="label">Name:</span>
          {!isEditing ? (
            <span>{staff.name}</span>
          ) : (
            <input
              className="input-field"
              type="text"
              value={staff.name}
              onChange={handleNameChange}
            />
          )}
        </div>
        <div className="profile-info">
          <span className="label">NIC:</span>
          <span>{staff.nic}</span>
        </div>
        <div className="profile-info">
          <span className="label">Contact Number:</span>
          {!isEditing ? (
            <span>{staff.contactnumber}</span>
          ) : (
            <input
              className="input-field"
              type="text"
              value={staff.contactnumber}
              onChange={handleContactNumberChange}
            />
          )}
        </div>
        <div className="profile-info">
          <span className="label">Email:</span>
          {!isEditing ? (
            <span>{staff.email}</span>
          ) : (
            <input
              className="input-field"
              type="text"
              value={staff.email}
              onChange={handleEmailChange}
            />
          )}
        </div>
        <div className="profile-info">
          <span className="label">Role:</span>
          <span>{staff.role}</span>
        </div>
        <div>
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          ) : (
            <>
              <button className="save-btn" onClick={handleUpdate}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
