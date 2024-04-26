import './user_management_CSS/Registrationchoice.css';
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const RegistrationChoice = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If token exists, redirect to home page
    if (token) {
      navigate('/home');
    }
    
  }, [navigate]); 

  return (
    <div className="page-wrapper"> {/* This div covers the whole page */}
      <div className="container-registrationchoice">
        <h1 className="text-center my-4">Choose Registration Type</h1>
        <hr className="separator" />
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card mb-4">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h5 className="card-title text-center">Register as a Guardian</h5>
                <Link to="/addguardian" className="btn btn-custom btn-lg btn-block">
                <span style={{ color: 'white' }}>Register</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-5">
            <div className="card mb-4">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h5 className="card-title text-center">Register as an Elder</h5>
                <Link to="/add" className="btn btn-custom btn-lg btn-block">
                <span style={{ color: 'white' }}>Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChoice;
