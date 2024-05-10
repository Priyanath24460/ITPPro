import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      searchQuery: ''
    };
  }
  
  componentDidMount() {
    this.retrieveRooms();
  }

  retrieveRooms() {
    axios.get("http://localhost:8070/rooms/getRooms")
      .then(res => {
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = (roomID) => {
    axios.delete(`http://localhost:8070/rooms/deleteRoom/${roomID}`)
      .then(() => {
        alert("Room deleted successfully");
        this.retrieveRooms(); // Refresh resident list
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    console.log("Search query:", this.state.searchQuery);
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { rooms, searchQuery } = this.state;
    const filteredRooms = rooms.filter(room => {
      const roomIDMatch = room.roomID.toLowerCase().includes(searchQuery.toLowerCase());
      const availabilityMatch = room.availabilityStatus.trim().toLowerCase() === searchQuery.trim().toLowerCase();
      return roomIDMatch || availabilityMatch;
    });

    return (
      <div className="container1">
        <h2>Room Details</h2>
        <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit} style={{ width: '80%', fontSize: '16px', marginLeft: 300 }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Room ID or Availability Status"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
        </form>
        <table style={{ width: '80%', fontSize: '16px', marginLeft: 300 }}>
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Description</th> {/* Changed from "Image" to "Description" */}
              <th scope="col">Additional Item</th> {/* Added new column */}
              <th scope="col">Assigned Beds</th>
              <th scope="col">Availability Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map(room => (
              <tr key={room.roomID}>
                <td>{room.roomID}</td>
                <td>{room.numOfBeds}</td>
                <td>{room.bathroomType}</td>
                <td>{room.description}</td> {/* Changed from "image" to "description" */}
                <td>{room.additionalItem}</td> {/* Render additional item */}
                <td>{room.assignedBeds}</td>
                <td>{room.availabilityStatus}</td>
                <td>
                  <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(room.roomID)}
                  >
                    <i className="fa-solid fa-trash"></i>&nbsp;Delete
                  </button>
                  <a className="btn btn-info" href={`/addResident?roomId=${room.roomID}`}>
                    <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/addRoom" style={{ textDecoration: 'none', color: 'white' }}>Add New Room</a></button>
      </div>
    );
  }
}
