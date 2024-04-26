import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllCustomers() {
  const [customersA, setCustomersA] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Function to fetch customers from the backend
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/customerA/");
        setCustomersA(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        alert("An error occurred while fetching customers");
      }
    };

    // Fetch customers when the component mounts
    fetchCustomers();
  }, []);

  const handleDelete = async (nic) => {
    try {
      await axios.delete(`http://localhost:8070/customerA/delete/${nic}`);
      setCustomersA(customersA.filter((customer) => customer.nic !== nic));
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("An error occurred while deleting customer");
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCustomers = customersA.filter(
    (customer) =>
      customer.name &&
      customer.name.toLowerCase().includes(searchInput.toLowerCase())
  );

// Function to generate PDF
const generatePDF = async () => {
  try {
    // Send a POST request to the backend route for generating PDF
    const response = await axios.post("http://localhost:8070/userpdf/generateuserpdf", {
      customers: filteredCustomers,
    });

    const pdfData = response.data;

    // Log the received PDF data
    console.log("Received PDF data:", pdfData);

    // Create Blob from base64 PDF data
    const blob = new Blob([pdfData], { type: 'application/pdf' });

    // Create object URL from Blob
    const url = URL.createObjectURL(blob);

    // Log the URL created from Blob
    console.log("Object URL for PDF:", url);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.pdf';
    a.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating PDF");
  }
};


  return (
    <div className="container">
      <h1>All Customers</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />
      <button onClick={generatePDF}>Generate PDF</button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>NIC</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.nic}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.nic}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleDelete(customer.nic)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
