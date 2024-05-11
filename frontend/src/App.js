import React from "react";
import './App.css';
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
import Medicalsidenav from "./components/Medical_data_management/medicalsidenav";
import AllCustomersViewGuardian from "./components/Medical_data_management/GuardianView";

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
import Forgotpassword from './components/user_Management/Forgotpassword';
import OtpEntry from "./components/user_Management/OtpEntry";
import UpdateGuardianPassword from "./components/user_Management/UpdateGuardianPassword";


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
import RoomDashboard from "./components/room_management/RoomDashboard";


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
import HistorySummary from './components/Inventory_Management/HistorySummary';
import InventoryDashboard from "./components/Inventory_Management/inventorydashboard";


//payment management

import AccountDetails from './components/payment_management/AccountDetails';
import viewDetails from './components/payment_management/viewDetails';
import HolderDetails from './components/payment_management/HolderDetails';
import viewPaymentDetails from './components/payment_management/viewPaymentDetails';
import AddMonthlyCost from './components/payment_management/AddMonthlyCost';
import PaymentSuccess from './components/payment_management/paymentSuccess';
import PaymentHistory from './components/payment_management/PaymentHistory';









function App() {
  return (
    <Router>
      <div>
       
        <Routes>
        <Route path="/get" element={MedicalinterfaceRoutes()} />
          
          <Route path="/medicine" element={<AddPressureMedicine />} />
          <Route path="/profile/:nic/:name/:age/:gender/*" element={ProfileRoutes()} />
          <Route path="/DataAddForm/:nic/:name/:age/:gender/*" element={AddPatientRoutes()} />
          <Route path="/pressuremore/:nic/:name/:age/:gender/*" element={<MorePressureData />} />
          <Route path="/diabetesmore/:nic/:name/:age/:gender/*" element={<MoreDiabetesData />} />
          <Route path="/cholesterolmore/:nic/:name/:age/:gender/*" element={<MoreCholesterolData />} />
          <Route path="/gurdianView" element={<AllCustomersViewGuardian />} />


         
          <Route path="/updateguardianpassword/:email" element={<UpdateGuardianPassword />} />
          <Route path="/otpentry/:email" element={<OtpEntry/>}/>
          <Route path="/forgotpassword" element={<Forgotpassword/>}/>
          <Route path="/getloginevent" element={<LoginPieChart/>}/>
          <Route path="/admin:nic" element={<Admindashboard/>}/>
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
         
           
          <Route path="/roomHome" element={Homeadd()} />
            <Route path="/addRoom" element={AddRoom1() } />
            <Route path="/updateRoom/:roomID" element={EditRoom1() } />
            <Route path="/getRoom/:roomID" element={<RoomDetails />} />
            <Route path="/allAssignments" element={AllResidents1()} />
            <Route path="/getResident/:NIC" element={<ResidentDetails />} />
            <Route path="/addResident" element={AddResident1()} />
            <Route path="/updateResident/:NIC" element={EditResident1()} />
           
            


          <Route path="/AllPayInfo" element={<AllPayInfo />} />
          <Route path="/addPayInFo" element={<Register />} />
           <Route path="/delete/:nic" element={<Delete/>}/>
          <Route path="/addPayRoll" element={<SalaryForm/>}/>
          <Route path="/updatesalarayinfo/:id" element={<UpdatePayInformation/>}/>
          <Route path="/getallpayrolls" element={<AllPayRolls/>}/>
          <Route path="/staffdashboard" element={<StaffDashboard/>}/>
          <Route path="/getallstaff" element={<AllStaffList/>}/>
          <Route path="/addsalary" element={<AddSalaryPage/>}/>


         {/*inventory call---------------------------------*/}
          
        
            {/* Define your routes */}
            <Route path="/inventory/" element={allmedical()} />
            <Route path="/inventory/add" element={medicaladdc() } />
            <Route path="/inventory/:itemCode" element={<IndividualItem />} />
            <Route path="/inventory/update/:itemCode" element={updatemedicalc()} />
            {/* Add the routes for event inventory */}
            <Route path="/eventinventory/add" element={eventaddc() } />
            <Route path="/eventinventory" element={allevent() } />
            {/* Route for individual event inventory item */}
            <Route path="/eventinventory/:itemCode" element={<EventIndividual />} />
            {/* Route for updating individual event inventory item */}
            <Route path="/eventinventory/update/:itemCode" element={updateeventc()} />
            <Route path="/history/" element={historymedicalviewc() } />
      
      {/*Payment---------------------------------*/}
      <Route path='/viewDetails/' exact Component={viewDetails}/>
      <Route path = '/addCardDetaiils' exact Component={AccountDetails}/>
      <Route path='/addn' exact Component={HolderDetails}/>
      <Route path='/n' exact Component={viewPaymentDetails}/>
      <Route path='/addcost' exact Component={AddMonthlyCost}/>
      <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      <Route path='checkpage' exact Component={PaymentHistory}/>

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
      <Medicalsidenav/>
     
    </>
  );
}
function MedicalinterfaceRoutes() {
  return (
    <>
      <Medicalinterface />
      <Medicalsidenav/>
     
    </>
  );
}
function AddPatientRoutes() {
  return (
    <>
      <AddPatient />
      <Medicalsidenav/>
     
    </>
  );
}

//inventory functions-----------------------------------------------------------------------------------------------------
function allmedical() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <AllmediItems />
       </div>
       </div>
      
     
    </>
  );
}

function allevent() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <EventInventoryList />
       </div>
       </div>
      
     
    </>
  );
}

function medicaladdc() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <AddItem />
       </div>
       </div>
      
     
    </>
  );
}

function eventaddc() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <AddItemForm />
       </div>
       </div>
      
     
    </>
  );
}

function historymedicalviewc() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <HistorySummary />
       </div>
       </div>
      
     
    </>
  );
}

function updatemedicalc() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <UpdateItem />
       </div>
       </div>
      
     
    </>
  );
}

function updateeventc() {
  return (
    <>
    <div className="App">
       <InventoryDashboard />
       <div className="content-container">
       <UpdateEventItem />
       </div>
       </div>
      
     
    </>
  );
}


//room management functions

function Homeadd(){
  return (
    <>
    
      <Home/>
      <RoomDashboard/>
     
    </>
  );
}
function AddRoom1(){
  return (
    <>
    
      <AddRoom/>
      <RoomDashboard/>
     
    </>
  );
}

function EditRoom1(){
  return (
    <>
    
      <EditRoom/>
      <RoomDashboard/>
     
    </>
  );
}

function AddResident1(){
  return (
    <>
    
      <AddResident/>
      <RoomDashboard/>
     
    </>
  );
}


function AllResidents1(){
  return (
    <>
    
      <AllResidents/>
      <RoomDashboard/>
     
    </>
  );
}

function EditResident1(){
  return (
    <>
    
      <EditResident/>
      <RoomDashboard/>
     
    </>
  );
}

export default App;
