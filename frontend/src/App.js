import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OnePatient from "./components/Medical_data_management/OnePatient";
import AddPatient from "./components/Medical_data_management/AddPatientS";
import Header from "./components/Medical_data_management/Header";
import Medicalinterface from "./components/Medical_data_management/MedicalinterfaceS";
import MorePressureData from "./components/Medical_data_management/MorePressureDataS";
import MoreDiabetesData from "./components/Medical_data_management/MoreDiabetesData";
import MoreCholesterolData from "./components/Medical_data_management/MoreCholesterolData";
import AddPressureData from "./components/Medical_data_management/AddPressureData";
import AddDiabetesData from "./components/Medical_data_management/AddDiabetesData";
import AddCholesterolData from "./components/Medical_data_management/AddCholesterolData";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/get" element={<Medicalinterface />} />
          <Route path="/add" element={<AddPatient />} />
          <Route path="/profile/:nic/:name/*" element={<ProfileRoutes />} />
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
      <AddPressureData />
      <AddDiabetesData/>
      <AddCholesterolData/>
    </>
  );
}

export default App;
