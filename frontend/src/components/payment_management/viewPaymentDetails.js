import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsTrash, BsFilePdf, BsInfoCircleFill } from "react-icons/bs"; // Import Bootstrap icons
import { PDFDownloadLink } from '@react-pdf/renderer';
import { HolderDetailsPDF } from './HolderDetailsPDF';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


export default function DisplayHolderDetails() {
    const [holderDetails, setHolderDetails] = useState([]);
    const [filteredHolderDetails, setFilteredHolderDetails] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [selectedHolder, setSelectedHolder] = useState(null);
    const [totalCostByMonth, setTotalCostByMonth] = useState({});
    const [totalMonthlyCost, setTotalMonthlyCost] = useState(0);

    useEffect(() => {
        // Fetch holder details from the backend server
        axios.get("http://localhost:8070/paymentHolderDetails/n")
            .then(response => {
                setHolderDetails(response.data);
                setFilteredHolderDetails(response.data); // Initialize filtered data with all details
                calculateTotalCostByMonth(response.data); // Calculate total cost by month
                calculateTotalMonthlyCost(response.data); // Calculate total monthly cost
            })
            .catch(error => {
                console.error("Error fetching holder details:", error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    // Filter holder details based on search criteria
    useEffect(() => {
        const filteredDetails = holderDetails.filter(holder => {
            const nameMatch = holder.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            const monthMatch = holder.monthOfPayment.toLowerCase().includes(searchTerm.toLowerCase());
            const phoneMatch = holder.phoneNumber.includes(searchTerm);
            const nicMatch = holder.nic?.includes(searchTerm); // Filter by NIC
            return nameMatch || monthMatch || phoneMatch || nicMatch;
        });
        setFilteredHolderDetails(filteredDetails);
        calculateTotalCostByMonth(filteredDetails); // Recalculate total cost by month
        calculateTotalMonthlyCost(filteredDetails); // Recalculate total monthly cost
    }, [searchTerm, holderDetails]);

    const handleDelete = async (id, index) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this holder detail?");
            // Delete the holder detail from the backend server
            if (confirmDelete) {
                await axios.delete(`http://localhost:8070/paymentHolderDetails/deleten/${id}`);
                // Update the holderDetails state by filtering out the deleted holder
                setHolderDetails(holderDetails.filter(holder => holder._id !== id));
                alert("Holder detail deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting holder detail:", error);
            alert("Error occurred while deleting holder detail.");
        }
    };

    const handleShowDetails = (holder) => {
        setSelectedHolder(holder);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedHolder(null);
        setShowDetails(false);
    };

    // Function to calculate total cost by month
    const calculateTotalCostByMonth = (holderDetails) => {
        const costByMonth = {};
        holderDetails.forEach(holder => {
            const month = holder.monthOfPayment;
            costByMonth[month] = (costByMonth[month] || 0) + holder.monthlyCost;
        });
        setTotalCostByMonth(costByMonth);
    };

    // Function to calculate total monthly cost
    const calculateTotalMonthlyCost = (holderDetails) => {
        const totalCost = holderDetails.reduce((total, holder) => total + holder.monthlyCost, 0);
        setTotalMonthlyCost(totalCost);
    };

    return (
        <div className="container mt-5">
            <h2>Holder Details</h2>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by name, month of payment, phone number, or NIC..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="btn btn-danger">
                <PDFDownloadLink
                    document={<HolderDetailsPDF
                                    holderDetails={filteredHolderDetails}
                                    totalCostByMonth={totalCostByMonth}
                                    totalMonthlyCost={totalMonthlyCost}
                                />}
                    fileName="Payment_details.pdf"
                    style={{ textDecoration: 'none' }}
                >
                    {({ loading }) =>
                        loading ? 'Generating PDF...' : (
                            <>
                                <BsFilePdf style={{ marginRight: '5px' }} /> {/* Bootstrap PDF icon */}
                                <span style={{ color: 'white' }}>Generate Payment Details PDF</span>
                            </>
                        )
                    }
                </PDFDownloadLink>
            </button>
            <p className="total-items filled-box">
                <span style={{ color: 'green', fontWeight: 'bold' }}>Total Payment Items: {filteredHolderDetails.length}</span>
            </p> {/* Display total payment items */}
            <p className="total-items filled-box">
                <span style={{ color: 'blue', fontWeight: 'bold' }}>Total Monthly Cost: Rs.{totalMonthlyCost}</span>
            </p> {/* Display total monthly cost */}
          
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ color: 'green' }}>Customer Name</th>
                        <th style={{ color: 'green' }}>NIC</th>
                        <th style={{ color: 'green' }}>Phone Number</th>
                        <th style={{ color: 'green' }}>Email Address</th>
                        <th style={{ color: 'green' }}>Month of Payment</th>
                        <th style={{ color: 'green' }}>Total Monthly Cost</th>
                        <th style={{ color: 'green' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHolderDetails.map((holder, index) => (
                        <tr key={index}>
                            <td style={{ fontWeight: 'bold' }}>{holder.customerName}</td>
                            <td>{holder.nic}</td> {/* Display NIC */}
                            <td>{holder.phoneNumber}</td>
                            <td>{holder.EmailAddress}</td>
                            <td>{holder.monthOfPayment}</td>
                            <td style={{ color: holder.monthlyCost > 0 ? 'blue' : 'inherit',fontWeight: 'bold' }}>{holder.monthlyCost}</td>
                            <td>
                                <button 
                                    className="btn btn-link"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => handleDelete(holder._id, index)}
                                >
                                    <BsTrash style={{ color: hoveredIndex === index ? 'red' : 'inherit' }} />
                                </button>
                                <button 
                                    className="btn btn-link"
                                    onClick={() => handleShowDetails(holder)}
                                >
                                    <BsInfoCircleFill style={{ color: hoveredIndex === index ? 'blue' : 'inherit' }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
              {/* Display total cost by month */}
            <div>
                <h3 style={{ color: 'green' }}>Total Cost by Month</h3>
                <ul>
                    {Object.entries(totalCostByMonth).map(([month, cost]) => (
                        <li key={month}>
                            <strong>{month}:</strong> <span style={{ color: 'green' }}>Rs.{cost}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="/addn" className="btn btn-success mt-3">Go back to Home</Link>

            {/* Holder Details Modal */}
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Holder Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedHolder && (
                        <div>
                            <p><strong>Name:</strong> {selectedHolder.customerName}</p>
                            <p><strong>NIC:</strong> {selectedHolder.nic}</p>
                            <p><strong>Phone Number:</strong> {selectedHolder.phoneNumber}</p>
                            <p><strong>Email Address:</strong> {selectedHolder.EmailAddress}</p>
                            <p><strong>Month of Payment:</strong> {selectedHolder.monthOfPayment}</p>
                            <p><strong>Total Monthly Cost:</strong> Rs.{selectedHolder.monthlyCost}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
