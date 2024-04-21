import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MedicineDataShowingTable.css";


export default function MedicineDataShowingTable({
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
            {MedicineData.map((entry) => (
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
                    <button onClick={() => handleEditMedicine(entry)}>Edit</button>
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
