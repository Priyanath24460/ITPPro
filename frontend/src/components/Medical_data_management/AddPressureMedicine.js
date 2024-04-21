import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddPressureMedicine(){
    const { nic, name } = useParams();

    const[morningMedicine,setmorningMedicine] = useState("");
    const[morningMedicinedosage,setmorningMedicinedosage]=useState("");
    const[nightMedicine,setnightMedicine] = useState("");
    const[nightMedicinedosage,setnightMedicinedosage]=useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    function sendPressureMedicine(){

         const newpressureMedicine={
             nic,
             name,
             morningMedicine,
             morningdosage:morningMedicinedosage,
             nightMedicine,
             nightdosage:nightMedicinedosage,
             date:selectedDate 

         }

         axios.post("http://localhost:8070/pressureMedicine/addpressuremedicine",newpressureMedicine).then(()=>{
            
            setmorningMedicine("");
            setmorningMedicinedosage("");
            setnightMedicine("");
            setnightMedicinedosage("");
        
              setSelectedDate(new Date()); // Reset the date after submission
  
          }).catch((err)=>{
            alert(err)
          })

    }


return(

    <div>
            
        <form onSubmit={sendPressureMedicine}>
            <table className="pressureMedicinetable">
                    <thead>
                        <tr>
                            <th scope="col">ADD PressureMedicine Data</th>
                            
                        </tr>
                   </thead>
                        <tbody>
                                <tr>
                                    <td>Morning Medicine</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Morning Medicine"
                                            placeholder="Enter Morning Medicine"
                                            onChange={(e) => {
                                            setmorningMedicine(e.target.value);
                                            }}
                                        />
                                  </td>

                                  <td> Dosage(mg)</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Morning Medicine dosage"
                                            placeholder="Enter dosage"
                                            onChange={(e) => {
                                            setmorningMedicinedosage(e.target.value);
                                            }}
                                        />
                                  </td>

                               
                                </tr>
                                <tr>
                                <td>Night Medicine</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="NightMedicine"
                                            placeholder="Enter Night Medicine"
                                            onChange={(e) => {
                                            setnightMedicine(e.target.value);
                                            }}
                                        />
                                  </td>

                                  <td> Dosage(mg)</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="Night Medicine dosage"
                                            placeholder="Enter dosage"
                                            onChange={(e) => {
                                            setnightMedicinedosage(e.target.value);
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
                              
                               
                        </tbody>

                        
             </table>

                <button type="submit" className="btn btn-primary custom-left-pressureMedicinetable">
                Add
                </button>       
        </form>    

            

    </div>
  




);

}