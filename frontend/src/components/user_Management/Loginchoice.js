import React from 'react';
import { Link } from 'react-router-dom';
import './user_management_CSS/Loginchoice.css';

const Loginchoice = () => {
  return (
    <div className="page-wrapper"> 
    <div className="container-loginchoice">
      <h1>Login</h1>
      <div className="col-md-4">
          <Link to="/guardianlogin" className="btn btn-primary btn-lg btn-block">
            Guardian
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/login" className="btn btn-primary btn-lg btn-block">
            Elder
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/stafflogin" className="btn btn-primary btn-lg btn-block">
          Staff Member
          </Link>
        </div>
      
    </div>
    </div>
  );
};

export default Loginchoice;
