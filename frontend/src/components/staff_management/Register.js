import React, { useState } from "react";
import axios from "axios";
import './staffCss/Register.css';
import { useNavigate, Link } from "react-router-dom";

const roles = [
    "Admin",
    "Staff Manager",
    "Medical Manager",
    "Event and Reservation Coordinator",
    "Meal Manager",
    "Financial Manager"
];

export default function Register() {
    const [basicSalary, setBasicSalary] = useState("");
    const [role, setRole] = useState("");
    const [bonus, setBonus] = useState("");
    const [OTrate, setOTrate] = useState("");
    const navigate = useNavigate();

    // Validate input as a number
    function validateNumber(input) {
        const regex = /^[0-9]+$/; // Only numbers allowed
        return regex.test(input);
    }

    // Handle form submission
    function sendData(e) {
        e.preventDefault();

        // Validate basic salary input
        if (!validateNumber(basicSalary)) {
            alert("Basic salary can only be a number.");
            return;
        }

        // Validate OT rate input
        if (OTrate < 0 ) {
            alert("OT rate cannot be negative.");
            return;
        }

        // Create a paymentInfo object with the form data
        const paymentInfo = {
            basicSalary,
            role,
            bonus,
            OTrate
        };

        // Send a POST request to the server to add the payment information
        axios.post("http://localhost:8070/payInfo/add", paymentInfo)
            .then(() => {
                alert("Information added successfully");
                navigate("/AllPayInfo");
            })
            .catch((err) => {
                alert(`Failed to add information: ${err.message}`);
            });
    }

    // Handle keydown event to prevent typing a negative sign
    function preventNegativeInput(e) {
        // If the key pressed is the minus sign, prevent the default action
        if (e.key === '-') {
            e.preventDefault();
        }
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="basicSalary" className="form-label">
                        Basic Salary:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="basicSalary"
                        placeholder="Enter Basic Salary"
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(e.target.value)}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        required
                    />
                    {!validateNumber(basicSalary) && (
                        <p className="error-message">Basic salary can only be a number.</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="role" className="form-label">
                        Role:
                    </label>
                    <select
                        className="form-control"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select a role</option>
                        {roles.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="bonus" className="form-label">
                        Bonus:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="bonus"
                        placeholder="Enter Bonus"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        required
                    />
                    {!validateNumber(bonus) && (
                        <p className="error-message">Bonus can only be a number.</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="OTrate" className="form-label">
                        OT Rate:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="OTrate"
                        placeholder="Enter OT Rate"
                        value={OTrate}
                        onChange={(e) => setOTrate(e.target.value)}
                        onKeyDown={preventNegativeInput} // Prevent negative input
                        min="0" // Minimum value is 0
                        required
                    />
                    {OTrate < 0 || OTrate >= 100 && (
                        <p className="error-message">OT rate must be between 0 and 99.</p>
                    )}
                </div>

                <div className="button-group">
                    {/* Back button */}
                    <Link to="/staffdashboard" className="btn btn-backto-staffdb">
                    &larr;
                    </Link>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="btn btn-primary-submit-payinfo"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}


