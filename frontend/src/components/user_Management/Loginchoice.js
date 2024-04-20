import React from 'react';
import { Link } from 'react-router-dom';

const Loginchoice = () => {
  return (
    <div className="container">
      <h1>Login</h1>
      <div className="row">
        <div className="col-md-4">
          <Link to="/guardianlogin" className="btn btn-primary btn-lg btn-block">
            Login as a Guardian
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/login" className="btn btn-primary btn-lg btn-block">
            Login as an Elder
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/stafflogin" className="btn btn-primary btn-lg btn-block">
            Login as a Staff Member
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginchoice;
