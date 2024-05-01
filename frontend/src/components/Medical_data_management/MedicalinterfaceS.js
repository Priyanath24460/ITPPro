import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./medicalCSS/Medicalinterface.css";

export default function View() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getPatients() {
      try {
        const response = await axios.get("http://localhost:8070/customerA/");
        const patientsData = response.data;

        const patientsWithData = await Promise.all(
          patientsData.map(async (patient) => {
            const cholesterolDataResponse = await axios.get(`http://localhost:8070/cholesterol/getonecholesteroldata/${patient.nic}`);
            const cholesterolData = cholesterolDataResponse.data.data;
            cholesterolData.sort((a, b) => new Date(b.date) - new Date(a.date));

            const diabetesDataResponse = await axios.get(`http://localhost:8070/diabetes/getonediabetesdata/${patient.nic}`);
            const diabetesData = diabetesDataResponse.data.data;
            diabetesData.sort((a, b) => new Date(b.date) - new Date(a.date));

            const pressureDataResponse = await axios.get(`http://localhost:8070/pressure/getonepd/${patient.nic}`);
            const pressureData = pressureDataResponse.data.data;
            pressureData.sort((a, b) => new Date(b.date) - new Date(a.date));

            patient.isCholesterolInRange = checkCholesterolRange(cholesterolData);
            patient.isDiabetesInRange = checkDiabetesRange(diabetesData);
            patient.isPressureInRange = checkPressureRange(pressureData);

            return { ...patient, cholesterolData, diabetesData, pressureData };
          })
        );

        setPatients(patientsWithData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    getPatients();
  }, []);

  const checkCholesterolRange = (cholesterolData) => {
    if (cholesterolData && cholesterolData.length > 0) {
      const lastCholesterolLevel = cholesterolData[0].level;
      return lastCholesterolLevel >= 125 && lastCholesterolLevel <= 200;
    }
    return false;
  };

  const checkDiabetesRange = (diabetesData) => {
    if (diabetesData && diabetesData.length > 0) {
      const lastDiabetesLevel = diabetesData[0].level;
      return lastDiabetesLevel >= 90 && lastDiabetesLevel <= 140;
    }
    return false;
  };

  const checkPressureRange = (pressureData) => {
    if (pressureData && pressureData.length > 0) {
      const lastPressureHighLevel = pressureData[0].high;
      const lastPressureLowLevel = pressureData[0].low;
      return lastPressureLowLevel <= 85 && lastPressureHighLevel <= 125;
    }
    return false;
  };

  return (
    <div>
      <h1 className="title">Patients</h1>
      <table className="table_interface">
        <thead>
          <tr>
            <th>Cholesterol</th>
            <th>Diabetes</th>
            <th>Pressure</th>
            <th>#</th>
            <th>NIC</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>
                <div
                  className={`circle ${
                    patient.isCholesterolInRange
                      ? "green"
                      : patient.cholesterolData && patient.cholesterolData.length === 0
                      ? "grey"
                      : "red"
                  }`}
                ></div>
              </td>
              <td>
                <div
                  className={`circle ${
                    patient.isDiabetesInRange
                      ? "green"
                      : patient.diabetesData && patient.diabetesData.length === 0
                      ? "grey"
                      : "red"
                  }`}
                ></div>
              </td>
              <td>
                <div
                  className={`circle ${
                    patient.isPressureInRange
                      ? "green"
                      : patient.pressureData && patient.pressureData.length === 0
                      ? "grey"
                      : "red"
                  }`}
                ></div>
              </td>
              <td>{index + 1}</td>
              <td>{patient.nic}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>
                <Link
                  to={`/DataAddForm/${patient.nic}/${patient.name}/${patient.age}/${patient.gender}`}
                  className="interface_table_Add"
                >
                  <i className="fa-solid fa-user-plus" aria-hidden="true"></i>&nbsp;Add
                </Link>
                <Link
                  to={`/profile/${patient.nic}/${patient.name}/${patient.age}/${patient.gender}`}
                  className="interface_table_profile"
                >
                  <i className="fa-solid fa-circle-user" aria-hidden="true"></i>&nbsp;Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
