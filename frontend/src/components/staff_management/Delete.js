import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
  const [nic, setNic] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/user/delete/${nic}`);
      setMessage(response.data.status);
      alert("User Successfully Deleted");
      window.location.href='/AllPayInfo';
    } catch (err) {
      setError(err.response.data.error || 'Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Deleted</h1>
      
      
    </div>
  );
};

export default Delete;