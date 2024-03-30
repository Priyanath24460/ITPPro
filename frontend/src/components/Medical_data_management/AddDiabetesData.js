import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './medicalCSS/Profile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";



export default function AddDiabetesData(){
    const{nic,name} = useParams();

     //Diabetes
     const[level,setDiabeteslevel] = useState("");
     const [pdfFilediabetes, setPdfFilediabetes] = useState(null);
     const [selectedDatediabetes, setSelectedDatediabetes] = useState(new Date());

     function senddiabetesdata() {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("level", level);
           
            formData.append("date", selectedDatediabetes);
            formData.append("pdfFile", pdfFilediabetes);
    
            axios.post("http://localhost:8070/diabetes/adddiabetesdata", formData)
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
                <form onSubmit={senddiabetesdata}>
                    <table className="table2">
                            <thead>
                                <tr>
                                    <th scope="col">ADD Diabetes Data</th>
                                    
                                </tr>
                           </thead>
                                <tbody>
                                        <tr>
                                            <td>Level</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="diabetes level"
                                                    placeholder="diabetes level"
                                                    onChange={(e) => {
                                                    setDiabeteslevel(e.target.value);
                                                    }}
                                                />
                                          </td>
                                        </tr>
                                       
                                        <tr>
                                            <td>Date</td>
                                            <td>
                                               <DatePicker
                                               className="form-control"
                                                selected={selectedDatediabetes}
                                                onChange={(date) => setSelectedDatediabetes(date)}
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
                                                onChange={(e) => setPdfFilediabetes(e.target.files[0])}
                                            />
                                                
                                            
                                            </td>
                                        </tr>
                                       
                                </tbody>

                                
                    </table>

                                                <button type="submit" className="btn btn-primary custom-left-button2">
                                                Add
                                                </button>       
                </form>    

                    <Link to={`/diabetesmore/${nic}`} className="btn btn-primary custom-view-button2">
                    <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View More
                    </Link>

            </div>

    )
}