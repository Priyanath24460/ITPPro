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


// user management

import Allcustomers from './components/user_Management/Allcustomers';
import Signup from './components/user_Management/Signup';
import View from './components/user_Management/View';
import Update from './components/user_Management/Update';
import Login from './components/user_Management/Login'
import Elderprofile from './components/user_Management/Elderprofile'
import HomePage from './components/user_Management/HomePage';
import Registrationchoice from './components/user_Management/Registrationchoice';
import Loginchoice from './components/user_Management/Loginchoice';
import Guardiansignup from './components/user_Management/GuardianSignup';
import Guardianprofile from './components/user_Management/Guardianprofile';
import GuardianLogin from './components/user_Management/Guardianlogin';
import UpdateGuardian from './components/user_Management/Updateguardian';
import Allguardians from './components/user_Management/Allguardians';
import Staffsignup from './components/user_Management/Staffsignup';
import Stafflogin from './components/user_Management/Stafflogin';
import Allstaff from './components/user_Management/Allstaff';
import Staffprofile from './components/user_Management/Staffprofile';
import Admindashboard from './components/user_Management/Admindashboard';
import LoginPieChart from './components/user_Management/Loginchart';


// room management

import AddRoom from './components/room_management/AddRoom';
import EditRoom from './components/room_management/EditRoom';
import RoomDetails from './components/room_management/RoomDetails';
import NavBar from './components/room_management/NavBar';
import Home from './components/room_management/Home';
import AllResidents from './components/room_management/AllResidents';
import ResidentDetails from './components/room_management/ResidentDetails';
import AddResident from './components/room_management/AddResident';
import EditResident from './components/room_management/EditResident';


// staff management


import UpDate from './components/staff_management/Update'
import Delete from './components/staff_management/Delete';
import AllStaff from "./components/staff_management/AllStaff";
import AllPayInfo from './components/staff_management/AllPayInfo';
import UpdatePayInfo from './components/staff_management/UpdatePayInfo';
import SalaryForm from './components/staff_management/SalaryForm';
import AllPayRolls from './components/staff_management/AllPayRolls';
import Register from './components/staff_management/Register';
import StaffDashboard from "./components/staff_management/Staffdashboard";
import AllStaffList from "./components/staff_management/Allstafflist";
import AddSalaryPage from "./components/staff_management/SalaryForm";
import UpdatePayInformation from "./components/staff_management/Update";

// inventory management
//import Header from './components/header';
import AddItem from './components/Inventory_Management/additem';
import AllmediItems from './components/Inventory_Management/AllmedicalInventory';
import IndividualItem from './components/Inventory_Management/MedicalIndividual';
import UpdateItem from './components/Inventory_Management/updateMedical';
import AddItemForm from './components/Inventory_Management/addEventItem';
import EventInventoryList from './components/Inventory_Management/allEventInventory';
import EventIndividual from './components/Inventory_Management/eventindividualfetch'; // Import EventIndividual component
import UpdateEventItem from './components/Inventory_Management/updateEventInventory';





function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/get" element={<Medicalinterface />} />
          
          <Route path="/medicine" element={<AddPressureMedicine />} />
          <Route path="/profile/:nic/:name/:age/:gender/*" element={ProfileRoutes()} />
          <Route path="/DataAddForm/:nic/:name/:age/:gender/*" element={<AddPatient />} />
          <Route path="/pressuremore/:nic" element={<MorePressureData />} />
          <Route path="/diabetesmore/:nic" element={<MoreDiabetesData />} />
          <Route path="/cholesterolmore/:nic" element={<MoreCholesterolData />} />
         
         
          <Route path="/getloginevent" element={<LoginPieChart/>}/>
          <Route path="/admin" element={<Admindashboard/>}/>
          <Route path="/staffprofile/:nic" element={<Staffprofile/>} />
          <Route path="/allstaff" element= {<Allstaff/>} />
          <Route path="/stafflogin" element ={<Stafflogin/>} />
          <Route path="/addstaff" element ={<Staffsignup/>}/>
          <Route path="/allguardians" element = {<Allguardians/>} />
          <Route path="/updateguardian/:nic" element ={<UpdateGuardian/>}/>
          <Route path="/guardianlogin" element ={<GuardianLogin/>}/>
          <Route path="/guardianprofile/:email" element={<Guardianprofile/>}/>
          <Route path="/addguardian" element={<Guardiansignup/>} />
          <Route path="/loginchoice" element={<Loginchoice/>} />  
          <Route path="/registrationchoice" element={<Registrationchoice/>} />  
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/add" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Allcustomers />} />
          <Route path="/view/:nic" element={<View />} />
          <Route path="/update/:nic" element={<Update />} />
          <Route path="/elderprofile/:nic" element={<Elderprofile />} />
         
           
          <Route path="/roomHome" element={<Home />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/updateRoom/:roomID" element={<EditRoom />} />
            <Route path="/getRoom/:roomID" element={<RoomDetails />} />
            <Route path="/allAssignments" element={<AllResidents />} />
            <Route path="/getResident/:NIC" element={<ResidentDetails />} />
            <Route path="/addResident" element={<AddResident />} />
            <Route path="/updateResident/:NIC" element={<EditResident />} />
           
            


          <Route path="/AllPayInfo" element={<AllPayInfo />} />
          <Route path="/addPayInFo" element={<Register />} />
           <Route path="/delete/:nic" element={<Delete/>}/>
          <Route path="/addPayRoll" element={<SalaryForm/>}/>
          <Route path="/updatesalarayinfo/:id" element={<UpdatePayInformation/>}/>
          <Route path="/getallpayrolls" element={<AllPayRolls/>}/>
          <Route path="/staffdashboard" element={<StaffDashboard/>}/>
          <Route path="/getallstaff" element={<AllStaffList/>}/>
          <Route path="/addsalary" element={<AddSalaryPage/>}/>


          {/* Define your routes */}
          <Route path="/inventory/" element={<AllmediItems />} />
          <Route path="/inventory/add" element={<AddItem />} />
          <Route path="/inventory/:itemCode" element={<IndividualItem />} />
          <Route path="/inventory/update/:itemCode" element={<UpdateItem />} />
          {/* Add the routes for event inventory */}
          <Route path="/eventinventory/add" element={<AddItemForm />} />
          <Route path="/eventinventory" element={<EventInventoryList />} />
          {/* Route for individual event inventory item */}
          <Route path="/eventinventory/:itemCode" element={<EventIndividual />} />
          {/* Route for updating individual event inventory item */}
          <Route path="/eventinventory/update/:itemCode" element={<UpdateEventItem />} />



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
