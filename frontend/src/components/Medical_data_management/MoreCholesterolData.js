import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import CholesterolLineGraph from './CholesterolLineGraph'; 
import MedicineDataShowingTable from './MedicineDataShowingTable';

export default function CholesterolData() {
  const { nic } = useParams();
  const [cholesterolData, setCholesteroldata] = useState([]);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedLevel, setEditedLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFile1, setPdfFile] = useState(null);


  

  // State variables related to cholesterol medicine data
  const [cholesterolMedicineData, setCholesterolMedicineData] = useState([]);
  const [medicinestatus, setmedicineStatus] = useState("");



   //get cholesterol data****************************************************************************************************

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/cholesterol/getonecholesteroldata/${nic}`);
      const data = response.data.data;

      console.log("Fetched Data:", data);

      

      if (data) {
        setCholesteroldata(data);
        setStatus("cholesterol data fetched successfully");
      } else {
        setCholesteroldata([]);
        setStatus("cholesterol data not found");
      }
    } catch (error) {
      console.error("Error fetching cholesterol data:", error);
      setStatus("Error fetching cholesterol data");
    }
  };



  useEffect(() => {
    
    fetchData();
  }, [nic]);




  const handleEditClick = (entryId, level, date) => {
    setEditingEntry(entryId);
    setEditedLevel(level);
    setEditedDate(date);
  };



  useEffect(() => {
    console.log("Updated cholesterolData:", cholesterolData);
  }, [cholesterolData]);

  const handleEdit = (entry) => {
    // Implement the logic for handling edit action
    console.log("Edit clicked for entry:", entry);
  };



  const handleViewPDF = async (entryId, name, date) => {
    try {
      // Fetch the PDF data
      const response = await axios.get(`http://localhost:8070/cholesterol/viewpdf/${entryId}`, {
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



   
  const handleSaveEdit = async (entryId) => {
    try {
      const formData = new FormData();

      // Add level and date to the form data
      formData.append("level", editedLevel);
      formData.append("date", editedDate);

      // Check if a new PDF file is provided
      if (pdfFile1) {
        formData.append("pdfFile", pdfFile1);

        // Upload the new PDF file and update level and date
        await axios.put(`http://localhost:8070/cholesterol/update/${entryId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        
      } else {
        // Update only the level and date if no new PDF file is provided
        await axios.put(`http://localhost:8070/cholesterol/update/${entryId}`, formData);

        
      }

       // Call the fetchData function after updating

      setEditingEntry(null);
      setEditedLevel("");
      setEditedDate("");
      setPdfFile(null);
      setStatus("Diabetes data updated successfully");

     fetchData();


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
    setEditedLevel("");
    setEditedDate("");
    setPdfFile(null);
  };
  






 

     //////////////////////////////////////////cholesterolMedicine ////////////////////////////////////////////////

      const fetchDataMedicine = async () => {
              try {
                const response = await axios.get(`http://localhost:8070/cholesterolMedicine/get_cholesterol_Medicine/${nic}`);
                const data = response.data.data;
                if (data) {
                  setCholesterolMedicineData(data);
                  setStatus("Cholesterol data fetched successfully");
                } else {
                  setCholesterolMedicineData([]);
                  setStatus("Cholesterol data not found");
                }
              } catch (error) {
                console.error("Error fetching cholesterol data:", error);
                setStatus("Error fetching cholesterol data");
              }
            };
     useEffect(() => {
      
  
      fetchDataMedicine();
    }, [nic]);



    /*const handleEditMedicine = (entry) => {
      
          setEditingEntry(entry._id);
      
          setEditedMorningMedicine(entry.morningMedicine);
          setEditedMorningDosage(entry.morningDosage);
          setEditedNightMedicine(entry.nightMedicine);
          setEditedNightDosage(entry.nightDosage);
          setEditedDate(entry.date);
        
          console.log("Edit clicked for cholesterol medicine entry:", entry);
    };


    const handleSaveEditMedicine = async (entryId) => {
      try {
              // Prepare the data to be updated
              const updatedData = {
                morningMedicine: editedMorningMedicine,
                morningDosage: editedMorningDosage,
                nightMedicine: editedNightMedicine,
                nightDosage: editedNightDosage,
                date: editedDate
              };
          
              // Make an API call to update the cholesterol medicine data
              await axios.put(`http://localhost:8070/cholesterolMedicine/update/${entryId}`, updatedData);
          
              // Reset editing state
              resetEditingState();
          
              // Refetch cholesterol medicine data after saving changes
              fetchDataMedicine();
          
              // Update status
              setStatus("Cholesterol medicine data updated successfully");
            } catch (error) {
              console.error("Error updating cholesterol medicine data:", error);
              setStatus("Error updating cholesterol medicine data");
            }
    };


    const handleCancelEditMedicine = () => {
              // Clear editing state
              setEditingEntry(null);
              setEditedMorningMedicine("");
              setEditedMorningDosage("");
              setEditedNightMedicine("");
              setEditedNightDosage("");
              setEditedDate("");
            
              console.log("Cancel editing cholesterol medicine data");
    };*/

    const handleSaveEditMedicine = async (entryId,updatedData) => {
      try {
              
              
          
              // Make an API call to update the cholesterol medicine data
              await axios.put(`http://localhost:8070/cholesterolMedicine/update_cholesterol_Medicine/${entryId}`, updatedData);
          
              // Reset editing state
              resetEditingState();
          
             // Refetch cholesterol medicine data after saving changes
             fetchDataMedicine();
                
          
              // Update status
              //setStatus("Cholesterol medicine data updated successfully");
            } catch (error) {
              console.error("Error updating cholesterol medicine data:", error);
              //setStatus("Error updating cholesterol medicine data");
            }
      };
  
  

  return (
    <div >
     


    <h3>Diabetes Data for NIC: {nic}</h3>
      {cholesterolData ? (
        <div>
           <CholesterolLineGraph cholesterolData={cholesterolData}/>
          <table className="pressure-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Date</th>
                <th>PDF</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {cholesterolData.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.name}</td>
                  <td>
                    {editingEntry === entry._id ? (
                      <input
                        type="text"
                        value={editedLevel}
                        onChange={(e) => setEditedLevel(e.target.value)}
                      />
                    ) : (
                      entry.level
                    )}
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
                         <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View PDF
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
                      <button onClick={() => handleEditClick(entry._id, entry.level, entry.date)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <MedicineDataShowingTable
                MedicineData={cholesterolMedicineData}
                status={medicinestatus}
                fetchDataMedicine={fetchDataMedicine}
                //handleEdit={handleEditMedicine}
                handleSaveEdit={handleSaveEditMedicine}
                reset={resetEditingState}
                //handleCancelEdit={handleCancelEditMedicine}
      />
        </div>
       ) : (
        <p>{status}</p>
      )}
    </div>
  );
}
