import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

export default class AllResidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residents: [],
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.retrieveResidents();
  }

  retrieveResidents() {
    axios.get("http://localhost:8070/residents/getResidents")
      .then(res => {
        this.setState({ residents: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = (NIC) => {
    axios.delete(`http://localhost:8070/residents/deleteResident/${NIC}`)
      .then(() => {
        alert("Resident deleted successfully");
        this.retrieveResidents(); // Refresh resident list
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
  };

  generatePDF = () => {
    const { residents, searchQuery } = this.state;
    const filteredResidents = residents.filter(resident => {
      return (
        resident.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.resName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.roomID.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Create new jsPDF instance
    const pdf = new jsPDF();
    
    // Set table header
    const tableColumn = ["Resident NIC", "Resident Name", "Room ID"];
    const tableRows = [];

    // Push data into table rows
    filteredResidents.forEach(resident => {
      const rowData = [
        resident.NIC,
        resident.resName,
        resident.roomID
      ];
      tableRows.push(rowData);
    });

    // Add table to PDF
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows
    });

    // Save the PDF
    pdf.save('residentsAssignment_report.pdf');
  };

  render() {
    const { residents, searchQuery } = this.state;
    const filteredResidents = residents.filter(resident => {
      return (
        resident.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.resName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.roomID.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return (
      <div className="container1">
       <h2></h2>
        <form className="d-flex1" role="search" onSubmit={this.handleSearchSubmit}  style={{ width: '80%', fontSize: '16px', marginLeft:300 }}>
          <input
            className="form-control me-2 1"
            type="search"
            placeholder="Search by NIC, Name, or Room ID"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          
        </form>
        <div id="table-container">
          <table style={{ width: '80%', fontSize: '16px', marginLeft:300 }}>
            <thead>
              <tr>
                <th scope="col">Resident NIC</th>
                <th scope="col">Resident Name</th>
                <th scope="col">Room ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map(resident => (
                <tr key={resident.NIC}>
                  <td>{resident.NIC}</td>
                  <td>{resident.resName}</td>
                  <td>{resident.roomID}</td>
                  <td>
                    
                    <a className="btn btn-warning" href={`/updateResident/${resident.NIC}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(resident.NIC)}
                    >
                      <i className="fa-solid fa-trash"></i>&nbsp;Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button style={{ backgroundColor: 'green', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer',marginLeft:'300px',marginTop:'20px' }} onClick={this.generatePDF}>Generate PDF Report</button>

      </div>
    );
  }
}
