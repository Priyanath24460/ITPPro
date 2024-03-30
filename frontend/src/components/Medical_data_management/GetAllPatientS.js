import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./allstyle.css"; 


export default function GetAllPatient() {
  const [patients, setPatients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
//  const [selectedDate, setSelectedDate] = useState(new Date());

  const [editPatientData, setEditPatientData] = useState({
    nic: "",
    diabetes: "",
    cholesterol: "",
    pressure: "",
    otherdiseases: "",
    date: new Date(), // Initialize with a default date
    
  });

  function getallpatient() {
    axios.get("http://localhost:8070/patients/get").then((res) => {
      setPatients(res.data);
    }).catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {
   

    getallpatient();
  }, [])

  function deleteData(nic) {
    axios.delete("http://localhost:8070/patients/delete", { data: { nic } }).then(() => {
      alert("Patient deleted");
      window.location.reload();
    }).catch((e) => {
      alert(e.message);
    })
  }

  function handleEditClick(index, patient) {
    setEditingIndex(index);
    setEditPatientData({
      nic: patient.nic,
      diabetes: patient.diabetes,
      cholesterol: patient.cholesterol,
      pressure: patient.pressure,
      otherdiseases: patient.otherdiseases,
      date: new Date(patient.date), // Convert date from the server to JavaScript Date object
      
    });
  }

  function handleDateChange(date) {
    setEditPatientData((prevData) => ({
      ...prevData,
      date,
    }));
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function updatePatientData(index) {
    // Send a PUT request to update patient data
    axios.put("http://localhost:8070/patients/update", editPatientData).then(() => {
      alert("Patient data updated");
      // Refresh patient data after successful update
      getallpatient();
      // Reset editing state after successful update
      setEditingIndex(null);
      setEditPatientData({
        nic: "",
        diabetes: "",
        cholesterol: "",
        pressure: "",
        otherdiseases: "",
        date: new Date(),
     
      });
    }).catch((e) => {
      alert(e.message);
    })
  }

  return (
    <div className="container">
      <h1>Medical Status Update</h1>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NIC</th>
            <th scope="col">Name</th>
            <th scope="col">date</th>
            <th scope="col">Diabetes</th>
            <th scope="col">Cholesterol</th>
            <th scope="col">Pressure</th>
            <th scope="col">Other Diseases</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{patient.nic}</td>
              <td>{patient.name}</td>
              <td>
                {editingIndex === index ? (
                  <DatePicker
                    selected={editPatientData.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                ) : (
                  // Display the date from the patient data
                  <span>{new Date(patient.date).toISOString().split('T')[0]}</span>/*This code converts the date to
                                                                                      an ISO string and then extracts
                                                                                      the date part before the 'T' character, giving you 
                                                                                      a string in the "yyyy-MM-dd" format. */
                )}
              </td>
              
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="diabetes"
                    value={editPatientData.diabetes}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className={patient.diabetes === "NO" ? "redText" : "blueText"}>
                  {patient.diabetes}
                  </span>
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="cholesterol"
                    value={editPatientData.cholesterol}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className={patient.cholesterol === "NO" ? "redText" : "blueText"}>
                  {patient.cholesterol}
                  </span>
                  
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="pressure"
                    value={editPatientData.pressure}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className={patient.pressure === "NO" ? "redText" : "blueText"}>
                  {patient.pressure}
                  </span>
                  
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="otherdiseases"
                    value={editPatientData.otherdiseases}
                    onChange={handleEditChange}
                  />
                ) : (
                  
                  patient.otherdiseases
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button className="btn btn-success"   onClick={() => updatePatientData(index)}><i className="fas fa-save"></i>&nbsp;Save</button>
                ) : (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditClick(index, patient)}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(patient.nic)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
