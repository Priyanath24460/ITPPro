import React, { useState } from "react";
import axios from "axios";
import './staffCss/Register.css';
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [adminBasic, setAdminBasic] = useState("");
    const [managerBasic, setManagerBasic] = useState("");
    const [bonus, setBonus] = useState("");
    const [OTrate, setOTrate] = useState("");

    function sendData(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        const paymentInfo = {
            adminBasic,
            managerBasic,
            bonus, 
            OTrate
           
        }

        axios.post("http://localhost:8070/payInfo/add", paymentInfo)
            .then(() => {
                alert("information added successfully");
                window.location.href = "/AllPayInfo"; 
            })
            .catch((err) => {
                alert(err);
            });
    }

   

    

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="adminBasic" className="form-label">
                       Admin Basic salary :
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="adminBasic"
                        placeholder="Enter Manager Basic Salary"
                        onChange={(e) => {
                            setAdminBasic(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="managerBasic" className="form-label">
                        Manager Basic Salary : 
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="managerBasic"
                        placeholder="Enter Manager Basic Salary"
                        onChange={(e) => {
                            setManagerBasic(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bonus" className="form-label">
                        Bonus :
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="bonus"
                        placeholder="Enter Bonus"
                        onChange={(e) => {
                            setBonus(e.target.value);
                        }}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="OTrate" className="form-label">
                        OT Rate : 
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="OTrate"
                        placeholder="Enter OT Rate"
                        onChange={(e) => {
                            setOTrate(e.target.value);
                        }}
                    />
                </div>

               

                <button type="submit" className="btn btn-primary">
                     Submit
                </button>
            </form>
        </div>
    );
}
