import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import './medicalCSS/Profile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function AddCholesterolData(){
    const{nic,name} = useParams();

     //Cholesterol
     const[level,setCholesterollevel] = useState("");
     const [pdfFilecholesterol, setPdfFilecholesterol] = useState(null);
     const [selectedDateCholesterol, setSelectedDateCholesterol] = useState(new Date());

     function sendCholesteroldata() {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", level);
           
            formData.append("date", selectedDateCholesterol);
            formData.append("pdfFile", pdfFilecholesterol);
    
            axios.post("http://localhost:8070/cholesterol/addcholesteroldata", formData)
                .then(() => {
                    alert("Data added successfully");
                    // Clear input fields and reset state
                    
                })
                .catch((err) => {
                    alert("Error adding data: " + err.message);
                });
        } catch (error) {
            alert("An unexpected error occurred: " + error.message);
        }
    }


    return(
        <div>
                <form onSubmit={sendCholesteroldata}>
                    <table className="table3">
                            <thead>
                                <tr>
                                    <th scope="col">ADD Cholesterol Data</th>
                                    
                                </tr>
                           </thead>
                                <tbody>
                                        <tr>
                                            <td>Level</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="cholesterol level"
                                                    placeholder="cholesterol level"
                                                    onChange={(e) => {
                                                    setCholesterollevel(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={selectedDateCholesterol}
                                                onChange={(date) => setSelectedDateCholesterol(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Report</td>
                                            <td>
                                            
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setPdfFilecholesterol(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button3">
                                                Add
                                                </button>       
                </form>    

                    <Link to={`/cholesterolmore/${nic}`} className="btn btn-primary custom-view-button3  ">
                    <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View More
                    </Link>

            </div>

    )
}