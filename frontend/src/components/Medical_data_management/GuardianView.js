import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AllCustomersViewGuardian() {
  
  const { nic} = useParams();
  const [cholesterolData, setCholesteroldata] = useState([]);
  const [status, setStatus] = useState("");
  const [diabetesData, setDiabetesData] = useState(null);
  const [pressureData, setPressureData] = useState(null);


  const fetchcholesterolData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/cholesterol/getonecholesteroldata/${nic}`);
      const data = response.data.data;

      console.log("Fetched Data:", data);

      

      if (data) {
              // Sort the cholesterol data by date in descending order
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
              setCholesteroldata(data);
        setStatus("cholesterol data fetched successfully");
      } else {
        setCholesteroldata([]);
        setStatus("cholesterol data not found");
      }
    } catch (error) {
      console.error("Error fetching cholesterol data:", error);
      setStatus("Error fetching cholesterol data");
    }
  };

  const fetchdiabetesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/diabetes/getonediabetesdata/${nic}`);
      const data = response.data.data;

      if (data) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDiabetesData(data);
        setStatus("Diabetes data fetched successfully");
      } else {
        setDiabetesData([]);
        setStatus("Diabetes data not found");
      }
    } catch (error) {
      console.error("Error fetching Diabetes data:", error);
      setStatus("Error fetching diabetes data");
    }
  };

  const fetchPressureData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/pressure/getonepd/${nic}`);
      const data = response.data.data;

      if (data) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPressureData(data);
        setStatus("Pressure data fetched successfully");
      } else {
        setPressureData([]);
        setStatus("Pressure data not found");
      }
    } catch (error) {
      console.error("Error fetching pressure data:", error);
      setStatus("Error fetching pressure data");
    }
  };



  




  useEffect(() => {

    
    fetchdiabetesData();
    fetchcholesterolData();
    fetchPressureData();
  }, [nic]);
 

  return (
          <div>
                <div>
                  <h1>Cholesterol Data</h1>
                    <div class="table-wrapper12">
                      
                              <table className="pressure-table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Level</th>
                                    <th>Date</th>
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                  {cholesterolData.map((entry) => (
                                    <tr key={entry._id}>
                                      <td>{entry.name}</td>
                                      <td>{entry.level}</td>
                                      <td>{entry.date}</td>
                                        </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                  </div>   

                  <div style={{ marginTop: '350px' }}>
                  <h1>Diabetes Data</h1>
                    <div class="table-wrapper12">
                      
                              <table className="pressure-table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Level</th>
                                    <th>Date</th>
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                  {diabetesData.map((entry) => (
                                    <tr key={entry._id}>
                                      <td>{entry.name}</td>
                                      <td>{entry.level}</td>
                                      <td>{entry.date}</td>
                                        </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                  </div> 

                  <div>
                  <h1>Pressure Data</h1>
                    <div class="table-wrapper12">
                      
                              <table className="pressure-table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th> High Level</th>
                                    <th> low Level</th>
                                    <th>Date</th>
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                  {pressureData.map((entry) => (
                                    <tr key={entry._id}>
                                      <td>{entry.name}</td>
                                      <td>{entry.level}</td>
                                      
                                      <td>{entry.high}</td>
                                      <td>{entry.low}</td>
                                      <td>{entry.date}</td>
                                        </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                  </div>     
       </div>           
  );
}
