import React, { useState, useEffect } from "react";
import axios from "axios";


export default function AllCustomersViewGuardian() {
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

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCustomers = customersA.filter(
    (customer) =>
      customer.name &&
      customer.name.toLowerCase().includes(searchInput.toLowerCase())
  );

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
     
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.nic}>
              <td>{customer.name}</td>
              <td>{customer.nic}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
