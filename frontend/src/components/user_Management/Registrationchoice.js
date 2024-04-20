import React, { useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';

const Registrationchoice = () => {
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
    <div className="container">
      <h1>Choose Registration Type</h1>
      <div className="row">
        <div className="col-md-6">
          <Link to="/addguardian" className="btn btn-primary btn-lg btn-block">
            Register as a Guardian
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/add" className="btn btn-primary btn-lg btn-block">
            Register as an Elder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registrationchoice;