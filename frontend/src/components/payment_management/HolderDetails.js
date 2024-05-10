import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

export default function HolderDetails(){

    const [customerName, setCustomerName] = useState("");
    const [nic, setNic] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [EmailAddress, setEmailAddress] = useState("");
    const [monthOfPayment, setMonthOfPayment] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [monthlyCost, setMonthlyCost] = useState(0); // Initialize monthly cost state
    const [alertMessage, setAlertMessage] = useState(null); // State for alert message
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

    const navigate = useNavigate();

    // Fetch monthly cost details when the component mounts
    useEffect(() => {
        axios.get("http://localhost:8070/monthlyCostAddDetails/cost")
            .then(response => {
                // Sum up all monthly costs
                const totalMonthlyCost = response.data.reduce((total, cost) => cost.monthlyCost, 0);
                setMonthlyCost(totalMonthlyCost);
            })
            .catch(error => {
                console.error("Error fetching monthly cost details:", error);
            });
    }, []);

    function handleCustomerNameChange(event) {
        // Allow only letters and spaces
        if (!/^[A-Za-z\s]*$/.test(event.target.value)) {
            setCustomerName(event.target.value.replace(/[^A-Za-z\s]/gi, ''));
        } else {
            setCustomerName(event.target.value);
        }
    }

    function handleNicChange(event) {
        // Allow only up to 12 digits
        const input = event.target.value.substring(0, 12);
        setNic(input);
    }

    function sendData(e){
        e.preventDefault();

        const holderDetails ={
            customerName,
            phoneNumber,
            EmailAddress,
            monthOfPayment,
            monthlyCost ,
            nic
        }
        
        // Disable form submission while processing
        setIsSubmitting(true);

        axios.post("http://localhost:8070/paymentHolderDetails/addn", holderDetails)
            .then(() => {
                // Set alert message for successful payment
                alert("Payment successful...");
                // Navigate to payment success page with payment details as URL parameters
                navigate(`/paymentSuccess?customerName=${encodeURIComponent(customerName)}&phoneNumber=${encodeURIComponent(phoneNumber)}&EmailAddress=${encodeURIComponent(EmailAddress)}&monthOfPayment=${encodeURIComponent(monthOfPayment)}&monthlyCost=${encodeURIComponent(monthlyCost)}`);
            })
            .catch((err) => {
                // Set alert message for payment error
                setAlertMessage("An error occurred while processing the payment.");
            })
            .finally(() => {
                // Reset form data and set formSubmitted to true
                setCustomerName("");
                setNic("");
                setPhoneNumber("");
                setEmailAddress("");
                setMonthOfPayment("");
                setFormSubmitted(true);
                // Enable form submission after processing
                setIsSubmitting(false);
            });
    };

    // Reset form data after 3 seconds if form has been submitted
    if (formSubmitted) {
        setTimeout(() => {
          setFormSubmitted(false);
          setAlertMessage(null);
        }, 3000);
    }

    return (
        <div className="container mt-5">
            {/* Display alert message */}
            {alertMessage && (
                <Alert variant="danger" onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <div className="text-end mb-3">
                <h5 className="text-muted">
                    <span style={{ color: "darkgreen" }}>Total Monthly Cost: </span>
                    <span style={{ color: "lightgreen" }}>Rs</span>
                    <span style={{ color: "lightgreen" }}>{monthlyCost}</span>
                    <span style={{ color: "lightgreen" }}>/-</span>
                </h5>
            </div>
            <h2>Holder Details Form</h2>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Customer Name:</label>
                    <input 
                        type="text"
                        className="form-control" 
                        id="customerName" 
                        value={customerName} 
                        onChange={handleCustomerNameChange} 
                        required 
                        disabled={isSubmitting} // Disable field while submitting
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="nic" className="form-label">NIC:</label>
                    <input 
                        type="text"
                        className="form-control" 
                        id="nic" 
                        value={nic} 
                        onChange={handleNicChange} 
                        required 
                        disabled={isSubmitting} // Disable field while submitting
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phoneNumber" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required 
                        disabled={isSubmitting} // Disable field while submitting
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">Email Address:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="emailAddress" 
                        value={EmailAddress} 
                        onChange={(e) => setEmailAddress(e.target.value)} 
                        required 
                        disabled={isSubmitting} // Disable field while submitting
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="monthOfPayment" className="form-label">Month of Payment:</label>
                    <select 
                        className="form-select" 
                        id="monthOfPayment" 
                        value={monthOfPayment} 
                        onChange={(e) => setMonthOfPayment(e.target.value)} 
                        required 
                        disabled={isSubmitting} // Disable field while submitting
                    >
                        <option value="">Select month...</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="Octomber">Octomber</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
                </div>
            </form>
            <div className="mt-3">
                <Link
                    to={{
                        pathname: "/checkpage",
                        state: {
                            customerName,
                            phoneNumber,
                            EmailAddress,
                            monthOfPayment,
                            monthlyCost
                        }
                    }}
                    className="btn btn-primary"
                >
                    Payment History
                </Link>
            </div>
        </div>
    );
}
