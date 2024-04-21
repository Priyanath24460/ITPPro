import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function StaffProfile() {
  const { nic } = useParams();
  console.log("NIC:", nic);
  const [staff, setStaff] = useState({ name: "", nic: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Staff Profile</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>Name:</strong> {staff.name} <br />
        <strong>NIC:</strong> {staff.nic} <br />
        <strong>Contact Number:</strong> {staff.contactnumber} <br />
        <strong>Email:</strong> {staff.email} <br />
        <strong>Role:</strong> {staff.role} <br />
      </div>
      <Link to={`/updatestaff/${staff.nic}`}>
        <button style={buttonStyle}>Update</button>
      </Link>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};
