import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MedicineDataShowingTable.css";
import { jsPDF } from "jspdf";


export default function MedicineDataShowingTable({
  MedicineDelete,
  MedicineData,
  status,
  handleSaveEdit,
  filteredData,
  MedicalDataType,
  nic,
  name,
  age,
  gender


  
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
 const filteredDataMedicine = MedicineData ? MedicineData.filter(entry => {
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

const generatePDF = (filteredData, filteredMedicineData,type,nic,name,age,gender) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  doc.text(type+" Medical History", 80, 10,{ fontSize: 28, fontWeight: 'bold' });

  doc.text(" Nic    : "+nic, 10, 30);
  doc.text(" Name   : "+name, 10, 40);
  doc.text(" Age    : "+age, 10, 50);
  doc.text(" Gender : "+gender, 10, 60);


  // Add content to the PDF
  doc.text(type+" Data", 10, 85);

  // Convert cholesterol data to array of arrays
  

  if (type=="Pressure") {

    const cholesterolTable = filteredData.map(entry => [
  
    entry.high,
    entry.low,
    
    new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
  ]);
    doc.autoTable({
      startY: 90,
      head: [['High Level','Low Level','Date']],
      body: cholesterolTable
    });
    
  }else{
    const cholesterolTable = filteredData.map(entry => [
      
      entry.level,
      new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })
    ]);

  doc.autoTable({
    startY: 90,
    head: [['Level','Date']],
    body: cholesterolTable
  });}

  

  doc.text("Medicine Data", 10, doc.autoTable.previous.finalY + 10);

  // Convert medicine data to array of arrays
  const medicineTable = filteredMedicineData.map(entry => [
    
    entry.morningMedicine,
    entry.morningdosage,
    entry.nightMedicine,
    entry.nightdosage,
    new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
  ]);

  // Add medicine data table
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 20,
    head: [['Morning Medicine', 'Morning Dosage(mg)', 'Night Medicine(mg)', 'Night Dosage', 'Date']],
    body: medicineTable
  });

  // Save the PDF
  doc.save(type+" data and_medicine_data.pdf");
}






  return (
    <div >
      
      <div className="row">
  <div className="col-sm-3">
    <input
      type="text"
      className="form-control mb-2 mr-sm-2"
      placeholder="Search by Year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      style={{ width: '90%',marginTop:'50px',marginLeft:'15px' }}
    />
  </div>
  <div className="col-sm-3">
    <select
      className="form-control mb-2 mr-sm-2"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      style={{ width: '70%',marginLeft:'0px' , marginTop:'50px'}}
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
            {filteredDataMedicine.map((entry) => (
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
                      type="number"
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
                      type="number"
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

<div className="row">
      <div className="col-sm-3" style={{ marginTop: '20px' }}>
        <button onClick={() => generatePDF(filteredData, filteredDataMedicine, MedicalDataType, nic, name, age, gender)}>Download PDF</button>
      </div>
    </div>
    </div>
  );
}
