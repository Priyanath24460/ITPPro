import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SalaryForm() {
    const [name, setName] = useState("");
    const [nic, setNIC] = useState("");
    const [position, setPosition] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [bonus, setBonus] = useState("");
    const [OTHours, setOTHours] = useState("");
    const [OTRate, setOTRate] = useState("");
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        // Fetch basic salary, bonus, and OT rate from the database
        fetchPayInfo();
    }, []);

    const fetchPayInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8070/payInfo");
            const payInfo = response.data[0]; // Assuming there's only one record
            setBasicSalary(payInfo.adminBasic); // Assuming adminBasic is the basic salary
            setBonus(payInfo.bonus);
            setOTRate(payInfo.OTrate);
        } catch (error) {
            console.error("Error fetching pay information:", error);
        }
    };

    const calculateTotalSalary = () => {
        // Assuming OT rate is provided per hour
        const OTSalary = OTHours * OTRate;
        const total = parseInt(basicSalary) + parseInt(bonus) + OTSalary;
        setTotalSalary(total);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        calculateTotalSalary();

        const salaryDetails = {
            name,
            nic,
            position,
            basicSalary,
            bonus,
            OTHours,
            OTRate,
            salary: totalSalary // Include the salary field here
        };

        try {
            await axios.post("http://localhost:8070/payRoll/addPayRoll", salaryDetails);
            alert("Salary details added successfully");
            navigate('/PayRoll');
        } catch (error) {
            alert("Error adding salary details");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="nic" className="form-label">NIC:</label>
                    <input type="text" className="form-control" id="nic" value={nic} onChange={(e) => setNIC(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="position" className="form-label">Position:</label>
                    <input type="text" className="form-control" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="basicSalary" className="form-label">Basic Salary:</label>
                    <input type="text" className="form-control" id="basicSalary" value={basicSalary} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="bonus" className="form-label">Bonus:</label>
                    <input type="text" className="form-control" id="bonus" value={bonus} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="OTHours" className="form-label">OT Hours:</label>
                    <input type="number" className="form-control" id="OTHours" value={OTHours} onChange={(e) => setOTHours(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="OTRate" className="form-label">OT Rate:</label>
                    <input type="text" className="form-control" id="OTRate" value={OTRate} disabled />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
