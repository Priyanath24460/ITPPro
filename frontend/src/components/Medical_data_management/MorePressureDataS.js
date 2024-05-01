import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import PressureLineGraph from './PressureLineGraph';
import MedicineDataShowingTable from './MedicineDataShowingTable';




const PressureData = () => {
  const { nic,name,age,gender } = useParams();
  const [pressureData, setPressureData] = useState(null);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedHighLevel, setEditedHighLevel] = useState("");
  const [editedLowLevel, setEditedLowLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFile1, setPdfFile] = useState(null);

  const [pressureMedicineData, setpressureMedicineData] = useState([]);
  const [medicinestatus, setmedicineStatus] = useState("");

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  

 // Function to handle filtering by year and month
 const filteredData = pressureData ?pressureData.filter(entry => {
  if (!selectedYear && !selectedMonth) return true;
  const entryDate = new Date(entry.date);
  return (
    (!selectedYear || entryDate.getFullYear() === parseInt(selectedYear, 10)) &&
    (!selectedMonth || entryDate.getMonth() === parseInt(selectedMonth, 10))
  );
}):[];


   const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/pressure/getonepd/${nic}`);
        const data = response.data.data;

        if (data) {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPressureData(data);
          setStatus("Pressure data fetched successfully");
        } else {
          setPressureData([]);
          setStatus("Pressure data not found");
        }
      } catch (error) {
        console.error("Error fetching pressure data:", error);
        setStatus("Error fetching pressure data");
      }
    };

  useEffect(() => {
   

    fetchData();
  }, [nic]);


  const handleEditClick = (entryId, highlevel,lowlevel, date) => {
    setEditingEntry(entryId);
    setEditedHighLevel(highlevel);
    setEditedLowLevel(lowlevel);
    setEditedDate(date);
  };


  useEffect(() => {
    console.log("Updated pressureData:", pressureData);
  }, [pressureData]);









  const handleViewPDF = async (entryId, name, date) => {
    try {
      // Fetch the PDF data
      const response = await axios.get(`http://localhost:8070/pressure/viewpdf/${entryId}`, {
        responseType: 'arraybuffer',
      });
  
      // Create a Blob from the PDF data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Open the PDF in a new window or tab
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };


 /* const fetchPressureMedicineData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/diabetes/getonediabetesdata/${nic}`);
      const data = response.data.data;

      if (data) {
        setDiabetesData(data);
        setStatus("Diabetes data fetched successfully");
      } else {
        setDiabetesData([]);
        setStatus("Diabetes data not found");
      }
    } catch (error) {
      console.error("Error fetching Diabetes data:", error);
      setStatus("Error fetching diabetes data");
    }
  };


  useEffect(() => {
    
    fetchPressureMedicineData();
  }, [nic]);*/

  const handleSaveEdit = async (entryId) => {
    try {
      const formData = new FormData();

      // Add level and date to the form data
      formData.append("high", editedHighLevel);
      formData.append("low", editedLowLevel);
      formData.append("date", editedDate);

      // Check if a new PDF file is provided
      if (pdfFile1) {
        formData.append("pdfFile", pdfFile1);

        // Upload the new PDF file and update level and date
        await axios.put(`http://localhost:8070/pressure/update/${entryId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        
      } else {
        // Update only the level and date if no new PDF file is provided
        await axios.put(`http://localhost:8070/pressure/update/${entryId}`, formData);

        
      }

      fetchData(); // Call the fetchData function after updating

      setEditingEntry(null);
      setEditedHighLevel("");
      setEditedLowLevel("");
      setEditedDate("");
      setPdfFile(null);
      setStatus("Diabetes data updated successfully");

    } catch (error) {
      console.error("Error updating Diabetes data:", error);
      setStatus("Error updating diabetes data");
    }
  };


  const handleCancelEdit = () => {
    resetEditingState();
  };
  
  const resetEditingState = () => {
    setEditingEntry(null);
    setEditedHighLevel("");
    setEditedLowLevel("");
    setEditedDate("");
    setPdfFile(null);
  };

  // Function to delete pressure data by ID
const handleDeleteClick = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/pressure/delete/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the cholesterol data
        fetchData();
        console.log("pressure data deleted successfully");
      } else {
        console.error("Failed to delete pressure data");
      }
    }
  } catch (error) {
    console.error("Error deleting pressure data:", error);
  }
};





 //////////////////////////////////////////pressureMedicine ////////////////////////////////////////////////

 const fetchDataMedicine = async () => {
  try {
    const response = await axios.get(`http://localhost:8070/pressureMedicine/get_pressure_Medicine/${nic}`);
    const data = response.data.data;
    if (data) {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setpressureMedicineData(data);
      setStatus("pressuredata fetched successfully");
    } else {
      setpressureMedicineData([]);
      setStatus("pressure data not found");
    }
  } catch (error) {
    console.error("Error fetching pressure data:", error);
    setStatus("Error fetching pressure data");
  }
};
useEffect(() => {


fetchDataMedicine();
}, [nic]);



