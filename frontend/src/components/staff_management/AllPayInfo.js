import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './staffCss/allpayinfo.css';

export default function AllPayInfo() {
    const [payInfoData, setPayInfoData] = useState([]);

    useEffect(() => {
        function getPayInfoData() {
            axios.get("http://localhost:8070/payinfo/")
                .then((res) => {
                    setPayInfoData(res.data);
                })
                .catch((err) => {
                    alert(`Failed to fetch pay information: ${err.message}`);
                });
        }
        getPayInfoData();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/stafflogin');
    };

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
                            <Link to="/staff" className="nav-link-staffdb">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/getallpayrolls" className="nav-link-staffdb">
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
                            <Link to="/AllPayInfo" className="nav-link-staffdb-currentpage">
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
            <div className="top-right-text">
                            <h2>Leisure Home</h2>
                            {/* Paragraph "Human Care Center" below the top right text */}
                            
                            <p>Human Care Center</p>
                        </div>
                <hr className="separating-line-style" />
                <p className='title-style'>All Payment Information</p>
                {/* Table for payment information */}
                <div className="table-container">
                    <table className="table-style">
                        
                        <thead>
                            <tr>
                                <th className="table-header-style">Role</th>
                                <th className="table-header-style">Basic Salary</th>
                                <th className="table-header-style">Bonus</th>
                                <th className="table-header-style">OT Rate</th>
                                <th className="table-header-style">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payInfoData.map((payInfo) => (
                                <tr key={payInfo._id}>
                                    <td className="table-data-style">{payInfo.role}</td>
                                    <td className="table-data-style">{payInfo.basicSalary}</td>
                                    <td className="table-data-style">{payInfo.bonus}</td>
                                    <td className="table-data-style">{payInfo.OTrate}</td>
                                    <td className="table-data-style">
                                    <Link to={`/updatesalarayinfo/${payInfo._id}`} className="updatepayinfo-button-style">
                                Update
                            </Link>
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
    );
}
