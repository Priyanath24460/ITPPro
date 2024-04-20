import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
  const [nic, setNic] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/delete/${nic}`);
      setMessage(response.data.status);
    } catch (err) {
      setError(err.response.data.error || 'Error deleting user');
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <label>
        NIC:
        <input type="text" value={nic} onChange={(e) => setNic(e.target.value)} />
      </label>
      <button onClick={handleDelete}>Delete User</button>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Delete;
