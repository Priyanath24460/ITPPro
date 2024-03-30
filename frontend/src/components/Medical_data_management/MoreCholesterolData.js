import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./medicalCSS/MorePressureCSS.css";
import CholesterolLineGraph from './CholesterolLineGraph'; 

export default function CholesterolData() {
  const { nic } = useParams();
  const [cholesterolData, setCholesteroldata] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/cholesterol/getonecholesteroldata/${nic}`);
        const data = response.data.data;

        console.log("Fetched Data:", data);

        

        if (data) {
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
    fetchData();
  }, [nic]);

  useEffect(() => {
    console.log("Updated cholesterolData:", cholesterolData);
  }, [cholesterolData]);

  const handleEdit = (entry) => {
    // Implement the logic for handling edit action
    console.log("Edit clicked for entry:", entry);
  };

  const handleDownloadPDF = async (entryId) => {
    try {
      const response = await axios.get(`http://localhost:8070/cholesterol/getpdf/${entryId}`, {
        responseType: 'arraybuffer',
      });
      console.log('Download PDF Response:', response);

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${entryId}_cholesterol.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

 

 
  
  

  return (
    <div>
      <h3>Cholesterol Data for NIC: {nic}</h3>
      {cholesterolData ? (
       <div> 
         <CholesterolLineGraph cholesterolData={cholesterolData}/>
        <table className="pressure-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Date</th>
              <th>PDF</th>
              
            </tr>
          </thead>
          <tbody>
            {cholesterolData.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.level}</td>
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
}
