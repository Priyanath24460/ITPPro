import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateGuardian = () => {
  const { nic } = useParams(); // Extract the NIC parameter from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: '',
    contactnumber: '',
    email: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch guardian details and populate form fields
    const fetchGuardianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/guardian/guardianprofile/${nic}`);
        const { name, contactnumber, email } = response.data;
        setFormData({ name, contactnumber, email });
      } catch (error) {
        setError('Error fetching guardian details');
        console.error('Error fetching guardian details:', error.message);
      }
    };

    fetchGuardianDetails();
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
      // Send PUT request to update guardian details
      await axios.put(`http://localhost:8070/guardian/updateguardian/${nic}`, formData);
      alert('Guardian details updated successfully!');
      
      // Navigate to the guardian profile page with the updated NIC
      navigate(`/guardianprofile/${nic}`);
    } catch (error) {
      console.error('Error updating guardian details:', error.message);
      alert('Error updating guardian details. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Guardian Details</h2>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="contactnumber">Contact Number:</label>
          <input type="text" id="contactnumber" name="contactnumber" value={formData.contactnumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGuardian;
