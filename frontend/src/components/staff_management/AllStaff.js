import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AllStaff() {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        function getStaff() {
            axios.get("http://localhost:8070/payinfo/").then((res) => {
                setStaff(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getStaff();
    }, [])

    

    const handleDelete = async (userNic) => {
        try {
            await axios.delete(`http://localhost:8070/user/delete/${userNic}`);
            setStaff(prevStaff => prevStaff.filter(user => user.nic !== userNic));
        } catch (err) {
            console.error(err);
            // Handle error, show error message, or perform other actions
        }
    };
    

    return (
        <div style={containerStyle}>
            <h1>Payment Information</h1>
            <hr style={separatingLineStyle} />
            <div>
                {staff.map((user) => (
                    <div key={user._id}>
                       <div>
            <h3>Basic Salary</h3>
            <p>Admin Basic Salary: {user.adminBasic}</p>
            <p>Manager Basic Salary: {user.managerBasic}</p>
        </div>
        <hr style={dottedLineStyle} />
        <div>
            <h4>Bonus :  {user.bonus}</h4>
        </div>
        <hr style={dottedLineStyle} />
        <div>
            <h4>OT Rate : {user.OTrate}</h4>
        </div>
                        <div>
                            <Link to={`/update/${user.nic}`} style={updateButtonStyle} className="btn btn-primary mr-2">Update</Link>
                            
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
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
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
    backgroundColor: '#4CAF50', /* Green */
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
    marginBottom: '10px'
};

const dottedLineStyle = {
    borderTop: '1px dotted #ccc',
    marginBottom: '10px'
};



