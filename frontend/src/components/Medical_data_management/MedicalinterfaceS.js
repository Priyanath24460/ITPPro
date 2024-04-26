import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./medicalCSS/Medicalinterface.css";
import SideNavigation from "./SideNavigation";

export default function View(){

    const [patients, setPatients] = useState([]);
    


   /* function getallpatient() {
        axios.get("http://localhost:8070/patients/get").then((res) => {
          setPatients(res.data);
        }).catch((err) => {
          alert(err.message);
        })
      }
    
      useEffect(() => {
       
    
        getallpatient();
      }, [])*/


      useEffect(() => {
        function getCustomersA() {
          axios.get("http://localhost:8070/customerA/").then((res) => {
            setPatients(res.data);
          }).catch((err) => {
            alert(err.message);
          });
        }
    
        getCustomersA();
      }, []);



    return(
        <div >
          <SideNavigation /> {/* Include SideNavigation component */}
        <h1 className="title">Patients</h1>
        
        <table className="table_interface">
          <thead>
            <tr>
              <th >#</th>
              <th >NIC</th>
              <th>Name</th>
              <th>Age</th>
              <th>gender</th>


              <th >Acction</th>
             
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td >{index + 1}</td>
                <td>{patient.nic}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>
                <Link to={`/DataAddForm/${patient.nic}/${patient.name}/${patient.age}/${patient.gender}`} className="interface_table_Add">
                  <i className="fa-solid fa-user-plus" aria-hidden="true"></i>&nbsp;Add
                </Link>
             
                <Link to={`/profile/${patient.nic}/${patient.name}/${patient.age}/${patient.gender}`} className="interface_table_profile">
                  <i className="fa-solid fa-circle-user" aria-hidden="true"></i>&nbsp;profile
                </Link>
              </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}