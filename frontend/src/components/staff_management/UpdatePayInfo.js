import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePayInfo = () => {

    const [formData, setFormData] = useState({
        adminBasic: "",
        managerBasic:"",
        bonus: "",
        OTrate: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                    const response = await axios.get(
                        `http://localhost:8070/payinfo/` // API endpoint to fetch all 
                    );
                    const userData = response.data[0];

                    // Update the form data with the fetched user data
                    setFormData({
                        adminBasic: userData.adminBasic,
                        managerBasic: userData.managerBasic,
                        bonus: userData.bonus,
                        OTrate: userData.OTrate
                    });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update user data using PUT request to the backend
            const response = await axios.put(
                `http://localhost:8070/payinfo/update`,formData 
                );

                 console.log("Information updated successfully:", response.data);
                 alert("Information Updated Successfully!");
                 window.location.href = `/AllPayInfo`;

        } catch (error) {
            console.error("Error updating Information:", error.response.data);
            alert("Error updating information. Please try again.");
        }
    };


    const formContainerStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        
      };
      
      const labelStyle = {
        marginBottom: '5px',
      };
      
      const inputStyle = {
        padding: '8px',
        width: '100%',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      };
      
      const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };

      
    return (
        <div style={formContainerStyle}>
            <h2>Update Payment Information</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Admin basic salary:</label>
                <input
                    type="text"
                    name="adminBasic"
                    value={formData.adminBasic}
                    onChange={handleChange}
                    style={inputStyle}
                /><br />

                <label style={labelStyle}>Manager Basic Salary:</label>
                <input
                    type="text"
                    name="managerBasic"
                    value={formData.managerBasic}
                    onChange={handleChange}
                    style={inputStyle}
                /><br />

                <label style={labelStyle}>Bonus:</label>
                <input
                    type="text"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleChange}
                    style={inputStyle}
                /><br />

                <label style={labelStyle}>OT Rate:</label>
                <input
                    type="text"
                    name="OTrate"
                    value={formData.OTrate}
                    onChange={handleChange}
                    style={inputStyle}
                /><br />

                

                <button type="submit" style={buttonStyle}>Save</button>
            </form>
        </div>
    );
};

export default UpdatePayInfo;
