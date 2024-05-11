import React,{useState,useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link, } from 'react-router-dom';


export default function AddPatient(){
    
  const { nic, name,age,gender } = useParams();

    //const[nic,setNic] = useState("");
    //const[name,setName] = useState("");
    const[diabetes,setDiabetes] = useState("No");
    const[cholesterol,setCholesterol] = useState("No");
    const[pressure,setPressure] = useState("No");
   

   // const [otherDiseases, setOtherDiseases] = useState("No");
    const [selectedDate, setSelectedDate] = useState(new Date()); // Add state for date
    const [submittedNics, setSubmittedNics] = useState([]);

    useEffect(() => {
      // Fetch the list of submitted NICs when the component mounts
      axios.get("http://localhost:8070/patients/get").then((response) => {
        const existingNics = response.data.map((patient) => patient.nic);
        setSubmittedNics(existingNics);
      }).catch((err) => {
        console.log(err);
      });
    }, []);


    function sendDate(event){

      

      if (submittedNics.includes(nic)) {
        alert("Patient with this NIC already exists.");
        return;
      }

        const newPatient = {
            nic,
            name,
            age,
            gender,
            date: selectedDate,
            diabetes,
            cholesterol,
            pressure,
            
        }

        axios.post("http://localhost:8070/patients/add",newPatient).then(()=>{
          alert("Patient added successfully.");
              setDiabetes("");
              setCholesterol("");
              setPressure("");
              setSelectedDate(new Date()); // Reset the date after submission

              
              
  
          }).catch((err)=>{
            alert(err)
          })


    }

    return(
        <div className="container border p-4" style={{ marginLeft: '500px',width: '650px' }}>
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
            value={nic} // Set value of nic input
            readOnly // Make the input read-only since it's coming from URL params
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
            value={name} // Set value of name input
            readOnly // Make the input read-only since it's coming from URL params
            required
          />
         </div>

         <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Enter Patient name"
            value={age} // Set value of name input
            readOnly // Make the input read-only since it's coming from URL params
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Enter Patient name"
            value={gender} // Set value of name input
            readOnly // Make the input read-only since it's coming from URL params
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

        

       {/* <div className="mb-3">
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
          </div> */}

        {/* Similar radio button structure for cholesterol and pressure */}

        <button type="submit" className="btn btn-primary"
        style={{ backgroundColor: 'blue',width: '450px',color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} >
          Submit
        </button>
      </form>
    </div>
     
  
      )
  

}