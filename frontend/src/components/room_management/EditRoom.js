/*import React, {Component} from 'react'

export default class EditRoom extends Component{


  render(){
      
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
            placeholder="Enter initial assigned bed count"
            value={roomData.assignedBeds}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            name="availabilityStatus"
            placeholder="Enter initial availability status"
            value={roomData.availabilityStatus}
            onChange={handleChange} />
        </div>

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Save
        </button>
      </form>
    </div>
  );
  
      
    }
      
}*/


//can edit assigend beds and availability also
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditRoomForm = () => {
  const [roomData, setRoomData] = useState({
    roomID: '',
    numOfBeds: '',
    bathroomType: '',
    image: '',
    assignedBeds: '',
    availabilityStatus: ''
  });

  const { roomID } = useParams();

  useEffect(() => {
    if (roomID) {
      axios.get(`http://localhost:8070/rooms/getRoom/${roomID}`)
        .then((res) => {
          if (res.data && res.data.room) {
            setRoomData(res.data.room);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Room ID not found in props.");
    }
  }, [roomID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/rooms/updateRoom/${roomID}`, roomData);
      // Redirect or display success message after updating
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Room Details</h2>
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
            placeholder="Enter initial assigned bed count"
            value={roomData.assignedBeds}
            onChange={handleChange} />
        </div>
  
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            name="availabilityStatus"
            placeholder="Enter initial availability status"
            value={roomData.availabilityStatus}
            onChange={handleChange} />
        </div>
  
        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditRoomForm;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditRoomForm = () => {
  const [roomData, setRoomData] = useState({
    roomID: '',
    numOfBeds: '',
    bathroomType: '',
    image: '',
    assignedBeds: 0, // Initialize assignedBeds to 0
    availabilityStatus: ''
  });

  const { roomID } = useParams();

  useEffect(() => {
    if (roomID) {
      axios.get(`http://localhost:8888/rooms/getRoom/${roomID}`)
        .then((res) => {
          if (res.data && res.data.room) {
            setRoomData(res.data.room);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Room ID not found in props.");
    }
  }, [roomID]);

  const navigate = useNavigate(); // Initialize navigate function from react-router-dom
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent updating assignedBeds and availabilityStatus
    if (name === 'assignedBeds' || name === 'availabilityStatus') {
      return;
    }
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8888/rooms/updateRoom/${roomID}`, roomData);
      // Redirect or display success message after updating
      alert("Room details updated successfully");
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Room Details</h2>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter Room ID"
            value={roomData.roomID}
            onChange={handleChange} 
            disabled/>
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
        
        //Display assigned bed count and availability status as read-only fields 
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Assigned Beds</label>
          <input type="text"
            className="form-control"
            value={roomData.assignedBeds}
            readOnly // Make this field read-only
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            value={roomData.availabilityStatus}
            readOnly // Make this field read-only
          />
        </div>

   

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditRoomForm;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditRoomForm = () => {
  const [roomData, setRoomData] = useState({
    roomID: '',
    numOfBeds: '',
    bathroomType: '',
    description: '',
    assignedBeds: 0,
    availabilityStatus: ''
  });
  const [errors, setErrors] = useState({}); // State for validation errors

  const { roomID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomID) {
      axios.get(`http://localhost:8070/rooms/getRoom/${roomID}`)
        .then((res) => {
          if (res.data && res.data.room) {
            setRoomData(res.data.room);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Room ID not found in props.");
    }
  }, [roomID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate number of beds
    if (!roomData.numOfBeds || isNaN(roomData.numOfBeds)) {
      validationErrors.numOfBeds = "Bed count is required and should be a number";
    }

    // Validate bathroom type (contains only letters)
    if (!/^[a-zA-Z]+$/.test(roomData.bathroomType)) {
      validationErrors.bathroomType = "Bathroom type is required and should contain only letters";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put(`http://localhost:8070/rooms/updateRoom/${roomID}`, roomData);
        alert("Room details updated successfully");
        navigate('/roomHome');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
  
      <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal" style={{ marginLeft:'200px' }}>Edit Room Details</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit} style={{ marginLeft:'200px' }}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter Room ID"
            value={roomData.roomID}
            disabled
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Number of Beds</label>
          <input type="text"
            className="form-control"
            name="numOfBeds"
            placeholder="Enter bed count"
            value={roomData.numOfBeds}
            onChange={handleChange}
          />
          {errors.numOfBeds && <p style={{ color: 'red' }}>{errors.numOfBeds}</p>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Bathroom Type</label>
          <input type="text"
            className="form-control"
            name="bathroomType"
            placeholder="Enter bathroom type"
            value={roomData.bathroomType}
            onChange={handleChange}
          />
          {errors.bathroomType && <p style={{ color: 'red' }}>{errors.bathroomType}</p>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Enter room description"
            value={roomData.description}
            onChange={handleChange}
            rows={5} // Adjust the number of rows as needed
          />
        </div>


        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Assigned Beds</label>
          <input type="text"
            className="form-control"
            value={roomData.assignedBeds}
            readOnly
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Availability Status</label>
          <input type="text"
            className="form-control"
            value={roomData.availabilityStatus}
            readOnly
          />
        </div>

        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditRoomForm;