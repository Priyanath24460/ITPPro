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
    description: '',
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
    e.preventDefault();
    let errors = {};

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
          alert("Already added room ID")
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal" style={{ marginLeft: '200px' }}>Add Room</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit} style={{ marginLeft: '200px' }}>
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
            name="assignedBeds"
            value={roomData.assignedBeds}
            readOnly />
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
    description: '',
    selectedOption: '',
    assignedBeds: defaultAssignedBeds,
    availabilityStatus: defaultAvailabilityStatus,
    additionalItem: "",

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

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setRoomData(prevState => ({
      ...prevState,
      selectedOption
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
  
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
      const dataToSend = {
        ...roomData,
        additionalItem: roomData.selectedOption
      };
  
      axios.post('http://localhost:8070/rooms/addRoom', dataToSend) // Use dataToSend instead of roomData
        .then(res => {
          console.log(res.data);
          alert("New Room added successfully");
          navigate('/roomHome');
        })
        .catch(err => {
          console.error('Error adding room:', err);
          // Handle error, show error message
          alert("Already added room ID")
        });
    } else {
      setErrors(errors);
    }
  };
  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal" style={{ marginLeft: '200px' }}>Add Room</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit} style={{ marginLeft: '200px' }}>
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
          <label style={{ marginBottom: '5px' }}>Additional Item</label>
          <select
            className="form-control"
            name="selectedOption"
            value={roomData.selectedOption}
            onChange={handleDropdownChange}>
            <option value="">Select an item</option>
            <option value="fridge">Fridge</option>
            <option value="kettle">Kettle</option>
            <option value="fan">Fan</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Assigned Beds</label>
          <input type="text"
            className="form-control"
            name="assignedBeds"
            value={roomData.assignedBeds}
            readOnly />
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


