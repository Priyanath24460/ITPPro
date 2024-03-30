import React,{useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function AddPatient(){

    const[nic,setNic] = useState("");
    const[name,setName] = useState("");
    const[diabetes,setDiabetes] = useState("No");
    const[cholesterol,setCholesterol] = useState("No");
    const[pressure,setPressure] = useState("No");
    const [otherDiseases, setOtherDiseases] = useState("No");
    const [selectedDate, setSelectedDate] = useState(new Date()); // Add state for date

    function sendDate(){

        const newPatient = {
            nic,
            name,
            date: selectedDate,
            diabetes,
            cholesterol,
            pressure,
            otherDiseases,
        }

        axios.post("http://localhost:8070/patients/add",newPatient).then(()=>{
            //alert("Student added")
              setNic("");
              setName("");
              setDiabetes("");
              setCholesterol("");
              setPressure("");
              setSelectedDate(new Date()); // Reset the date after submission
  
          }).catch((err)=>{
            alert(err)
          })


    }

    return(
        <div className="container border p-4">
      <form onSubmit={sendDate} >
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            Patient NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="nic"
            placeholder="Enter Patient NIC"
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Patient name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Diabetes</label>
          <div className="form-check">
            <input
              type="radio"
              id="diabetesYes"
              name="diabetes"
              className="form-check-input"
              value="Yes"
              checked={diabetes === "Yes"}
              onChange={() => setDiabetes("Yes")}
            />
            <label className="form-check-label" htmlFor="diabetesYes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="diabetesNo"
              name="diabetes"
              className="form-check-input"
              value="No"
              checked={diabetes === "No"}
              onChange={() => setDiabetes("No")}
            />
            <label className="form-check-label" htmlFor="diabetesNo">
              No
            </label>
          </div>
        </div>


        <div className="mb-3">
          <label className="form-label">Cholesterol</label>
          <div className="form-check">
            <input
              type="radio"
              id="cholesterolYes"
              name="cholesterol"
              className="form-check-input"
              value="Yes"
              checked={cholesterol === "Yes"}
              onChange={() => setCholesterol("Yes")}
            />
            <label className="form-check-label" htmlFor="cholesterolYes">
              Yes
            </label>
      
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="cholesterolNo"
              name="cholesterol"
              className="form-check-input"
              value="No"
              checked={cholesterol === "No"}
              onChange={() => setCholesterol("No")}
            />
            <label className="form-check-label" htmlFor="cholesterolNo">
              No
            </label>
          </div>
          
        </div>

        <div className="mb-3">
          <label className="form-label">Pressure</label>
          <div className="form-check">
            <input
              type="radio"
              id="pressureYes"
              name="pressure"
              className="form-check-input"
              value="Yes"
              checked={pressure === "Yes"}
              onChange={() => setPressure("Yes")}
            />
            <label className="form-check-label" htmlFor="pressureYes">
              Yes
            </label>
            
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="pressureNo"
              name="pressure"
              className="form-check-input"
              value="No"
              checked={pressure === "No"}
              onChange={() => setPressure("No")}
            />
            <label className="form-check-label" htmlFor="pressureNo">
              No
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="otherDiseases" className="form-label">
            Other Diseases
          </label>
          <textarea
            className="form-control"
            id="otherDiseases"
            placeholder="Enter other diseases"
            value={otherDiseases}
            onChange={(e) => setOtherDiseases(e.target.value)}
          />
        </div>

        {/* Similar radio button structure for cholesterol and pressure */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
     
  
      )
  

}