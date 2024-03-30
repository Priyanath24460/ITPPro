import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DiabetesLineGraph from './DiabetesLineGraph';
import "./medicalCSS/MorePressureCSS.css";

export default function DiabetesData() {
  const { nic } = useParams();
  const [diabetesData, setDiabetesData] = useState(null);
  const [status, setStatus] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedLevel, setEditedLevel] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [pdfFileDiabetes, setPdfFileDiabetes] = useState(null);



  const fetchData = async () => {
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

// ... (existing code)


  
  

  return (
    <div>
      <h3>Diabetes Data for NIC: {nic}</h3>
      {diabetesData ? (
        <div>
          <DiabetesLineGraph diabetesData={diabetesData} />
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
              {diabetesData.map((entry) => (
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
                        month: '2-digit',
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
                      <button onClick={() => handleEditClick(entry._id, entry.level, entry.date)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
}
