import React, { useState } from 'react';
import axios from 'axios';

const OtpEntry = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmitOTP = async () => {
    setLoading(true);
    try {
      // Assuming `otp` is the OTP entered by the user
      console.log(typeof otp); // Check the data type of the OTP
      // Send a POST request to the backend to verify the OTP
      await axios.post('http://localhost:8070/guardian/verifyotp', { enteredOTP: otp });
      setSuccessMessage('OTP verified successfully. You can now reset your password.');
      // Extract email from the URL path
      const email = window.location.pathname.split('/').pop(); // Extract the email from the last part of the path
      // Redirect to the update password page with the email as a path parameter
      window.location.href = `/updateguardianpassword/${email}`;
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error('Error verifying OTP:', error);
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
        <h2>Enter OTP</h2>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="inputOtp">OTP:</label>
            <input
              type="text"
              id="inputOtp"
              value={otp}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <button
              type="button"
              onClick={handleSubmitOTP}
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
              {loading ? 'Verifying OTP...' : 'Submit OTP'}
            </button>
          </div>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default OtpEntry;