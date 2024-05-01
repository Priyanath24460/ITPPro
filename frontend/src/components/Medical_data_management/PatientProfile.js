import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import './medicalCSS/Profile.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HealthMedicineForm from "./HealtMedicineForm";


export default function AddHealthData() {
    const { nic, name,age,gender } = useParams();
    const [activeButton, setActiveButton] = useState("cholesterol"); // Track active button
    

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



    useEffect(() => {
        // Set Cholesterol section visible when component mounts
        setCholesterolVisible(true);
    }, []);


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
    const sendCholesterolData = (event) => {
        
        if (!cholesterolLevel) {
            alert("Please enter cholesterol level.");
            return;
        }

        
        
        const isDataExists = isDataForSameMonthYearExists(cholesterolDate);
        if (isDataExists) {
            alert("Data for the same month and year already exists. Please choose a different date.");
            return; // Prevent further execution
        }
    
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", cholesterolLevel);
            formData.append("date", cholesterolDate);
            formData.append("pdfFile", cholesterolPdfFile);

            axios.post("http://localhost:8070/cholesterol/addcholesteroldata", formData);
                
                    
                    // Clear input fields and reset state
                    setCholesterolLevel("");
                    setCholesterolPdfFile(null);
                    setCholesterolDate(new Date());
                    

                
                alert("Cholesterol data added successfully");
                
        } catch (error) {
            alert("An unexpected error occurred while adding cholesterol data: " + error.message);
        }
    };

    // Function to handle submission of diabetes data
    const sendDiabetesData = () => {

        if (!diabetesLevel) {
            alert("Please enter diabetes level.");
            return;
        }
    const isDataExists = isDataForSameMonthYearExists(diabetesDate);
    if (isDataExists) {
        alert("Data for the same month and year already exists. Please choose a different date.");
        return; // Prevent further execution
    }
    
    const formData = new FormData();
    formData.append("nic", nic);
    formData.append("name", name);
    formData.append("level", diabetesLevel);
    formData.append("date", diabetesDate);
    formData.append("pdfFile", diabetesPdfFile);

    axios.post("http://localhost:8070/diabetes/adddiabetesdata", formData);
        
            alert("Diabetes data added successfully");
            // Clear input fields and reset state
            setDiabetesLevel("");
            setDiabetesPdfFile(null);
            setDiabetesDate(new Date());
        
        
};

    // Function to handle submission of pressure data
    const sendPressureData = () => {

        if (!highPressure || !lowPressure) {
            alert("Please enter both high and low pressure.");
            return;
        }
        
        const isDataExists = isDataForSameMonthYearExists(pressureDate);
        if (isDataExists) {
            alert("Data for the same month and year already exists. Please choose a different date.");
            return; // Prevent further execution
        }
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("high", highPressure);
            formData.append("low", lowPressure);
            formData.append("date", pressureDate);
            formData.append("pdfFile", pressurePdfFile);

            axios.post("http://localhost:8070/pressure/addpd", formData);
                
                    alert("Pressure data added successfully");
                    // Clear input fields and reset state
                    setHighPressure("");
                    setLowPressure("");
                    setPressurePdfFile(null);
                    setPressureDate(new Date());
                
                
        } catch (error) {
            alert("An unexpected error occurred while adding pressure data: " + error.message);
        }
    };


    //validation

    const [existingData, setExistingData] = useState([]);
      
    useEffect(() => {
        fetchExistingData();
    }, [activeButton]);

    const fetchExistingData = () => {
        let endpoint = "";
    switch (activeButton) {
        case "cholesterol":
            endpoint = `http://localhost:8070/cholesterol/getonecholesteroldata/${nic}`;
            break;
        case "diabetes":
            endpoint = `http://localhost:8070/diabetes/getonediabetesdata/${nic}`;
            break;
        case "pressure":
            endpoint = `http://localhost:8070/pressure/getonepressuredata/${nic}`;
            break;
        default:
            break;
    }

    axios
        .get(endpoint)
        .then((response) => {
            // Set existing data to state
            setExistingData(response.data.data);
        })
        .catch((error) => {
            console.error(`Error fetching existing ${activeButton} data:`, error);
        });
    };

    // Function to validate if data for the same month and year already exists
    const isDataForSameMonthYearExists = (newDate) => {
        const newMonth = newDate.getMonth() + 1; // getMonth() returns 0-indexed month
        const newYear = newDate.getFullYear();

        // Check if any existing data matches the month and year of the new data
        return existingData.some(data => {
            const dataDate = new Date(data.date);
            const dataMonth = dataDate.getMonth() + 1;
            const dataYear = dataDate.getFullYear();
            return newMonth === dataMonth && newYear === dataYear;
        });
    };







    return (
        <div class="table-wrapper">
            <button className={`cholesterol_select ${activeButton === 'cholesterol' ? 'active' : ''}`} onClick={() => {
                setActiveButton('cholesterol');
                setCholesterolVisible(true);
                setDiabetesVisible(false);
                setPressureVisible(false);
            }}>Cholesterol</button>

            <button className={`diabetes_select ${activeButton === 'diabetes' ? 'active' : ''}`} onClick={() => {
                setActiveButton('diabetes');
                setCholesterolVisible(false);
                setDiabetesVisible(true);
                setPressureVisible(false);
            }}>Diabetes</button>

            <button className={`pressure_select ${activeButton === 'pressure' ? 'active' : ''}`} onClick={() => {
                setActiveButton('pressure');
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
                                                    const value = parseInt(e.target.value); // Parse the input value as an integer
                                                    if (!isNaN(value) && value >= 0) { // Check if it's a valid number and positive
                                                        setCholesterolLevel(value); // Set the state only if it's a positive number
                                                    }

                                                    
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

                                                <button type="submit" className="addbutton_medical_pofile">
                                                Add
                                                </button>

                                                <Link to={`/cholesterolmore/${nic}/${name}/${age}/${gender}`} className="viewbutton_medical_pofile">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp; Cholesterol History
            </Link>                        
            </form> 
                     <HealthMedicineForm
                        onSubmit={handleCholesterolMedicineSubmit}
                        condition="Cholesterol"
                        nic={nic}
                        name={name}
                        endpointmedicine="cholesterol"
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
                                                        const value = parseInt(e.target.value); // Parse the input value as an integer
                                                        if (!isNaN(value) && value >= 0) { // Check if it's a valid number and positive
                                                            setDiabetesLevel(value); // Set the state only if it's a positive number
                                                        }
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

                                                <button type="submit" className="addbutton_medical_pofile">
                                                Add
                                                </button> 

                                                <Link to={`/diabetesmore/${nic}/${name}/${age}/${gender}`} className="viewbutton_medical_pofile">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp; Diabetes History
            </Link>
            </form>
               
                    <HealthMedicineForm
                        onSubmit={handleDiabetesMedicineSubmit}
                        condition="Diabetes"
                        nic={nic}
                        name={name}
                        endpointmedicine="diabetes"
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
                                                const value = parseInt(e.target.value); // Parse the input value as an integer
                                                if (!isNaN(value) && value >= 0) { // Check if it's a valid number and positive
                                                    setHighPressure(value); // Set the state only if it's a positive number
                                                }
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
                                                    const value = parseInt(e.target.value); // Parse the input value as an integer
                                                    if (!isNaN(value) && value >= 0) { // Check if it's a valid number and positive
                                                        setLowPressure(value); // Set the state only if it's a positive number
                                                    }
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

                <button type="submit" className="addbutton_medical_pofile">
                Add
                </button> 

                <Link to={`/pressuremore/${nic}/${name}/${age}/${gender}`} className="viewbutton_medical_pofile">
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp; Pressure History
            </Link>
            </form>
                        <HealthMedicineForm
                        onSubmit={handlePressureMedicineSubmit}
                        condition="Pressure"
                        
                        nic={nic}
                        name={name}
                        endpointmedicine= "pressure"
                    />
            
            </div>)}

            
        </div>
     
    );
}
