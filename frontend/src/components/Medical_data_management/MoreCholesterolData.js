import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import CholesterolLineGraph from './CholesterolLineGraph'; 
import MedicineDataShowingTable from './MedicineDataShowingTable';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from "jspdf";

export default function CholesterolData() {
  const { nic,name,age,gender } = useParams();
  const [cholesterolData, setCholesteroldata] = useState([]);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedLevel, setEditedLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFile1, setPdfFile] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');




  const MyDocument = ({ cholesterolData, cholesterolMedicineData }) => (
    <Document>
      <Page>
        <View style={styles.section}>
          <Text>Cholesterol Data:</Text>
          <View>
            {cholesterolData.map(entry => (
              <Text key={entry._id}>
                Name: {entry.name}, Level: {entry.level}, Date: {entry.date}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text>Cholesterol Medicine Data:</Text>
          <View>
            {cholesterolMedicineData.map(entry => (
              <Text key={entry._id}>
                Morning Medicine: {entry.morningMedicine}, 
                
                Night Medicine: {entry.nightMedicine}, 
                Date: {entry.date}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
  
  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  

 // Function to handle filtering by year and month
 const filteredData = cholesterolData ?cholesterolData.filter(entry => {
  if (!selectedYear && !selectedMonth) return true;
  const entryDate = new Date(entry.date);
  return (
    (!selectedYear || entryDate.getFullYear() === parseInt(selectedYear, 10)) &&
    (!selectedMonth || entryDate.getMonth() === parseInt(selectedMonth, 10))
  );
}):[];





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
              // Sort the cholesterol data by date in descending order
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

      if (!/^\d+$/.test(editedLevel) || parseInt(editedLevel) < 0) {
        alert("Please enter a valid positive number for the level.");
        return;
      }
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

 // Function to delete cholesterol data by ID
const handleDeleteClick = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/cholesterol/delete/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the cholesterol data
        fetchData();
        console.log("Cholesterol data deleted successfully");
      } else {
        console.error("Failed to delete cholesterol data");
      }
    }
  } catch (error) {
    console.error("Error deleting cholesterol data:", error);
  }
};

  






 

     //////////////////////////////////////////cholesterolMedicine ////////////////////////////////////////////////

      const fetchDataMedicine = async () => {
              try {
                const response = await axios.get(`http://localhost:8070/cholesterolMedicine/get_cholesterol_Medicine/${nic}`);
                const data = response.data.data;
                if (data) {
                  data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

    // Function to handle delete operation for cholesterol medicine data
const handleDeleteMedicine = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/cholesterolMedicine/delete_cholesterol_Medicine/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the cholesterol medicine data
        fetchDataMedicine();
        console.log("Cholesterol medicine data deleted successfully");
      } else {
        console.error("Failed to delete cholesterol medicine data");
      }
    }
  } catch (error) {
    console.error("Error deleting cholesterol medicine data:", error);
  }
};






  
  

  return (
    <div >
   
   <div class="containerName">
    <h3>NIC: <span id="nic">{nic}</span></h3>
    <h3>Name: <span id="name">{name}</span></h3>
    <h3>Age: <span id="age">{age}</span></h3>
    <h3>Gender: <span id="gender">{gender}</span></h3>
</div>



      {cholesterolData ? (
        <div>
           <CholesterolLineGraph cholesterolData={cholesterolData}/>
                {/* Add text input fields for searching by year and month */}
                <div className="row">
  <div className="col-sm-3">
    <input
      type="text"
      className="form-control mb-2 mr-sm-2"
      placeholder="Search by Year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      style={{ width: '90%',marginTop:'20px',marginLeft:'55px' }}
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
<div class="table-wrapper12">
          <table className="pressure-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Date</th>
                <th>Report</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.name}</td>
                  <td>
                    {editingEntry === entry._id ? (
                      <input
                        type="number"
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
                      <button className="viewPDF" onClick={() => handleViewPDF(entry._id, entry.name, entry.date)}>
                         <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View 
                      </button>
                    )}
                  </td>
                  <td>
                    {editingEntry === entry._id ? (
                      <>
                      <button className="SaveButton" onClick={() => handleSaveEdit(entry._id)}><i className="fa fa-save" aria-hidden="true"></i>&nbsp; Save</button>
                      <button className="CancelButton" onClick={() => handleCancelEdit()}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Cancel</button>
                    </>
                    ) : (
                      <>
                      <button className="EditButton"  onClick={() => handleEditClick(entry._id, entry.level, entry.date)}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Edit
                      </button>
                       
                       <button className="deleteButton" onClick={() => handleDeleteClick(entry._id)}>
                       <i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete
                     </button>
                     </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>    

          <MedicineDataShowingTable
                MedicineDelete={handleDeleteMedicine}
                MedicineData={cholesterolMedicineData}
                status={medicinestatus}
                fetchDataMedicine={fetchDataMedicine}
                //handleEdit={handleEditMedicine}
                handleSaveEdit={handleSaveEditMedicine}
                reset={resetEditingState}
                filteredData={filteredData}
                MedicalDataType={"Cholesterol"}
                nic={nic}
                name={name}
                age={age}
                gender={gender}
                //handleCancelEdit={handleCancelEditMedicine}
      />
      
      
    </div>
       ) : (
        <p>{status}</p>
      )}
    </div>
  );
}
