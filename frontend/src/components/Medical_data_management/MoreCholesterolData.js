import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import CholesterolLineGraph from './CholesterolLineGraph'; 
import MedicineDataShowingTable from './MedicineDataShowingTable';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


export default function CholesterolData() {
  const { nic } = useParams();
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
   


    <h3>Diabetes Data for NIC: {nic}</h3>
      {cholesterolData ? (
        <div>
           <CholesterolLineGraph cholesterolData={cholesterolData}/>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                      <option value="">All Year</option>
                      {/* You can populate the years dynamically based on your data */}
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      {/* Add more years as needed */}
                    </select>

                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                      <option value="">All Month</option>
                      {/* You can populate the months dynamically based on your data */}
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
                      
                      {/* Add more months as needed */}
                    </select>

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
              {filteredData.map((entry) => (
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
                      <>
                      <button onClick={() => handleEditClick(entry._id, entry.level, entry.date)}>
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
                MedicineData={cholesterolMedicineData}
                status={medicinestatus}
                fetchDataMedicine={fetchDataMedicine}
                //handleEdit={handleEditMedicine}
                handleSaveEdit={handleSaveEditMedicine}
                reset={resetEditingState}
                //handleCancelEdit={handleCancelEditMedicine}
      />

<PDFDownloadLink document={<MyDocument cholesterolData={cholesterolData} cholesterolMedicineData={cholesterolMedicineData} />} fileName="cholesterol_report.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
        </div>
       ) : (
        <p>{status}</p>
      )}
    </div>
  );
}
