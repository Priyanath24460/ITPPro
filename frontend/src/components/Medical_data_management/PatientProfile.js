import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import './medicalCSS/Profile.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HealthMedicineForm from "./HealtMedicineForm";

export default function AddHealthData() {
    const { nic, name } = useParams();

    // State variables for cholesterol
    const [cholesterolVisible, setCholesterolVisible] = useState(false);
    const [cholesterolLevel, setCholesterolLevel] = useState("");
    const [cholesterolPdfFile, setCholesterolPdfFile] = useState(null);
    const [cholesterolDate, setCholesterolDate] = useState(new Date());

    // State variables for diabetes
    const [diabetesVisible, setDiabetesVisible] = useState(false);
    const [diabetesLevel, setDiabetesLevel] = useState("");
    const [diabetesPdfFile, setDiabetesPdfFile] = useState(null);
    const [diabetesDate, setDiabetesDate] = useState(new Date());

    // State variables for pressure
    const [pressureVisible, setPressureVisible] = useState(false);
    const [highPressure, setHighPressure] = useState("");
    const [lowPressure, setLowPressure] = useState("");
    const [pressurePdfFile, setPressurePdfFile] = useState(null);
    const [pressureDate, setPressureDate] = useState(new Date());

    const handleCholesterolMedicineSubmit = (medicineData) => {
        // Add logic to submit cholesterol medicine data
        axios.post("http://localhost:8070/cholesterolMedicine/add_cholesterol_medicine",medicineData).then(()=>{
            
       

    }).catch((err)=>{
      alert(err)
    })
    };

    const handleDiabetesMedicineSubmit = (medicineData) => {
        // Add logic to submit diabetes medicine data
        axios.post("http://localhost:8070/diabetesMedicine/add_diabetes_medicine",medicineData).then(()=>{
            
       

    }).catch((err)=>{
      alert(err)
    })

    };

    const handlePressureMedicineSubmit = (medicineData) => {
        // Add logic to submit pressure medicine data
        axios.post("http://localhost:8070/pressureMedicine/addpressuremedicine",medicineData).then(()=>{
            
       

      }).catch((err)=>{
        alert(err)
      })

    
    };

    // Function to handle submission of cholesterol data
    const sendCholesterolData = () => {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", cholesterolLevel);
            formData.append("date", cholesterolDate);
            formData.append("pdfFile", cholesterolPdfFile);

            axios.post("http://localhost:8070/cholesterol/addcholesteroldata", formData)
                .then(() => {
                    alert("Cholesterol data added successfully");
                    // Clear input fields and reset state
                    setCholesterolLevel("");
                    setCholesterolPdfFile(null);
                    setCholesterolDate(new Date());
                })
                .catch((err) => {
                    alert("Error adding cholesterol data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred while adding cholesterol data: " + error.message);
        }
    };

    // Function to handle submission of diabetes data
    const sendDiabetesData = () => {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", diabetesLevel);
            formData.append("date", diabetesDate);
            formData.append("pdfFile", diabetesPdfFile);

            axios.post("http://localhost:8070/diabetes/adddiabetesdata", formData)
                .then(() => {
                    alert("Diabetes data added successfully");
                    // Clear input fields and reset state
                    setDiabetesLevel("");
                    setDiabetesPdfFile(null);
                    setDiabetesDate(new Date());
                })
                .catch((err) => {
                    alert("Error adding diabetes data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred while adding diabetes data: " + error.message);
        }
    };

    // Function to handle submission of pressure data
    const sendPressureData = () => {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("high", highPressure);
            formData.append("low", lowPressure);
            formData.append("date", pressureDate);
            formData.append("pdfFile", pressurePdfFile);

            axios.post("http://localhost:8070/pressure/addpd", formData)
                .then(() => {
                    alert("Pressure data added successfully");
                    // Clear input fields and reset state
                    setHighPressure("");
                    setLowPressure("");
                    setPressurePdfFile(null);
                    setPressureDate(new Date());
                })
                .catch((err) => {
                    alert("Error adding pressure data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred while adding pressure data: " + error.message);
        }
    };

    return (
        <div class="table-wrapper">
            <  button  className="cholesterol_select" onClick={() => {
                setCholesterolVisible(true);
                setDiabetesVisible(false);
                setPressureVisible(false);
            }}>Cholesterol</button>

            <button className="diabetes_select" onClick={() => {
                setCholesterolVisible(false);
                setDiabetesVisible(true);
                setPressureVisible(false);
            }}>Diabetes</button>

            <button className="pressure_select" onClick={() => {
                setCholesterolVisible(false);
                setDiabetesVisible(false);
                setPressureVisible(true);
            }}>Pressure</button>
            {/* Cholesterol Form */}
            {cholesterolVisible&&(
          
            <div >
            <form onSubmit={sendCholesterolData}>
            <table className="table3">
                            <thead>
                                <tr>
                                    <th scope="col">ADD Cholesterol Data</th>
                                    
                                </tr>
                           </thead>
                                <tbody>
                                        <tr>
                                            <td>Level</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="cholesterol level"
                                                    placeholder="cholesterol level"
                                                    onChange={(e) => {
                                                    setCholesterolLevel(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={cholesterolDate}
                                                onChange={(date) => setCholesterolDate(date)}
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
                                                onChange={(e) => setCholesterolPdfFile(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button3">
                                                Add
                                                </button>

                                                <Link to={`/cholesterolmore/${nic}`} className="btn btn-primary custom-view-button3  ">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View Cholesterol More
            </Link>                        
            </form> 
                     <HealthMedicineForm
                        onSubmit={handleCholesterolMedicineSubmit}
                        condition="Cholesterol"
                        nic={nic}
                        name={name}
                    />
            
            </div>)}

            {/* Diabetes Form */}
            {diabetesVisible&&(
            
            <div>

            <form onSubmit={sendDiabetesData}>
            <table className="table3">
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
                                                    type="number"
                                                    className="form-control"
                                                    id="diabetes level"
                                                    placeholder="diabetes level"
                                                    onChange={(e) => {
                                                    setDiabetesLevel(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={diabetesDate}
                                                onChange={(date) => setDiabetesDate(date)}
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
                                                onChange={(e) => setDiabetesPdfFile(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button3">
                                                Add
                                                </button> 

                                                <Link to={`/diabetesmore/${nic}`} className="btn btn-primary custom-view-button3">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View Diabetes More
            </Link>
            </form>
               
                    <HealthMedicineForm
                        onSubmit={handleDiabetesMedicineSubmit}
                        condition="Diabetes"
                        nic={nic}
                        name={name}
                    />
            
            
            </div>)}

            {/* Pressure Form */}
            {pressureVisible && (
            
            <div>

            <form onSubmit={sendPressureData}>
            <table className="table3">
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
                                            type="number"
                                            className="form-control"
                                            id="high pressure"
                                            placeholder="Enter high level"
                                            onChange={(e) => {
                                            setHighPressure(e.target.value);
                                            }}
                                        />
                                  </td>
                                </tr>
                                <tr>
                                    <td>low</td>
                                    <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="low pressure"
                                                placeholder="Enter low level"
                                                onChange={(e) => {
                                                setLowPressure(e.target.value);
                                                }}
                                            />
                                        </td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>
                                       <DatePicker
                                       className="form-control"
                                        selected={pressureDate}
                                        onChange={(date) => setPressureDate(date)}
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
                                        onChange={(e) => setPressurePdfFile(e.target.files[0])}
                                    />
                                        
                                    
                                    </td>
                                </tr>
                               
                        </tbody>

                        
             </table>

                <button type="submit" className="btn btn-primary custom-left-button3">
                Add
                </button> 

                <Link to={`/pressuremore/${nic}`} className="btn btn-primary custom-view-button3">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View Pressure More
            </Link>
            </form>
                        <HealthMedicineForm
                        onSubmit={handlePressureMedicineSubmit}
                        condition="Pressure"
                        nic={nic}
                        name={name}
                        
                    />
            
            </div>)}

            
        </div>
     
    );
}
