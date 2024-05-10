import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsTrash, BsPencil } from "react-icons/bs";

export default function AddMonthlyCost(){

    const [monthlyCost, setMonthlyCost] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [monthlyCostDetails, setMonthlyCostDetails] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
 
    // Function to fetch monthly cost details
    const fetchMonthlyCostDetails = () => {
        axios.get("http://localhost:8070/monthlyCostAddDetails/cost")
            .then(response => {
                setMonthlyCostDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching monthly cost details:", error);
            });
    };

    // Retrieve monthly cost details when the component mounts
    useEffect(() => {
        fetchMonthlyCostDetails();
    }, []);

    function sendData(e){
        e.preventDefault();

        const newMonthlyCost = {
            monthlyCost
        };

        axios.post("http://localhost:8070/monthlyCostAddDetails/addcost", newMonthlyCost)
            .then(() => {
                alert("Monthly Cost details added...");
                setFormSubmitted(true);
                setMonthlyCost(""); // Resetting input value after successful submission
                fetchMonthlyCostDetails(); // Refresh monthly cost details after adding
            })
            .catch((err) => {
                alert("Error occurred while adding Monthly Cost details..");
            });
    }

    // Function to handle delete monthly cost
    const handleDeleteMonthlyCost = (id) => {
        axios.delete(`http://localhost:8070/monthlyCostAddDetails/deletecost/${id}`)
            .then(() => {
                alert("Monthly Cost deleted successfully.");
                fetchMonthlyCostDetails(); // Refresh monthly cost details after deleting
            })
            .catch((err) => {
                alert("Error occurred while deleting Monthly Cost.");
            });
    };

    // Function to handle update monthly cost
    const handleUpdateMonthlyCost = (id, index) => {
        if (editValue.trim() === "") {
            alert("Please enter a valid monthly cost.");
            return;
        }

        axios.put(`http://localhost:8070/monthlyCostAddDetails/updatecost/${id}`, { monthlyCost: editValue })
            .then(() => {
                alert("Monthly Cost updated successfully.");
                setEditIndex(null); // Reset edit index
                fetchMonthlyCostDetails(); // Refresh monthly cost details after updating
            })
            .catch((err) => {
                alert("Error occurred while updating Monthly Cost.");
            });
    };

    // Reset form data after 3 seconds if form has been submitted
    if (formSubmitted) {
        setTimeout(() => {
            setFormSubmitted(false);
        }, 3000);
    }

    return(
        <div className="container mt-5">
            <h2>Add Monthly Cost</h2>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="monthlyCost" className="form-label">Monthly Cost</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="monthlyCost" 
                        value={monthlyCost} 
                        onChange={(e) => setMonthlyCost(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {formSubmitted && <p className="mt-3 text-success">Monthly Payment Added successfully!</p>}
            
            <div className="border p-3 mt-3">
                <h2>Monthly Cost Details</h2>
                <ul>
                {monthlyCostDetails.map((cost, index) => (
                        <li key={index}>
                            {index === editIndex ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={editValue} 
                                        onChange={(e) => setEditValue(e.target.value)} 
                                    />
                                    <BsPencil onClick={() => handleUpdateMonthlyCost(cost._id, index)} className="text-primary me-2" style={{ cursor: 'pointer' }} />
                                </>
                            ) : (
                                <>
                                    {cost.monthlyCost} 
                                    <BsTrash onClick={() => handleDeleteMonthlyCost(cost._id)} className="text-danger ms-2" style={{ cursor: 'pointer' }} />
                                    <BsPencil onClick={() => {
                                        setEditIndex(index); 
                                        setEditValue(cost.monthlyCost);
                                    }} className="text-primary ms-2" style={{ cursor: 'pointer' }} />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
            <Link to="/addn" className="btn btn-success mt-3">Go back</Link>
        </div>
    );
}
