import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePayInformation = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Use navigate hook to navigate after update

    const [formData, setFormData] = useState({
        basicSalary: "",
        role: "",
        bonus: "",
        OTrate: "",
    });

    // Fetch pay information data based on the ID from the backend
    useEffect(() => {
        const fetchPayInfoData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/payinfo/${id}`);
                const payInfoData = response.data;

                setFormData({
                    basicSalary: payInfoData.basicSalary,
                    role: payInfoData.role,
                    bonus: payInfoData.bonus,
                    OTrate: payInfoData.OTrate,
                });
            } catch (error) {
                console.error("Error fetching pay information data:", error);
                alert("Error fetching pay information data.");
            }
        };

        fetchPayInfoData();
    }, [id]);

    // Validate input as a number
    function validateNumber(input) {
        const regex = /^[0-9]+$/; // Only numbers allowed
        return regex.test(input);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate basic salary input
        if (!validateNumber(formData.basicSalary)) {
            alert("Basic salary can only be a number.");
            return;
        }

        // Validate OT rate input
        if (formData.OTrate < 0 || formData.OTrate >= 100) {
            alert("OT rate must be between 0 and 99 and cannot be negative.");
            return;
        }

        try {
            // Send a PUT request to the backend to update the pay information data
            await axios.put(`http://localhost:8070/payinfo/updatesalarayinfo/${id}`, formData);

            // Alert the user and navigate back to the AllPayInfo page
            alert("Payment information updated successfully!");
            navigate('/AllPayInfo'); // Redirect to the AllPayInfo page
        } catch (error) {
            console.error("Error updating pay information:", error);
            alert("Failed to update payment information. Please try again.");
        }
    };

    // Handle keydown event to prevent typing a negative sign
    const preventNegativeInput = (e) => {
        // If the key pressed is the minus sign, prevent the default action
        if (e.key === '-') {
            e.preventDefault();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Update Payment Information</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Basic Salary:</label>
                    <input
                        type="number"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={handleChange}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                    {!validateNumber(formData.basicSalary) && (
                        <p className="error-message">Basic salary can only be a number.</p>
                    )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Bonus:</label>
                    <input
                        type="number"
                        name="bonus"
                        value={formData.bonus}
                        onChange={handleChange}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                    {!validateNumber(formData.bonus) && (
                        <p className="error-message">Bonus can only be a number.</p>
                    )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>OT Rate:</label>
                    <input
                        type="number"
                        name="OTrate"
                        value={formData.OTrate}
                        onChange={handleChange}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                    {formData.OTrate < 0 || formData.OTrate >= 100 && (
                        <p className="error-message">OT rate must be between 0 and 99.</p>
                    )}
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px'
                    }}
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdatePayInformation;
