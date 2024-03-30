import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './medicalCSS/Profile.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function Profile(){

    const { nic, name } = useParams();
    const [patient, setPatient] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    //const [highpressure, setHighpressure] = useState("");
    //const [lowpressure, setLowpressure] = useState("");
    //const [selectedDate, setSelectedDate] = useState(new Date()); 
    //const [pdfFile, setPdfFile] = useState(null);


    //Diabetes
    //const[level,setDiabeteslevel] = useState("");
    //const [pdfFilediabetes, setPdfFilediabetes] = useState(null);
    //const [selectedDatediabetes, setSelectedDatediabetes] = useState(new Date()); 
   

    function getOnePatient() {
        axios.get(`http://localhost:8070/patients/getone/${nic}`).then((res) => {
            console.log(res.data);
            setPatient(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    }

    

   /* function sendpd() {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("high", highpressure);
            formData.append("low", lowpressure);
            formData.append("date", selectedDate);
            formData.append("pdfFile", pdfFile);
    
            axios.post("http://localhost:8070/pressure/addpd", formData)
                .then(() => {
                    alert("Data added successfully");
                    // Clear input fields and reset state
                    setHighpressure("");
                    setLowpressure("");
                    setSelectedDate(new Date());
                    setPdfFile(null);
                })
                .catch((err) => {
                    alert("Error adding data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred: " + error.message);
        }
    }*/



    {/*function senddiabetesdata() {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", level);
           
            formData.append("date", selectedDatediabetes);
            formData.append("pdfFile", pdfFilediabetes);
    
            axios.post("http://localhost:8070/diabetes/adddiabetesdata", formData)
                .then(() => {
                    alert("Data added successfully");
                    // Clear input fields and reset state
                    
                })
                .catch((err) => {
                    alert("Error adding data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred: " + error.message);
        }
    }*/}
    

    function handleEditClick() {
        setEditMode(true);
        // Set initial values for the edit form
        setEditedData({
            nic:nic,
            diabetes: patient?.patient?.diabetes,
            cholesterol: patient?.patient?.cholesterol,
            pressure: patient?.patient?.pressure,
            otherdiseases: patient?.patient?.otherdiseases,
        });
    }

    function handleCancelClick() {
        setEditMode(false);
    }

    function handleSaveClick() {
        // Implement logic to update data using axios or your preferred method
        axios.put("http://localhost:8070/patients/update", editedData).then(() => {
            alert("Patient data updated");
            // Refresh patient data after successful update

           // getOnePatient() 
            window.location.reload();
          
          }).catch((e) => {
            alert(e.message);
          })
        // You can use editedData to send updated values to the server
        // After updating, setEditMode(false) to exit edit mode
    }

    useEffect(() => {
        getOnePatient();
    }, [nic]);

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h1>NIC: {nic}</h1>
                <h1>Name: {name}</h1>
    </div>

            {editMode ? (
                <div className="edit-form">
                <div className="form-group">
                <table className="table">
                    <thead>
                  <tr>
                      <th scope="col">Attribute</th>
                      <th scope="col">Value</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Diabetes</td>
                      <td><input
                        type="text"
                        value={editedData.diabetes}
                        onChange={(e) => setEditedData({ ...editedData, diabetes: e.target.value })}
                    /></td>
                  </tr>
                  <tr>
                      <td>Cholesterol</td>
                      <td> <input
                        type="text"
                        value={editedData.cholesterol}
                        onChange={(e) => setEditedData({ ...editedData, cholesterol: e.target.value })}
                    /></td>
                  </tr>
                  <tr>
                      <td>Pressure</td>
                      <td> <input
                        type="text"
                        value={editedData.pressure}
                        onChange={(e) => setEditedData({ ...editedData, pressure: e.target.value })}
                    /></td>
                  </tr>
                  <tr>
                      <td>Other Diseases</td>
                    <td><textarea
                        value={editedData.otherdiseases}
                        onChange={(e) => setEditedData({ ...editedData, otherdiseases: e.target.value })}
                  /></td>
                  </tr>
              </tbody>
                    </table>
                </div>
            
               
            
                <div className="form-buttons">
                <button className="btn btn-success"   onClick={handleSaveClick}>
               <i className="fas fa-save"></i>&nbsp; Save
                 </button>
                 &nbsp;
              <button className="btn btn-danger"  onClick={handleCancelClick}>
             <i className="fas fa-times"></i> &nbsp;Cancel
             </button>
                </div>
            </div>
            ) : (
                <div>
                    <table className="table">
                    <thead>
                  <tr>
                      <th scope="col">Attribute</th>
                      <th scope="col">Value</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Diabetes</td>
                      <td>
                        <span className={patient?.patient?.diabetes === "No" ? "redText" : "greenText"}>
                           {patient?.patient?.diabetes}
                     </span>
                     </td>
                  </tr>
                  <tr>
                      <td>Cholesterol</td>
                      <td><span className={patient?.patient?.cholesterol === "No" ? "redText" : "greenText"}>
                           {patient?.patient?.cholesterol}
                     </span></td>
                  </tr>
                  <tr>
                      <td>Pressure</td>
                      <td><span className={patient?.patient?.pressure === "No" ? "redText" : "greenText"}>
                           {patient?.patient?.pressure}
                     </span></td>
                  </tr>
                  <tr>
                      <td>Other Diseases</td>
                      <td><span className={patient?.patient?.otherdiseases === "No" ? "redText" : "greenText"}>
                           {patient?.patient?.otherdiseases}
                     </span></td>
                  </tr>
              </tbody>
                    </table>
                    <button  className="btn btn-warning custom-left-button" onClick={handleEditClick}><i className="fas fa-edit"></i>&nbsp;Edit</button>
                </div>
            )}
          {/* 
            <div>
                <form onSubmit={sendpd}>
                    <table className="table1">
                            <thead>
                                <tr>
                                    <th scope="col">ADD Pressure Data</th>
                                    
                                </tr>
                           </thead>
                                <tbody>
                                        <tr>
                                            <td>High</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="high pressure"
                                                    placeholder="Enter high level"
                                                    onChange={(e) => {
                                                    setHighpressure(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                        <tr>
                                            <td>low</td>
                                            <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="low pressure"
                                                        placeholder="Enter low level"
                                                        onChange={(e) => {
                                                        setLowpressure(e.target.value);
                                                        }}
                                                    />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Report</td>
                                            <td>
                                            
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setPdfFile(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button1">
                                                Add
                                                </button>       
                </form>    

                    <Link to={`/pressuremore/${nic}`} className="btn btn-primary custom-view-button1  ">
                    <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View More
                    </Link>

            </div>

*/}



           {/* <div>
                <form onSubmit={senddiabetesdata}>
                    <table className="table2">
                            <thead>
                                <tr>
                                    <th scope="col">ADD Diabetes Data</th>
                                    
                                </tr>
                           </thead>
                                <tbody>
                                        <tr>
                                            <td>Level</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="diabetes level"
                                                    placeholder="diabetes level"
                                                    onChange={(e) => {
                                                    setDiabeteslevel(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={selectedDatediabetes}
                                                onChange={(date) => setSelectedDatediabetes(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Report</td>
                                            <td>
                                            
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setPdfFilediabetes(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button2">
                                                Add
                                                </button>       
                </form>    

                    <Link to={`/pressuremore/${nic}`} className="btn btn-primary custom-view-button2  ">
                    <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View More
                    </Link>

                                                </div>*/}


        </div>

        




    );
}
