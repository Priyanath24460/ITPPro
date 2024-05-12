import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export default function AllCustomers() {
  const [customersA, setCustomersA] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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

  useEffect(() => {
    // Filter customers based on search input
    const filtered = customersA.filter(
      (customer) =>
        customer.name &&
        customer.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customersA, searchInput]);

  const handleDelete = async (nic) => {
    try {
      // Delete customer
      await axios.delete(`http://localhost:8070/customerA/delete/${nic}`);
  
      // Delete patient
      await deletePatient(nic);
  
      // Update state
      setCustomersA(customersA.filter((customer) => customer.nic !== nic));
    } catch (err) {
      console.error("Error deleting customer and patient:", err);
      alert("An error occurred while deleting customer and patient");
    }
  };
  
  
  // medical data patient delete
  const deletePatient = async (nic) => {
    try {
      await axios.delete(`http://localhost:8070/patient/delete`, { data: { nic: nic } });
    } catch (err) {
      console.error("Error deleting patient:", err);
      
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to generate PDF receipt for individual customer
  const generatePDF = (customer) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Customer Details", 10, 10);
    doc.text(`Name: ${customer.name}`, 10, 20);
    doc.text(`NIC: ${customer.nic}`, 10, 30);

    // Save the PDF
    doc.save(`${customer.name}_details.pdf`);
  };

// Function to generate summary report PDF for all customers
const generateSummaryPDF = () => {
  const doc = new jsPDF();
  
  // Set font size and style
  doc.setFontSize(12);
  
  // Header
  const reportDate = new Date().toLocaleDateString(); // Current date
  const preparedBy = [
      'Prepared By:',
      'Admin',
  ];
  
  // Left side of the header
  doc.text(`Date: ${reportDate}`, 14, 20);
  preparedBy.forEach((line, index) => {
      doc.text(line, 14, 30 + (index * 10));
  });
  
  // Right side of the header
  doc.setFontSize(16);
  doc.setTextColor('#006400'); // Dark green color
  doc.text('Leisure Home', 150, 20);
  doc.setFontSize(10);
  doc.text('Human Cre Center', 150, 25);
  
  // Add a horizontal line below the header
  doc.setDrawColor(0); // Set line color to black
  doc.line(14, 45, doc.internal.pageSize.getWidth() - 14, 45);
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor('#006400'); // Dark green color
  doc.text('Summary Report of All Customers', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
  
  // Introduction
  doc.setTextColor(0); // Reset text color to black
  doc.setFontSize(12);
  doc.text('This report provides a summary of all customers.', 14, 65);
  
// Table for Customer Details
const tableData = filteredCustomers.map(customer => [customer.name, customer.nic]);
doc.autoTable({
    startY: 75,
    head: [['Name', 'NIC']],
    body: tableData,
    theme: 'grid',
    styles: {
        fontSize: 10,
        cellPadding: 2,
       
    },
    columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
    },
    margin: { top: 85 },
});
  
  // Save the PDF
  doc.save('all_customers_summary.pdf');
};



return (
  <div className="dark-green-container">
    <div className="table-container">
      <div className="grey-container">
        <h1>Registered Elders</h1>
        <div className="search-container-customer">
        <input
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input-customer"
        />
        </div>
        <table className="table-style">
          <thead>
            <tr>
              <th className="table-header-style">Name</th>
              <th className="table-header-style">NIC</th>
              <th className="table-header-style">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.nic}>
                <td className="table-data-style">{customer.name}</td>
                <td className="table-data-style">{customer.nic}</td>
                <td className="table-data-style">
                  <div className="actions">
                  <button onClick={() => handleDelete(customer.nic)} className="delete-button">
                    Delete
                  </button>
                  <button onClick={() => generatePDF(customer)} className="generate-pdf-button-allcustomers">
                    Generate PDF
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="generate-report-button-container">
      <button onClick={generateSummaryPDF} className="pdfbtn">  + Generate Summary Report</button>
    </div>
  </div>
);
}
