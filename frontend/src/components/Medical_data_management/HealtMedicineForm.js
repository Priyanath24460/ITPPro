import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './medicalCSS/Medicaldataform.css';

export default function HealthMedicineForm({ onSubmit, condition,nic,name }) {
    const [morningMedicine, setMorningMedicine] = useState("");
    const [morningMedicineDosage, setMorningMedicineDosage] = useState("");
    const [nightMedicine, setNightMedicine] = useState("");
    const [nightMedicineDosage, setNightMedicineDosage] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
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