const handleSaveEditMedicine = async (entryId,updatedData) => {
  try {
          
          
      
          // Make an API call to update the pressure medicine data
          await axios.put(`http://localhost:8070/pressureMedicine/update_pressure_Medicine/${entryId}`, updatedData);
      
          // Reset editing state
          resetEditingState();
      
         // Refetch pressureMedicine medicine data after saving changes
         fetchDataMedicine();
            
      
          // Update status
          //setStatus("pressureMedicine medicine data updated successfully");
        } catch (error) {
          console.error("Error updating pressureMedicine medicine data:", error);
          //setStatus("Error updating pressureMedicine medicine data");
        }
  };

// Function to handle delete operation for pressure medicine data
const handleDeleteMedicine = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/pressureMedicine/delete_pressure_Medicine/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the pressure medicine data
        fetchDataMedicine();
        console.log("pressure medicine data deleted successfully");
      } else {
        console.error("Failed to delete pressure medicine data");
      }
    }
  } catch (error) {
    console.error("Error deleting pressure medicine data:", error);
  }
};




  return (
    <div>
        <div className="container">
  <h3>NIC:{nic}</h3>
  <h3>Name: {name}</h3>
  <h3>Age: {age}</h3>
  <h3>Gender: {gender}</h3>
</div>
         {pressureData ?(
           <div>
               <PressureLineGraph pressureData={pressureData}/>
               <div className="row">
  <div className="col-sm-3">
    <input
      type="text"
      className="form-control mb-2 mr-sm-2"
      placeholder="Search by Year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      style={{ width: '90%',marginTop:'20px',marginLeft:'15px' }}
    />
  </div>
  <div className="col-sm-3">
    <select
      className="form-control mb-2 mr-sm-2"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      style={{ width: '70%',marginLeft:'0px' , marginTop:'20px'}}
    >
      <option value="">All Month</option>
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
  </div>
</div>
                 <table className="pressure-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>High Level</th>
                      <th>Low Level</th>
                      <th>Date</th>
                      <th>PDF</th>
                      <th>Edit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((entry)=>(
                      <tr key={entry._id}>

                        <td>{entry.name}</td>
                        
                        <td>
                          {editingEntry === entry._id ?(
                            <input
                              type="number"
                              value={editedHighLevel}
                              onChange={(e)=>setEditedHighLevel(e.target.value)}
                            />
                          ):(
                            entry.high
                          )}
                        </td>
                         
                        <td>
                          {editingEntry === entry._id ?(
                            <input
                            type="number"
                            value={editedLowLevel}
                            onChange={(e)=>setEditedLowLevel(e.target.value)}
                            
                            />
                          ):(

                            entry.low
                          )
                          
                          }
                        </td> 
                        <td>
                            {editingEntry === entry._id ? (
                              <input
                                type="date"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                              />
                            ) : (
                              new Date(entry.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit',
                              })
                            )}
                        </td>
                        
                        <td>
                            {editingEntry === entry._id ? (
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setPdfFile(e.target.files[0])}
                              />
                            ) : (
                              <button onClick={() => handleViewPDF(entry._id, entry.name, entry.date)}>
                                View PDF
                              </button>
                            )}
                          </td>
                           
                                  <td>
                            {editingEntry === entry._id ? (
                              <>
                              <button onClick={() => handleSaveEdit(entry._id)}>Save</button>
                              <button onClick={() => handleCancelEdit()}>Cancel</button>
                            </>
                            ) : (
                              <>
                              <button onClick={() => handleEditClick(entry._id, entry.high,entry.low, entry.date)}>
                                Edit
                              </button>
                               
                               <button onClick={() => handleDeleteClick(entry._id)}>
                                  Delete
                             </button>
                             </>
                            )}
                          </td>
                      </tr>
                        
                    ))}
                  </tbody>
                   </table>

                   <MedicineDataShowingTable
                   MedicineDelete={handleDeleteMedicine}
                      MedicineData={pressureMedicineData}
                      status={medicinestatus}
                      fetchDataMedicine={fetchDataMedicine}
                      //handleEdit={handleEditMedicine}
                      handleSaveEdit={handleSaveEditMedicine}
                      reset={resetEditingState}
                      filteredData={filteredData}
                      MedicalDataType={"Pressure"}
                      nic={nic}
                      name={name}
                      age={age}
                      gender={gender}
                      //handleCancelEdit={handleCancelEditMedicine}
      />


           </div>
         ):(<p>{status}</p>)}

    </div>
  );
};

export default PressureData;
