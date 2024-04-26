import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffCss/sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const AllPayrollsPage = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [error, setError] = useState(null);

    // Fetch all payroll records from the server when the component mounts
    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                // Fetch all payroll records from the server
                const response = await axios.get('http://localhost:8070/payroll/getallpayrolls');
                
                // Set the fetched payroll records to state
                setPayrolls(response.data);
            } catch (err) {
                console.error('Failed to fetch payroll records:', err);
                setError('Failed to fetch payroll records. Please try again.');
            }
        };

        fetchPayrolls();
    }, []);

    // Function to handle deleting a payroll record
    const handleDeletePayroll = async (nic) => {
        try {
            // Send a DELETE request to the server to delete the payroll record
            await axios.delete(`http://localhost:8070/payroll/deletepayroll/${nic}`);

            // Update the state to remove the deleted payroll record
            setPayrolls((prevPayrolls) => prevPayrolls.filter((payroll) => payroll.nic !== nic));

            alert('Payroll record deleted successfully!');
        } catch (err) {
            console.error('Failed to delete payroll record:', err);
            alert('Failed to delete payroll record. Please try again.');
        }
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/stafflogin');
    };

    // Render the component
    return (
        <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-title">Staff Financial Manager</h3>
                    <button className="btn btn-profile">
                        <Link to="/staffprofile" className="profile-link">View Profile</Link>
                    </button>
                </div>

                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/staff" className="nav-link-staffdb">Home</Link>
                        </li>
                        <li className="nav-item">
                              <Link to="/getallpayrolls" className="nav-link-staffdb-currentpage">
                                All Paysheets
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/getallstaff" className="nav-link-staffdb">
                                Staff Directory
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addPayInFo" className="nav-link-staffdb">
                                Add Pay Details
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AllPayInfo" className="nav-link-staffdb">
                                All Payment Information
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <button className="btn btn-logout" onClick={handleLogout}>
                        <Link to="/stafflogin" className="logout-link">Logout</Link>
                    </button>
                </div>
            </nav>

            {/* Main content area */}
            <div className="content-container">
                <div className="container-fluid">
                    <div className="content-wrapper">
                        {/* Top right text */}
                        <div className="top-right-text">
                            <h2>Leisure Home</h2>
                            <p>Human Care Center</p>
                        </div>

                        {/* Horizontal line */}
                        <hr className="separating-line-style" />

                        {/* Green color bold header */}
                        <p className="title-style">All Payroll Records</p>

                        {error && <p className="error-message">{error}</p>}

                        <div className="dark-green-container">
                            <div className="table-container">
                                <div className="grey-container">
                                    {/* Table */}
                                    <table className="table-style">
                                        {/* Table headers */}
                                        <thead>
                                            <tr>
                                                <th className="table-header-style">NAME</th>
                                                <th className="table-header-style">ROLE</th>
                                                <th className="table-header-style">NIC</th>
                                                <th className="table-header-style">TOTAL SALARY</th>
                                            </tr>
                                        </thead>
                                        {/* Table data */}
                                        <tbody>
                                            {payrolls.map((payroll) => (
                                                <tr key={payroll.nic}>
                                                    <td className="table-data-style">{payroll.name}</td>
                                                    <td className="table-data-style">{payroll.role}</td>
                                                    <td className="table-data-style">{payroll.nic}</td>
                                                    <td className="table-data-style">{payroll.salary}</td>
                                                    <td className="table-data-style">
                                                        <div className="actions">
                                                            <button onClick={() => handleDeletePayroll(payroll.nic)} className="delete-button">
                                                                Delete
                                                            </button>
                                                            <button className="generatepaysheet-button">Generate paysheet</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPayrollsPage;
