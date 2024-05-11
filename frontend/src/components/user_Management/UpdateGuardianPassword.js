import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateGuardianPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Extract email from the URL path
  const email = window.location.pathname.split('/').pop(); // Extract the email from the last part of the path

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Send a POST request to update the password
      await axios.post(`http://localhost:8070/guardian/updateguardianpassword/${email}`, { password });
      setSuccessMessage('Password updated successfully.');
      window.location.href = '/guardianlogin';
    } catch (error) {
      setError('Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        textAlign: 'center' 
      }}>
        <h2>Update Password</h2>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="inputPassword">New Password:</label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={handleChangePassword}
              required
              disabled={loading}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="inputConfirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="inputConfirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
              disabled={loading}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ 
                backgroundColor: 'green', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '4px', 
                border: 'none', 
                cursor: 'pointer', 
                fontSize: '16px' 
              }}
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      </div>
    </div>
  );
};
export default UpdateGuardianPassword;
