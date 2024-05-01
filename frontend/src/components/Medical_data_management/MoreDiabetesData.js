import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DiabetesLineGraph from './DiabetesLineGraph';
import "./medicalCSS/MorePressureCSS.css";
import MedicineDataShowingTable from './MedicineDataShowingTable';

export default function DiabetesData() {
  const { nic,name,age,gender } = useParams();
  const [diabetesData, setDiabetesData] = useState(null);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedLevel, setEditedLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFileDiabetes, setPdfFileDiabetes] = useState(null);

      // State variables related to cholesterol medicine data
    const [DiabetesMedicineData, setDiabetesMedicineData] = useState([]);
    const [medicinestatus, setmedicineStatus] = useState("");
   

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  

 // Function to handle filtering by year and month
 const filteredData = diabetesData ? diabetesData.filter(entry => {
  if (!selectedYear && !selectedMonth) return true;
  const entryDate = new Date(entry.date);
  return (
    (!selectedYear || entryDate.getFullYear() === parseInt(selectedYear, 10)) &&
    (!selectedMonth || entryDate.getMonth() === parseInt(selectedMonth, 10))
  );
}):[];








  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/diabetes/getonediabetesdata/${nic}`);
      const data = response.data.data;

      if (data) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
    
    fetchData();
  }, [nic]);

 

  const handleEditClick = (entryId, level, date) => {
    setEditingEntry(entryId);
    setEditedLevel(level);
    setEditedDate(date);
  };

  /*const handleSaveEdit = async (entryId) => {
    try {
      // Check if a new PDF file is provided
      if (pdfFileDiabetes) {
        // Upload the new PDF file
        const formData = new FormData();
        formData.append("pdfFile", pdfFileDiabetes);

        await axios.put(`http://localhost:8070/diabetes/update/${entryId}`, {
          level: editedLevel,
          date: editedDate,
        });

        // Refetch data after updating
        const response = await axios.put(`http://localhost:8070/diabetes/updatepdf/${entryId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = response.data.data;
        setDiabetesData(data);
        setStatus("Diabetes data updated successfully");

        // Reset editing state and file input
        setEditingEntry(null);
        setEditedLevel("");
        setEditedDate("");
        setPdfFileDiabetes(null);
      } else {
        // Update only the level and date if no new PDF file is provided
        await axios.put(`http://localhost:8070/diabetes/update/${entryId}`, {
          level: editedLevel,
          date: editedDate,
        });

        // Refetch data after updating
        const response = await axios.get(`http://localhost:8070/diabetes/getonediabetesdata/${nic}`);
        const data = response.data.data;
        setDiabetesData(data);
        setStatus("Diabetes data updated successfully");

        // Reset editing state
        setEditingEntry(null);
        setEditedLevel("");
        setEditedDate("");
      }
    } catch (error) {
      console.error("Error updating Diabetes data:", error);
      setStatus("Error updating diabetes data");
    }
  };*/

  const handleSaveEdit = async (entryId) => {
    try {
      const formData = new FormData();

      // Add level and date to the form data
      formData.append("level", editedLevel);
      formData.append("date", editedDate);

      // Check if a new PDF file is provided
      if (pdfFileDiabetes) {
        formData.append("pdfFile", pdfFileDiabetes);

        // Upload the new PDF file and update level and date
        await axios.put(`http://localhost:8070/diabetes/update/${entryId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        
      } else {
        // Update only the level and date if no new PDF file is provided
        await axios.put(`http://localhost:8070/diabetes/update/${entryId}`, formData);

        
      }

      fetchData(); // Call the fetchData function after updating

      setEditingEntry(null);
      setEditedLevel("");
      setEditedDate("");
      setPdfFileDiabetes(null);
      setStatus("Diabetes data updated successfully");

    } catch (error) {
      console.error("Error updating Diabetes data:", error);
      setStatus("Error updating diabetes data");
    }
  };

  // ... (existing imports and code)

const handleViewPDF = async (entryId, name, date) => {
  try {
    // Fetch the PDF data
    const response = await axios.get(`http://localhost:8070/diabetes/viewpdf/${entryId}`, {
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

const handleCancelEdit = () => {
  resetEditingState();
};

const resetEditingState = () => {
  setEditingEntry(null);
  setEditedLevel("");
  setEditedDate("");
  setPdfFileDiabetes(null);
};

// Function to delete diabetes data by ID
const handleDeleteClick = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/diabetes/delete/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the diabetes data
        fetchData();
        console.log("diabetes data deleted successfully");
      } else {
        console.error("Failed to delete diabetes data");
      }
    }
  } catch (error) {
    console.error("Error deleting diabetes data:", error);
  }
};




 //////////////////////////////////////////diabetes Medicine ////////////////////////////////////////////////

 const fetchDataMedicine = async () => {
  try {
    const response = await axios.get(`http://localhost:8070/diabetesMedicine/get_diabetes_Medicine/${nic}`);
    const data = response.data.data;
    if (data) {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDiabetesMedicineData(data);
      setStatus("diabetes data fetched successfully");
    } else {
      setDiabetesMedicineData([]);
      setStatus("diabetes data not found");
    }
  } catch (error) {
    console.error("Error fetching diabetes data:", error);
    setStatus("Error fetching diabetes data");
  }
};
useEffect(() => {


fetchDataMedicine();
}, [nic]);



const handleSaveEditMedicine = async (entryId,updatedData) => {
  try {
          
          
      
          // Make an API call to update the diabetes medicine data
          await axios.put(`http://localhost:8070/diabetesMedicine//update_diabetes_Medicine/${entryId}`, updatedData);
      
          // Reset editing state
          resetEditingState();
      
         // Refetch diabetes medicine data after saving changes
         fetchDataMedicine();
            
      
          // Update status
          //setStatus("diabetes medicine data updated successfully");
        } catch (error) {
          console.error("Error updating diabetes medicine data:", error);
          //setStatus("Error updating diabetes medicine data");
        }
  };


  // Function to handle delete operation for diabetes medicine data
const handleDeleteMedicine = async (entryId) => {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine data?");
    
    // If user confirms deletion, proceed with the delete request
    if (confirmDelete) {
      const response = await axios.delete(`http://localhost:8070/diabetesMedicine/delete_diabetes_Medicine/${entryId}`);
      if (response.status === 200) {
        // If deletion is successful, refetch the cholesterol medicine data
        fetchDataMedicine();
        console.log("diabetes medicine data deleted successfully");
      } else {
        console.error("Failed to delete diabetes medicine data");
      }
    }
  } catch (error) {
    console.error("Error deleting diabetes medicine data:", error);
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
      {diabetesData ? (
        <div>
         
          <DiabetesLineGraph diabetesData={diabetesData} />

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
       <div className="pressure-data-container">  
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
                        onChange={(e) => setPdfFileDiabetes(e.target.files[0])}
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
        </div>  
          <MedicineDataShowingTable
                MedicineDelete={handleDeleteMedicine}
                MedicineData={DiabetesMedicineData}
                status={medicinestatus}
                fetchDataMedicine={fetchDataMedicine}
                //handleEdit={handleEditMedicine}
                handleSaveEdit={handleSaveEditMedicine}
                reset={resetEditingState}
                filteredData={filteredData}
                MedicalDataType={"Diabetes"}
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
