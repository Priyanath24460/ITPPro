/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditResidentForm = () => {
  const [residentData, setResidentData] = useState({
    NIC: '',
    resName: '',
    roomID: ''
    
  });

  const { NIC } = useParams();

  useEffect(() => {
    if (NIC) {
      axios.get(`http://localhost:8888/residents/getResident/${NIC}`)
        .then((res) => {
          if (res.data && res.data.resident) {
            setResidentData(res.data.resident);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("NIC not found in props.");
    }
  }, [NIC]);

  const navigate = useNavigate(); // Initialize navigate function from react-router-dom
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setResidentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8888/residents/updateResident/${NIC}`, residentData);
      // Redirect or display success message after updating
      alert("Resident details updated successfully");
      navigate('/allAssignments');
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Resident Assignment Details</h2>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Resident NIC</label>
          <input type="text"
            className="form-control"
            name="NIC"
            placeholder="Enter Resident NIC"
            value={residentData.NIC}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Resident Name</label>
          <input type="text"
            className="form-control"
            name="resName"
            placeholder="Enter resident name"
            value={residentData.resName}
            onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter room ID"
            value={residentData.roomID}
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

export default EditResidentForm;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditResidentForm = () => {
  const [residentData, setResidentData] = useState({
    NIC: '',
    resName: '',
    roomID: ''
  });
  const [errors, setErrors] = useState({
    NIC: '',
    resName: ''
  });

  const { NIC } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (NIC) {
      axios.get(`http://localhost:8070/residents/getResident/${NIC}`)
        .then((res) => {
          if (res.data && res.data.resident) {
            setResidentData(res.data.resident);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("NIC not found in props.");
    }
  }, [NIC]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResidentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nicRegex = /^(?:\d{12}|\d{9}[vV])$/;
    const nameRegex = /^[A-Z][a-z]*$/;

    if (!residentData.NIC.trim() || !residentData.resName.trim()) {
      setErrors({
        NIC: 'NIC is required',
        resName: 'Resident name is required'
      });
      return;
    } else {
      setErrors({
        NIC: '',
        resName: ''
      });
    }

    if (!nicRegex.test(residentData.NIC)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        NIC: 'NIC should have 12 numeric characters or 9 numeric characters followed by \'v\' or \'V\''
      }));
      return;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        NIC: ''
      }));
    }

    if (!nameRegex.test(residentData.resName)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        resName: 'Resident name should start with a capital letter and contain only alphabetic characters'
      }));
      return;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        resName: ''
      }));
    }

    try {
      await axios.put(`http://localhost:8070/residents/updateResident/${NIC}`, residentData);
      alert("Resident details updated successfully");
      navigate('/allAssignments');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal" style={{ marginLeft:'200px' }}>Edit Resident Assignment Details</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit} style={{ marginLeft:'200px' }}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Resident NIC</label>
          <input type="text"
            className={`form-control ${errors.NIC && 'is-invalid'}`}
            name="NIC"
            placeholder="Enter Resident NIC"
            value={residentData.NIC}
            onChange={handleChange} />
          {errors.NIC && <div className="invalid-feedback" style={{ color: 'red' }}>{errors.NIC}</div>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Resident Name</label>
          <input type="text"
            className={`form-control ${errors.resName && 'is-invalid'}`}
            name="resName"
            placeholder="Enter resident name"
            value={residentData.resName}
            onChange={handleChange} />
          {errors.resName && <div className="invalid-feedback" style={{ color: 'red' }}>{errors.resName}</div>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room ID</label>
          <input type="text"
            className="form-control"
            name="roomID"
            placeholder="Enter room ID"
            value={residentData.roomID}
            onChange={handleChange}
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

export default EditResidentForm;

