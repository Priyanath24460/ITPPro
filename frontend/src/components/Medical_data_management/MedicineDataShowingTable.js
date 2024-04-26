import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MedicineDataShowingTable.css";


export default function MedicineDataShowingTable({
  MedicineDelete,
  MedicineData,
  status,
  handleSaveEdit,
  
}) {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedMorningMedicine, setEditedMorningMedicine] = useState("");
  const [editedMorningDosage, setEditedMorningDosage] = useState("");
  const [editedNightMedicine, setEditedNightMedicine] = useState("");
  const [editedNightDosage, setEditedNightDosage] = useState("");
  const [editedDate, setEditedDate] = useState("");

  const handleEditMedicine = (entry) => {
      
    setEditingEntry(entry._id);

    setEditedMorningMedicine(entry.morningMedicine);
    setEditedMorningDosage(entry.morningdosage);
    setEditedNightMedicine(entry.nightMedicine);
    setEditedNightDosage(entry.nightdosage);
    setEditedDate(entry.date);
  
    console.log("Edit clicked for cholesterol medicine entry:", entry);
};


const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  

 // Function to handle filtering by year and month
 const filteredData = MedicineData ? MedicineData.filter(entry => {
  if (!selectedYear && !selectedMonth) return true;
  const entryDate = new Date(entry.date);
  return (
    (!selectedYear || entryDate.getFullYear() === parseInt(selectedYear, 10)) &&
    (!selectedMonth || entryDate.getMonth() === parseInt(selectedMonth, 10))
  );
}):[];


const resetEditingState = () => {
  setEditingEntry(null);
  setEditedMorningMedicine("");
  setEditedMorningDosage("");
  setEditedNightMedicine("");
  setEditedNightDosage("");
  setEditedDate("");
};

// Prepare the data to be updated
const updatedData1 = {
          morning_Medicine: editedMorningMedicine,
          morning_dosage: editedMorningDosage,
          night_Medicine: editedNightMedicine,
          night_dosage: editedNightDosage,
          date: editedDate
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
};




  return (
    <div >
      
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
      {MedicineData ? (

        <table className="medicine-table">
          
          <thead>
            <tr>
              <th>Name</th>
              <th>Morning Medicine</th>
              <th>Morning Dosage</th>
              <th>Night Medicine</th>
              <th>Night Dosage</th>
              <th>Date</th>
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
                      type="text"
                      value={editedMorningMedicine}
                      onChange={(e) => setEditedMorningMedicine(e.target.value)}
                    />
                  ) : (
                    entry.morningMedicine
                  )}
                </td>
                <td>
                  {editingEntry === entry._id ? (
                    <input
                      type="text"
                      value={editedMorningDosage}
                      onChange={(e) => setEditedMorningDosage(e.target.value)}
                    />
                  ) : (
                    entry.morningdosage
                  )}
                </td>
                <td>
                  {editingEntry === entry._id ? (
                    <input
                      type="text"
                      value={editedNightMedicine}
                      onChange={(e) => setEditedNightMedicine(e.target.value)}
                    />
                  ) : (
                    entry.nightMedicine
                  )}
                </td>
                <td>
                  {editingEntry === entry._id ? (
                    <input
                      type="text"
                      value={editedNightDosage}
                      onChange={(e) => setEditedNightDosage(e.target.value)}
                    />
                  ) : (
                    entry.nightdosage
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
                    new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                  )}
                </td>
                <td>
                  {editingEntry === entry._id ? (
                    <>
                      <button onClick={() => handleSaveEdit(entry._id,updatedData1,resetEditingState())}>Save</button>
                      <button onClick={() => handleCancelEditMedicine()}>Cancel</button>
                    </>
                  ) : (
                    <>
                    <button onClick={() => handleEditMedicine(entry)}>Edit</button>
                    <button onClick={() => MedicineDelete(entry._id)}>Delete</button>
                  </>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
}
