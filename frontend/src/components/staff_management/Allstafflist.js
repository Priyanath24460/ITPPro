import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './staffCss/allstafflist.css';
import './staffCss/sidebar.css';

const AllStaffList = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Create a navigate instance

    // Fetch data from the server when the component mounts
    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/staffmanager/getallstaff');
                setStaffMembers(response.data);
            } catch (err) {
                console.error('Failed to fetch staff members:', err);
                setError('Failed to fetch staff members');
            }
        };

        fetchStaffMembers();
    }, []);

    // Handler functions
    const handleAddSalary = async (staffMember) => {
        try {
            // Fetch pay information data based on the staff member's role
            const response = await axios.get(`http://localhost:8070/payinfo/role/${staffMember.role}`);
            
            // Extract the pay information data from the response
            const payInfoData = response.data;
    
            // Combine the staff member's data and pay information data
            const data = {
                name: staffMember.name,
                nic: staffMember.nic,
                role: staffMember.role,
                basicSalary: payInfoData.basicSalary,
                otHours: payInfoData.otHours,
                OTrate: payInfoData.OTrate,
                // Include other pay information data as needed
            };
    
            // Navigate to the AddSalaryPage with the combined data as state
            navigate('/addsalary', { state: data });
        } catch (err) {
            console.error(`Failed to fetch pay information for role ${staffMember.role}:`, err);
            alert(`Failed to fetch pay information for role ${staffMember.role}. Please try again.`);
        }
    };

    const handleUpdate = (memberId) => {
        // Add logic for updating the staff member
        console.log(`Update staff member with ID: ${memberId}`);
        // Implement your update logic here
    };

    const handleDelete = async (memberId) => {
        try {
            await axios.delete(`http://localhost:8070/staffmanager/deletestaff/${memberId}`);
            setStaffMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberId));
        } catch (error) {
            console.error(`Failed to delete staff member with ID: ${memberId}`, error);
            setError(`Failed to delete staff member with ID: ${memberId}`);
        }
    };

    const handleLogout = () => {
        // Add your logout logic here
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
                            <Link to="/getallstaff" className="nav-link-staffdb-currentpage">
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

                        {/* Green color bold header "Staff Directory" */}
                        <p className="title-style">Staff Directory</p>

                        {error && <p className="error-message">{error}</p>}

                        <div className="dark-green-container">
                        <div className="table-container">
                        <div className="grey-container">
                        <div className="table-container">
                         {/* Headers for the table */}
                        <table className="table-style">
                                    <thead>
                                        <tr>
                                            <th className="table-header-style">NAME</th>
                                            <th className="table-header-style">ROLE</th>
                                            <th className="table-header-style">NIC</th>
                                            <th className="table-header-style"></th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    {staffMembers.map((member) => (
                                        <tr key={member.nic}>
                                            <td className="table-data-style">{member.name}</td>
                                            <td className="table-data-style">{member.role}</td>
                                            <td className="table-data-style">{member.nic}</td>
                                            <td className="table-data-style">
                                                <div className='actions'>
                                                    <button onClick={() => handleUpdate(member._id)} className="updatestaff-button">
                                                        Update
                                                    </button>
                                                    <button onClick={() => handleDelete(member._id)} className="delete-button">
                                                        Delete
                                                    </button>
                                                    <button onClick={() => handleAddSalary(member)} className="add-salary-button">
                                                        Add Salary
                                                    </button>
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
    </div>
    );
};

export default AllStaffList;
