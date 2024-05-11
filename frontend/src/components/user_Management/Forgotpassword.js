import React, { useState } from 'react';
import axios from 'axios';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenerateOTP = async () => {
    setLoading(true);
    try {
      // Send a POST request to the backend with the email data
      await axios.post('http://localhost:8070/guardian/forgotpassword', { email });
      setSuccessMessage('OTP sent successfully. Please check your email.');
      // Redirect to the OTP entry page with the email as a query parameter
      window.location.href = `/otpentry/${email}`;
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error);
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
        <h2>Forgot Password</h2>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="inputEmail">Email:</label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <button
              type="button"
              onClick={handleGenerateOTP}
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
              {loading ? 'Generating OTP...' : 'Generate OTP'}
            </button>
          </div>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      </div>
    </div>
  );
};


export default Forgotpassword;