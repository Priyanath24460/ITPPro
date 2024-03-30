import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import PressureLineGraph from './PressureLineGraph';




const PressureData = () => {
  const { nic } = useParams();
  const [pressureData, setPressureData] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/pressure/getonepd/${nic}`);
        const data = response.data.data;

        if (data) {
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

    fetchData();
  }, [nic]);

  const handleDownloadPDF = async (entryId) => {
    try {
      const response = await axios.get(`http://localhost:8070/pressure/getpdf/${entryId}`, {
        responseType: 'arraybuffer',
      });
      console.log('Download PDF Response:', response);

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${entryId}_pressure.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div>
      <h3>Pressure Data for NIC: {nic}</h3>
      {pressureData ? (
       <div> 
        <PressureLineGraph pressureData={pressureData}/>
        <table className="pressure-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>High</th>
              <th>Low</th>
              <th>Date</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {pressureData.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.high}</td>
                <td>{entry.low}</td>
                <td>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                <td>
                  {/* Assuming there's a 'pdfUrl' property in your data */}
                  <button onClick={() => handleDownloadPDF(entry._id)}>Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
};

export default PressureData;
