import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResidentDetails = () => {
  const [resident, setResident] = useState({});
  const { NIC } = useParams();

  useEffect(() => {
    if (NIC) {
      axios.get(`http://localhost:8070/residents/getResident/${NIC}`)
        .then((res) => {
          if (res.data) {
            setResident(res.data.resident);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("NIC not found in props.");
    }
  }, [NIC]);

  return (
    <div>
      <h2>Resident Assignment Details</h2>
      <p>Resident NIC: {resident.NIC}</p>
      <p>Resident Name: {resident.resName}</p>
      <p>Room ID: {resident.roomID}</p>
      
      
    </div>
  );
};

export default ResidentDetails;