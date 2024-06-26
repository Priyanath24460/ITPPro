import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "./medicalCSS/onepatient.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";



export default function Profile(){

    const { nic} = useParams();
    const [patient, setPatient] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});

  


   
   

    function getOnePatient() {
        axios.get(`http://localhost:8070/patients/getone/${nic}`).then((res) => {
            console.log(res.data);
            setPatient(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    }

    

   
    

    function handleEditClick() {
        setEditMode(true);
        // Set initial values for the edit form
        setEditedData({
            nic:nic,
            diabetes: patient?.patient?.diabetes,
            cholesterol: patient?.patient?.cholesterol,
            pressure: patient?.patient?.pressure,
           
           
        });
    }

    function handleCancelClick() {
        setEditMode(false);
    }

    function handleSaveClick() {
        // Implement logic to update data using axios or your preferred method
        axios.put("http://localhost:8070/patients/update", editedData).then(() => {
            alert("Patient data updated");
            // Refresh patient data after successful update

           // getOnePatient() 
            window.location.reload();
          
          }).catch((e) => {
            alert(e.message);
          })
        // You can use editedData to send updated values to the server
        // After updating, setEditMode(false) to exit edit mode
    }

    useEffect(() => {
        getOnePatient();
    }, [nic]);



    const diabetesOptions = ["Yes", "No"];
    const cholesterolOptions = ["Yes", "No"];
    const pressureOptions = ["Yes", "No"];
    

    return (
        

        <div >
            <div className="table1-wrapper">
                <h1 className="NIC">NIC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {patient?.patient?.nic}</h1>
                <h1 className="Name">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {patient?.patient?.name}</h1>
                <h1 className="Age">Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {patient?.patient?.age}</h1>
                <h1 className="gender">gender&nbsp;&nbsp;&nbsp;: {patient?.patient?.gender}</h1>

             </div>

      <div className="table2-wrapper">
            {editMode ? (
            <div >
              <div>
                <table >
                   
              <tbody className="tableedit">
              <tr>
    <td>Diabetes</td>
    <td>
        <select
            value={editedData.diabetes}
            onChange={(e) => setEditedData({ ...editedData, diabetes: e.target.value })}
        >
            {diabetesOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </td>
</tr>
<tr>
    <td>Cholesterol</td>
    <td>
        <select
            value={editedData.cholesterol}
            onChange={(e) => setEditedData({ ...editedData, cholesterol: e.target.value })}
        >
            {cholesterolOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </td>
</tr>
<tr>
    <td>Pressure</td>
    <td>
        <select
            value={editedData.pressure}
            onChange={(e) => setEditedData({ ...editedData, pressure: e.target.value })}
        >
            {pressureOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </td>
</tr>


                 
              </tbody>
                    </table>
                </div>
            
               
            
                <div className="saveandcancelbuttons">
                <button className="savebutton"   onClick={handleSaveClick}>
               <i className="fas fa-save"></i>&nbsp; Save
                 </button>
                 &nbsp;
              <button className="cancelbutton"  onClick={handleCancelClick}>
             <i className="fas fa-times"></i> &nbsp;Cancel
             </button>
                </div>
            </div>
            ) : (
            <div>
                  <div>
            <table className="tablevalue">
                   
              <tbody >
                  <tr>
                      <td>Diabetes</td>
                      <td>
                        <span className={patient?.patient?.diabetes === "No" ? "greenText" : "redText"}>
                           {patient?.patient?.diabetes}
                     </span>
                     </td>
                  </tr>
                  <tr>
                      <td>Cholesterol</td>
                      <td><span className={patient?.patient?.cholesterol === "No" ?"greenText" : "redText"}>
                           {patient?.patient?.cholesterol}
                     </span></td>
                  </tr>
                  <tr>
                      <td>Pressure</td>
                      <td><span className={patient?.patient?.pressure === "No" ? "greenText" : "redText"}>
                           {patient?.patient?.pressure}
                     </span></td>
                  </tr>
                 
                  
              </tbody>
                    </table>
                    <button  className="editbutton" onClick={handleEditClick}><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Edit</button>
                </div>
            </div>
            )}
        </div>

            

            
        </div>

        
         



    );
}
