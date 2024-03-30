import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './medicalCSS/Profile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";



export default function AddPressureData(){
    const { nic, name } = useParams();

    console.log("yes");
    // Access the passed data
    
    const [highpressure, setHighpressure] = useState("");
    const [lowpressure, setLowpressure] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [pdfFile, setPdfFile] = useState(null);


    function sendpd() {
        try {
            const formData = new FormData();
            formData.append("nic", nic);
            formData.append("name", name);
            formData.append("high", highpressure);
            formData.append("low", lowpressure);
            formData.append("date", selectedDate);
            formData.append("pdfFile", pdfFile);
    
            axios.post("http://localhost:8070/pressure/addpd", formData)
                .then(() => {
                    alert("Data added successfully");
                    // Clear input fields and reset state
                    setHighpressure("");
                    setLowpressure("");
                    setSelectedDate(new Date());
                    setPdfFile(null);
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
            
        <form onSubmit={sendpd}>
            <table className="table1">
                    <thead>
                        <tr>
                            <th scope="col">ADD Pressure Data</th>
                            
                        </tr>
                   </thead>
                        <tbody>
                                <tr>
                                    <td>High</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="high pressure"
                                            placeholder="Enter high level"
                                            onChange={(e) => {
                                            setHighpressure(e.target.value);
                                            }}
                                        />
                                  </td>
                                </tr>
                                <tr>
                                    <td>low</td>
                                    <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="low pressure"
                                                placeholder="Enter low level"
                                                onChange={(e) => {
                                                setLowpressure(e.target.value);
                                                }}
                                            />
                                        </td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>
                                       <DatePicker
                                       className="form-control"
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
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
                                        onChange={(e) => setPdfFile(e.target.files[0])}
                                    />
                                        
                                    
                                    </td>
                                </tr>
                               
                        </tbody>

                        
             </table>

                <button type="submit" className="btn btn-primary custom-left-button1">
                Add
                </button>       
        </form>    

            <Link to={`/pressuremore/${nic}`} className="btn btn-primary custom-view-button1">
            <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View More
            </Link>

    </div>


    )

}