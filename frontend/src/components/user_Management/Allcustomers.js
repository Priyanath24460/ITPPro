import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllCustomers() {
  const [customersA, setCustomersA] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    function getCustomersA() {
      axios.get("http://localhost:8070/customerA/").then((res) => {
        setCustomersA(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getCustomersA();
  }, []);

  const handleDelete = async (nic) => {
    try {
      await axios.delete(`http://localhost:8070/customerA/delete/${nic}`);
      // Update the state to re-render without the deleted user
      setCustomersA(customersA.filter(customer => customer.nic !== nic));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCustomers = customersA.filter((customer) =>
    (customer.name && customer.name.toLowerCase().includes(searchInput.toLowerCase())) ||
    (customer.nic && customer.nic.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>All Customers</h1>
      <input
        type="text"
        placeholder="Search by name or NIC"
        value={searchInput}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
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
                <Link to={`/view/${customer.nic}`}>
                  <button>View</button>
                </Link>
                <button onClick={() => handleDelete(customer.nic)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
