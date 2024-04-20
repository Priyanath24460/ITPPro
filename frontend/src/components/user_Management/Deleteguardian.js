import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteGuardian = () => {
  const { nic } = useParams(); // Extract the NIC parameter from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Delete guardian profile
    const deleteGuardianProfile = async () => {
      try {
        // Send DELETE request to delete guardian profile
        await axios.delete(`http://localhost:8070/guardian/deleteguardian/${nic}`);
        setLoading(false);
        // Navigate to a success page or any other action after successful deletion
        navigate('/deletesuccess'); // Navigate to a success page
      } catch (error) {
        setLoading(false);
        setError('Error deleting guardian profile');
        console.error('Error deleting guardian profile:', error.message);
      }
    };

    deleteGuardianProfile();
  }, [nic, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render a placeholder or redirect user to another page after deletion
  return (
    <div>
      <h2>Delete Guardian Profile</h2>
      <p>Deleting guardian profile...</p>
    </div>
  );
};

export default DeleteGuardian;
