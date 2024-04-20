import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom



export default function View(){

    const [patients, setPatients] = useState([]);


    function getallpatient() {
        axios.get("http://localhost:8070/patients/get").then((res) => {
          setPatients(res.data);
        }).catch((err) => {
          alert(err.message);
        })
      }
    
      useEffect(() => {
       
    
        getallpatient();
      }, [])



    return(
        <div className="container">
        <h1>Medical view</h1>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NIC</th>
              <th scope="col">Name</th>
              <th scope="col">view</th>
             
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{patient.nic}</td>
                <td>{patient.name}</td>
                <td>
                <Link to={`/profile/${patient.nic}/${patient.name}/${patient.name}`} className="btn btn-primary">
                  <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View
                </Link>
              </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}