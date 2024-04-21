import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AllPayInfo() {

    const [payinfo, setPayInfo] = useState([]);

    useEffect(() => {
        function getPayInfo() {
            axios.get("http://localhost:8070/payinfo/").then((res) => {
                setPayInfo(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPayInfo();
    }, [])
    

    return (
        <div style={{ ...containerStyle, textAlign: 'center' }}>
            <h1 style={titleStyle}>Payment Information</h1>
            <hr style={separatingLineStyle} />
            <div>
                {payinfo.map((payinfo) => (
                    <div key={payinfo._id} style={payInfoStyle}>
                        <div>
                            <h3>Basic Salary</h3>
                            <p>Admin Basic Salary: {payinfo.adminBasic}</p>
                            <p>Manager Basic Salary: {payinfo.managerBasic}</p>
                        </div>
                        <hr style={dottedLineStyle} />
                        <div>
                            <h4>Bonus :  {payinfo.bonus}</h4>
                        </div>
                        <hr style={dottedLineStyle} />
                        <div>
                            <h4>OT Rate : {payinfo.OTrate}</h4>
                        </div>
                        <div>
                            <Link to={`/update`} style={updateButtonStyle} className="btn btn-primary mr-2">Update</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    
}

const containerStyle = {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '800px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa', // Light gray background
};

const titleStyle = {
    textAlign: 'center',
    color: '#28a745', // Green title color
};

const payInfoStyle = {
    backgroundColor: '#fff', // White background for each pay info section
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};


const buttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };
  
  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#218838', /* Green */
    border: 'none',
    color: 'white',
    padding: '7px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginRight: '10px'
  };


const separatingLineStyle = {
    borderTop: '2px solid #ccc',
    marginBottom: '20px'
};

const dottedLineStyle = {
    borderTop: '1px dotted #ccc',
    marginBottom: '10px'
};



