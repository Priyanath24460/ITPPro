import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import PressureLineGraph from './PressureLineGraph';
import MedicineDataShowingTable from './MedicineDataShowingTable';




const PressureData = () => {
  const { nic } = useParams();
  const [pressureData, setPressureData] = useState(null);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedHighLevel, setEditedHighLevel] = useState("");
  const [editedLowLevel, setEditedLowLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFile1, setPdfFile] = useState(null);

  const [pressureMedicineData, setpressureMedicineData] = useState([]);
  const [medicinestatus, setmedicineStatus] = useState("");




   const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/pressure/getonepd/${nic}`);
        const data = response.data.data;

        if (data) {
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

 //////////////////////////////////////////pressureMedicine ////////////////////////////////////////////////

 const fetchDataMedicine = async () => {
  try {
    const response = await axios.get(`http://localhost:8070/pressureMedicine/get_pressure_Medicine/${nic}`);
    const data = response.data.data;
    if (data) {
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
          
          
      
          // Make an API call to update the cholesterol medicine data
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



  return (
    <div>
        <h3>Diabetes Data for NIC:{nic}</h3>
         {pressureData ?(
           <div>
               <PressureLineGraph pressureData={pressureData}/>
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
                    {pressureData.map((entry)=>(
                      <tr key={entry._id}>

                        <td>{entry.name}</td>
                        
                        <td>
                          {editingEntry === entry._id ?(
                            <input
                              type="text"
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
                            type="text"
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
                              <button onClick={() => handleEditClick(entry._id, entry.high, entry.low,entry.date)}>
                                Edit
                              </button>
                            )}
                          </td>
                      </tr>
                        
                    ))}
                  </tbody>
                   </table>

                   <MedicineDataShowingTable
                      MedicineData={pressureMedicineData}
                      status={medicinestatus}
                      fetchDataMedicine={fetchDataMedicine}
                      //handleEdit={handleEditMedicine}
                      handleSaveEdit={handleSaveEditMedicine}
                      reset={resetEditingState}
                      //handleCancelEdit={handleCancelEditMedicine}
      />


           </div>
         ):(<p>{status}</p>)}

    </div>
  );
};

export default PressureData;
