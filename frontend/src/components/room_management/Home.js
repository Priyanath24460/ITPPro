//without search
/*import React, {Component} from 'react';
import axios from 'axios';


export default class Home extends Component{
  constructor(props){
    super(props);

    this.state={
      rooms:[]
    };

  }
  
  componentDidMount(){
    this.retrieveRooms();
  }

  retrieveRooms(){
    axios.get("http://localhost:8888/rooms/getRooms").then(res =>{
      console.log(res.data);
      this.setState({
           rooms:res.data
        });

      }).catch(err =>{
        console.log(err);
      });
  }


  render(){
    return(
      <div className="container">
        <h2>Room Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Image</th>
              <th scope="col">Assigned Beds</th>
              <th scope="col">Availability Status</th>
            </tr>
          </thead>
              <tbody>
                  {this.state.rooms.map((room) =>(
                    <tr key={room.roomID}>

                      <td>{room.roomID}</td>
                      <td>{room.numOfBeds}</td>
                      <td>{room.bathroomType}</td>
                      <td>{room.image}</td>
                      <td>{room.assignedBeds}</td>
                      <td>{room.availabilityStatus}</td>
                      <td>
                        <a className="btn btn-primary" href={`/getRoom/${room.roomID}`}>
                        <i class="fa-solid fa-eye"></i>&nbsp;View
                        </a>
                        &nbsp;
                        <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="/addResident">
                          <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                        </a>
                      </td>
                    </tr>
                  ))}

              </tbody>
        </table>

        <button className="btn btn-success"><a href="/addRoom" style={{textDecoration:'none' ,color:'white'}}>Add New Room</a></button>
      </div>
    )
  }
}*/

//with search all variables
/*import React, { Component } from 'react';
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
    axios.get("http://localhost:8888/rooms/getRooms")
      .then(res => {
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // You can perform search operation here, such as filtering rooms based on searchQuery
    // For simplicity, let's just log the searchQuery for now
    console.log("Search query:", this.state.searchQuery);
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { rooms, searchQuery } = this.state;
    const filteredRooms = rooms.filter(room => {
      return (
        room.roomID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.availabilityStatus.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return (
      <div className="container">
        <h2>Room Details</h2>
        <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Room ID or Availability Status"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Image</th>
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
                <td>{room.image}</td>
                <td>{room.assignedBeds}</td>
                <td>{room.availabilityStatus}</td>
                <td>
                  <a className="btn btn-primary" href={`/getRoom/${room.roomID}`}>
                    <i className="fa-solid fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;
                  <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="/addResident">
                    <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/addRoom" style={{textDecoration:'none' ,color:'white'}}>Add New Room</a></button>
      </div>
    );
  }
}*/

//with search only roomid and availability status
/*import React, { Component } from 'react';
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
    axios.get("http://localhost:8888/rooms/getRooms")
      .then(res => {
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
      <div className="container">
        <h2>Room Details</h2>
        <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Room ID or Availability Status"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Image</th>
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
                <td>{room.image}</td>
                <td>{room.assignedBeds}</td>
                <td>{room.availabilityStatus}</td>
                <td>
                  <a className="btn btn-primary" href={`/getRoom/${room.roomID}`}>
                    <i className="fa-solid fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;
                  <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="/addResident">
                    <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/addRoom" style={{textDecoration:'none' ,color:'white'}}>Add New Room</a></button>
      </div>
    );
  }
}*/

//with delete room
/*import React, { Component } from 'react';
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
    axios.get("http://localhost:8888/rooms/getRooms")
      .then(res => {
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = (roomID) => {
    axios.delete(`http://localhost:8888/rooms/deleteRoom/${roomID}`)
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
      <div className="container">
        <h2>Room Details</h2>
        <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Room ID or Availability Status"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Image</th>
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
                <td>{room.image}</td>
                <td>{room.assignedBeds}</td>
                <td>{room.availabilityStatus}</td>
                <td>
                  <a className="btn btn-primary" href={`/getRoom/${room.roomID}`}>
                    <i className="fa-solid fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;
                  <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(room.roomID)}
                    >
                      <i className="fa-solid fa-trash"></i>&nbsp;Delete
                    </button>
                  &nbsp;
                  <a className="btn btn-info" href="/addResident">
                    <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/addRoom" style={{textDecoration:'none' ,color:'white'}}>Add New Room</a></button>
      </div>
    );
  }
}*/

//with pass roomid to resident assign
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
      <div className="container">
        <h2>Room Details</h2>
        <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Room ID or Availability Status"
            aria-label="Search"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Number of Beds</th>
              <th scope="col">Bathroom Type</th>
              <th scope="col">Image</th>
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
                <td>{room.image}</td>
                <td>{room.assignedBeds}</td>
                <td>{room.availabilityStatus}</td>
                <td>
                  <a className="btn btn-primary" href={`/getRoom/${room.roomID}`}>
                    <i className="fa-solid fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;
                  <a className="btn btn-warning" href={`/updateRoom/${room.roomID}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(room.roomID)}
                    >
                      <i className="fa-solid fa-trash"></i>&nbsp;Delete
                    </button>
                  &nbsp;
                  <a className="btn btn-info" href={`/addResident?roomId=${room.roomID}`}>
                    <i className="fa-solid fa-user"></i>&nbsp;Assign Resident
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success"><a href="/addRoom" style={{textDecoration:'none' ,color:'white'}}>Add New Room</a></button>
      </div>
    );
  }
}

