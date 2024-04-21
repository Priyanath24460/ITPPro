import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Allstaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/staff/allstaff');
        setStaffList(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching staff members. Please try again.');
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>All Staff Members</h2>
      <table>
        <thead>
          <tr>
            <th>NIC</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.nic}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>
                <Link to={`/staffprofile/${staff.nic}`}>View</Link>
                {/* Add the delete link here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allstaff;
