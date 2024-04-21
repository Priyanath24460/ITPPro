import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const containerStyle = {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '800px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

const titleStyle = {
    textAlign: 'center',
    color: 'green'
};

const payrollTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
};

const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
};

const tableHeaderStyle = {
    backgroundColor: 'green',
    color: 'white',
    ...tableCellStyle
};

const evenRowStyle = {
    backgroundColor: '#f2f2f2'
};

const hoverRowStyle = {
    backgroundColor: '#ddd'
};

export default function AllPayRolls() {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        function getPayrolls() {
            axios.get("http://localhost:8070/payRoll/PayRoll")
                .then((res) => {
                    setPayrolls(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getPayrolls();
    }, []);

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>All Salary Details</h1>
            <table style={payrollTableStyle}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>NIC</th>
                        <th style={tableHeaderStyle}>Position</th>
                        <th style={tableHeaderStyle}>Total Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((payroll) => (
                        <tr key={payroll._id} style={evenRowStyle}>
                            <td style={tableCellStyle}>{payroll.name}</td>
                            <td style={tableCellStyle}>{payroll.nic}</td>
                            <td style={tableCellStyle}>{payroll.position}</td>
                            <td style={tableCellStyle}>{payroll.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
