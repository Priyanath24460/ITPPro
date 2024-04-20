import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OnePatient from "./components/Medical_data_management/OnePatient";
import AddPatient from "./components/Medical_data_management/AddPatientS";
import Header from "./components/Medical_data_management/Header";
import Medicalinterface from "./components/Medical_data_management/MedicalinterfaceS";
import MorePressureData from "./components/Medical_data_management/MorePressureDataS";
import MoreDiabetesData from "./components/Medical_data_management/MoreDiabetesData";
import MoreCholesterolData from "./components/Medical_data_management/MoreCholesterolData";

import AddPressureMedicine from "./components/Medical_data_management/AddPressureMedicine";
import PatientProfile from "./components/Medical_data_management/PatientProfile"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/get" element={<Medicalinterface />} />
          <Route path="/add" element={<AddPatient />} />
          <Route path="/medicine" element={<AddPressureMedicine />} />
          <Route path="/profile/:nic/:name/*" element={ProfileRoutes()} />
          <Route path="/pressuremore/:nic" element={<MorePressureData />} />
          <Route path="/diabetesmore/:nic" element={<MoreDiabetesData />} />
          <Route path="/cholesterolmore/:nic" element={<MoreCholesterolData />} />
         
        </Routes>
      </div>
    </Router>
  );
}


function ProfileRoutes() {
  return (
    <>
      <OnePatient />
      <PatientProfile />
     
    </>
  );
}

export default App;
