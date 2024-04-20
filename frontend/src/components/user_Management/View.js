import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function View() {
  const { nic } = useParams();
  console.log("NIC:", nic);
  const [customer, setCustomer] = useState({ name: "", nic: "" }); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCustomer() {
      try {
        if (nic) {
          const response = await axios.get(`http://localhost:8070/customerA/get/${nic}`);
          setCustomer(response.data.customer);
        }
      } catch (err) {
        setError("Error fetching customer data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    getCustomer();
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
      <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Customer Details</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>Name:</strong> {customer.name} <br />
        <strong>NIC:</strong> {customer.nic} <br />
        <strong>Age:</strong> {customer.age} <br />
        <strong>Birthdate:</strong> {customer.birthdate} <br />
        <strong>Gender:</strong> {customer.gender} <br />
        <strong>Address:</strong> {customer.address} <br />
        <strong>Contact Number:</strong> {customer.contactnumber} <br />
        <strong>Guardian's Name:</strong> {customer.gname} <br />
        <strong>Guardian's NIC:</strong> {customer.gnic} <br />
        <strong>Guardian's Contact Number:</strong> {customer.gcontactnumber} <br />
        <strong>Guardian's Address:</strong> {customer.gaddress} <br />
        <strong>Password:</strong> {customer.password} <br />
      </div>
      <Link to =  {`/update/${customer.nic}`}>
      <button style={buttonStyle} >Update</button>
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
