//class component
/*import React, {Component} from 'react'
import axios from 'axios'

export default class AddRoom extends Component{

  constructor(props){
    super(props);
    this.state={
      roomID:"",
      noOfBeds:"",
      bathroomType: "",
      image:"",
      assignedBeds: "",
      availabilityStatus: ""
    }

  }

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }
  
  onSubmit=(e) =>{
    e.preventDefault();

    const {roomID,noOfBeds,bathroomType,image,assignedBeds,availabilityStatus } = this.state;

    const data={
      roomID:roomID,
      noOfBeds:noOfBeds,
      bathroomType:bathroomType,
      image:image,
      assignedBeds:assignedBeds,
      availabilityStatus:availabilityStatus
    }

    console.log(data)

    axios.post("http://localhost:8070/rooms/addRoom",data).then((res)=>{
      if(res.data){
        this.setState(
          {
            roomID:"",
            noOfBeds:"",
            bathroomType: "",
            image:"",
            assignedBeds: "",
            availabilityStatus: ""
          }
        )
      }
    })
  }
 
    render(){
      return(
        
        <div className="col-md-8 mt-4 mx auto">
          <h1 className="h3 mb-3 font-weight-normal">Add Room</h1>
              <form className="needs-validation" noValidate>
                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Room ID</label>
                  <input type="text" 
                  class="form-control" 
                  name="roomID"  
                  placeholder="Enter Room ID"
                  value={this.state.roomID}
                  onChange={this.handleInputChange}/>
                </div>
                
                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Number of Beds</label>
                  <input type="text" 
                  class="form-control" 
                  name="noOfBeds"  
                  placeholder="Enter bed count"
                  value={this.state.noOfBeds}
                  onChange={this.handleInputChange}/>
                </div>

                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Bathroom Type</label>
                  <input type="text" 
                  class="form-control" 
                  name="bathroomType"  
                  placeholder="Enter bathroom type"
                  value={this.state.bathroomType}
                  onChange={this.handleInputChange}/>
                </div>

                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Image</label>
                  <input type="text" 
                  class="form-control" 
                  name="image"  
                  placeholder="Enter image url"
                  value={this.state.image}
                  onChange={this.handleInputChange}/>
                </div>

                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Assigned Beds</label>
                  <input type="text" 
                  class="form-control" 
                  name="assignedBeds"  
                  placeholder="Enter initial assigned bed count"
                  value={this.state.assignedBeds}
                  onChange={this.handleInputChange}/>
                </div>

                <div class="form-group" style={{marginBotton:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Availability Status</label>
                  <input type="text" 
                  class="form-control" 
                  name="availabilityStatus"  
                  placeholder="Enter initial availability status"
                  value={this.state.availabilityStatus}
                  onChange={this.handleInputChange}/>
                </div>
                  

                  <button  className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                     <i className="far fa-check-square"></i>
                     &nbsp;Save
                  </button>
              </form>
        </div>
      )
  
      
    }
      
}*/


/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const defaultAssignedBeds = 0;
  const defaultAvailabilityStatus = 'Available';
  const [roomData, setRoomData] = useState({
    roomID: '',
    numOfBeds: '',
    bathroomType: '',
    image: '',
    assignedBeds: defaultAssignedBeds,
    availabilityStatus: defaultAvailabilityStatus
  });

  const navigate = useNavigate(); // Initialize navigate function from react-router-dom
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8888/rooms/addRoom', roomData)
      .then(res => {
        console.log(res.data); // Assuming backend sends "Room Added" on success
        alert("New Room added successfully");
  
        navigate('/'); // Redirect to the home page
      })
      .catch(err => {
        console.error('Error adding room:', err);
        // Handle error, show error message
      });
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add Room</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter Room ID"
            value={roomData.roomID}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Number of Beds</label>
          <input type="text"
            className="form-control"
            name="numOfBeds"
            placeholder="Enter bed count"
            value={roomData.numOfBeds}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Bathroom Type</label>
          <input type="text"
            className="form-control"
            name="bathroomType"
            placeholder="Enter bathroom type"
            value={roomData.bathroomType}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Image</label>
          <input type="text"
            className="form-control"
            name="image"
            placeholder="Enter image url"
            value={roomData.image}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Assigned Beds</label>
          <input type="text"
            className="form-control"
            name="assignedBeds"
            value={roomData.assignedBeds}
            readOnly  />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            name="availabilityStatus"
            value={roomData.availabilityStatus}
           readOnly />
        </div>

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Save
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const defaultAssignedBeds = 0;
  const defaultAvailabilityStatus = 'Available';
  const [roomData, setRoomData] = useState({
    roomID: '',
    numOfBeds: '',
    bathroomType: '',
    image: '',
    assignedBeds: defaultAssignedBeds,
    availabilityStatus: defaultAvailabilityStatus
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();//prevent default form submission
    let errors = {};//object to store validation errors

    if (!roomData.roomID || !/R\d{2}/.test(roomData.roomID)) {
      errors.roomID = "Room ID is required and should be in 'R01' format";
    }

    if (!roomData.numOfBeds || isNaN(roomData.numOfBeds)) {
      errors.numOfBeds = "Bed count is required and should be a number";
    }

    if (!roomData.bathroomType || !/^[a-zA-Z]+$/.test(roomData.bathroomType)) {
      errors.bathroomType = "Bathroom type is required and should contain only letters";
    }

    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:8070/rooms/addRoom', roomData)
        .then(res => {
          console.log(res.data);
          alert("New Room added successfully");
          navigate('/roomHome');
        })
        .catch(err => {
          console.error('Error adding room:', err);
          // Handle error, show error message
        });
    } else {
      setErrors(errors);//validation error
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add Room</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter Room ID"
            value={roomData.roomID}
            onChange={handleChange} />
          {errors.roomID && <p style={{ color: 'red' }}>{errors.roomID}</p>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Number of Beds</label>
          <input type="text"
            className="form-control"
            name="numOfBeds"
            placeholder="Enter bed count"
            value={roomData.numOfBeds}
            onChange={handleChange} />
          {errors.numOfBeds && <p style={{ color: 'red' }}>{errors.numOfBeds}</p>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Bathroom Type</label>
          <input type="text"
            className="form-control"
            name="bathroomType"
            placeholder="Enter bathroom type"
            value={roomData.bathroomType}
            onChange={handleChange} />
          {errors.bathroomType && <p style={{ color: 'red' }}>{errors.bathroomType}</p>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Image</label>
          <input type="text"
            className="form-control"
            name="image"
            placeholder="Enter image url"
            value={roomData.image}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Assigned Beds</label>
          <input type="text"
            className="form-control"
            name="assignedBeds"
            value={roomData.assignedBeds}
            readOnly  />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            name="availabilityStatus"
            value={roomData.availabilityStatus}
            readOnly />
        </div>

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Save
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;


