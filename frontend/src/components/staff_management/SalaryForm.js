import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './staffCss/salaryform.css';

const AddSalaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the staff member's data from location state
    const { state: staff } = location;

    // Create a state variable to hold additional pay information data
    const [payInfo, setPayInfo] = useState({
        basicSalary: '',
        otHours: '',
        OTrate: '',
        bonus: '',
    });

    // State variable to hold the user-inputted OT hours
    const [inputOtHours, setInputOtHours] = useState('');

    // Fetch additional pay information data based on the staff member's role
    useEffect(() => {
        if (staff && staff.role) {
            const fetchPayInfo = async () => {
                try {
                    const response = await axios.get(`http://localhost:8070/payinfo/role/${staff.role}`);
                    setPayInfo({
                        basicSalary: response.data.basicSalary,
                        otHours: response.data.otHours,
                        OTrate: response.data.OTrate,
                        bonus: response.data.bonus,
                    });
                } catch (err) {
                    console.error(`Failed to fetch pay information for role ${staff.role}:`, err);
                    alert(`Failed to fetch pay information for role ${staff.role}. Please try again.`);
                }
            };

            fetchPayInfo();
        }
    }, [staff]);

    // Calculate total salary
    const calculateTotalSalary = () => {
        // Calculate total salary based on the user-inputted OT hours
        return Number(payInfo.basicSalary) +
            Number(inputOtHours || payInfo.otHours) * Number(payInfo.OTrate) +
            Number(payInfo.bonus);
    };

    // Function to handle form submission
    const handleAddSalary = async () => {
        // Calculate total salary
        const totalSalary = calculateTotalSalary();
    
        try {
            // Send a POST request to the server to save the data to the payRoll model
            await axios.post(`http://localhost:8070/payroll/addpayroll`, {
                nic: staff.nic,
                name: staff.name,
                role: staff.role,
                salary: totalSalary,
                otHours: inputOtHours, // Include the user-inputted OT hours in the request body
            });
    
            // Alert the user of successful save and navigate back to the all payrolls page
            alert('Total salary and OT hours saved successfully!');
            navigate('/getallpayrolls');
        } catch (err) {
            console.error('Failed to save total salary and OT hours:', err);
            alert('Failed to save total salary and OT hours. Please try again.');
        }
    };
    // If no staff member data is available, return an error message
    if (!staff) {
        return <p>No staff member data available.</p>;
    }

    // Render the staff member's data and additional data
    return (
        <div className="add-salary-page">
            {/* Card container */}
            <div className="card-container">
                {/* Heading */}
                <h2 className="heading">Add Salary for {staff.name}</h2>

                {/* Display staff NIC */}
                <p className="nic">NIC: {staff.nic}</p>

                {/* White container for earnings and amount */}
                <div className="details-container">
                    {/* Headings */}
                    <div className="headings">
                        <span className="heading-earnings">Earnings</span>
                        <span className="heading-amount">Amount (Rs.)</span>
                    </div>

                    {/* Horizontal line */}
                    <hr className="separator" />

                    {/* Earnings and amounts */}
                    <div className="details">
                        <div className="detail">
                            <span className="detail-earning">Basic Salary</span>
                            <span className="detail-amount">{payInfo.basicSalary}</span>
                        </div>
                        <div className="detail">
                            <span className="detail-earning">OT</span>
                            <span className="detail-amount">
                                {/* Display OT rate and input field side by side */}
                                <span className="ot-rate">{payInfo.OTrate}</span>
                                <input
                                    type="number"
                                    value={inputOtHours}
                                    onChange={(e) => setInputOtHours(e.target.value)}
                                    min="0"
                                    className="ot-input-field"
                                    placeholder="OT Hours"
                                />
                            </span>
                        </div>
                        <div className="detail">
                            <span className="detail-earning">Bonus</span>
                            <span className="detail-amount">{payInfo.bonus}</span>
                        </div>
                    </div>

                    {/* Horizontal line */}
                    <hr className="separator" />
                </div>

                {/* Total salary paragraph */}
                <p className="total-salary">Total Salary: {calculateTotalSalary()}</p>

                {/* Save total salary button */}
                <button onClick={handleAddSalary} className="save-button">Save Total Salary</button>
            </div>
        </div>
    );
};

export default AddSalaryPage;
