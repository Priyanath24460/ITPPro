import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './medicalCSS/Medicaldataform.css';

export default function HealthMedicineForm({ onSubmit, condition,nic,name, endpointmedicine }) {
    const [morningMedicine, setMorningMedicine] = useState("");
    const [morningMedicineDosage, setMorningMedicineDosage] = useState("");
    const [nightMedicine, setNightMedicine] = useState("");
    const [nightMedicineDosage, setNightMedicineDosage] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [existingData, setExistingData] = useState([]);


    useEffect(() => {
        fetchExistingData();
    }, []);

    const fetchExistingData = () => {
        let endpoint = "";
    switch (endpointmedicine) {
        case "cholesterol":
            endpoint = `http://localhost:8070/cholesterolMedicine/get_cholesterol_Medicine/${nic}`;
            break;
        case "diabetes":
            endpoint = `http://localhost:8070/diabetesMedicine/get_diabetes_Medicine/${nic}`;
            break;
        case "pressure":
            endpoint = `http://localhost:8070/pressureMedicine/get_pressure_Medicine/${nic}`;
            break;
        default:
            break;
    }

    axios
        .get(endpoint)
        .then((response) => {
            // Set existing data to state
            setExistingData(response.data.data);
        })
        .catch((error) => {
            console.error(`Error fetching existing data:`, error);
        });
    };


     // Function to validate if data for the same month and year already exists
     const isDataForSameMonthYearExists = (newDate) => {
        const newMonth = newDate.getMonth() + 1; // getMonth() returns 0-indexed month
        const newYear = newDate.getFullYear();

        // Check if any existing data matches the month and year of the new data
        return existingData.some(data => {
            const dataDate = new Date(data.date);
            const dataMonth = dataDate.getMonth() + 1;
            const dataYear = dataDate.getFullYear();
            return newMonth === dataMonth && newYear === dataYear;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if medicine data already exists for the selected month and year
        const isDataExists = isDataForSameMonthYearExists(selectedDate);
        if (isDataExists) {
            alert("Data for the same month and year already exists. Please choose a different date.");
            return; // Prevent further execution
        }
        const newMedicine = {
            nic,
            name,
            morningMedicine,
            morningdosage:morningMedicineDosage,
            nightMedicine,
            nightdosage:nightMedicineDosage,
            date: selectedDate
        };
        onSubmit(newMedicine);

         // Clear input fields after submitting the form
    setMorningMedicine("");
    setMorningMedicineDosage("");
    setNightMedicine("");
    setNightMedicineDosage("");
    setSelectedDate(new Date());
    };

    return (
        <form onSubmit={handleSubmit} >
    <table className="table1">
        <thead>
            <tr>
                <th scope="col">ADD {condition} Medicine Data</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Morning Medicine</td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Morning Medicine"
                        value={morningMedicine}
                        onChange={(e) => setMorningMedicine(e.target.value)}
                        required
                    />
                </td>
                <td>Dosage(mg)</td>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter dosage"
                        value={morningMedicineDosage}
                        onChange={(e) => setMorningMedicineDosage(e.target.value)}
                        required
                    />
                </td>
            </tr>
            <tr>
                <td>Night Medicine</td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Night Medicine"
                        value={nightMedicine}
                        onChange={(e) => setNightMedicine(e.target.value)}
                        required
                    />
                </td>
                <td>Dosage(mg)</td>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter dosage"
                        value={nightMedicineDosage}
                        onChange={(e) => setNightMedicineDosage(e.target.value)}
                        required
                    />
                </td>
            </tr>
            <tr>
                <td>Date</td>
                <td colSpan="3">
                    <DatePicker
                        className="form-control"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </td>
            </tr>
        </tbody>
    </table>

    <button type="submit" className="medicine_add_button">
        Add
    </button>
</form>

    );
}
