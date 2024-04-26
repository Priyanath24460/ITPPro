import { useState, useEffect } from "react";
import axios from "axios";

const useExistingData = (nic, dataType,newDate) => {
  const [existingData, setExistingData] = useState([]);

  useEffect(() => {
    fetchExistingData();
    isDataForSameMonthYearExists(newDate);
  }, [nic, dataType,newDate]);

  const fetchExistingData = () => {
    let endpoint = "";
    switch (dataType) {
      case "cholesterol":
        endpoint = `http://localhost:8070/cholesterol/getonecholesteroldata/${nic}`;
        break;
      case "diabetes":
        endpoint = `http://localhost:8070/diabetes/getonediabetesdata/${nic}`;
        break;
      case "pressure":
        endpoint = `http://localhost:8070/pressure/getonepressuredata/${nic}`;
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
        console.error(`Error fetching existing ${dataType} data:`, error);
      });
  };

  // Function to validate if data for the same month and year already exists
  const isDataForSameMonthYearExists = (newDate) => {
    const newMonth = newDate.getMonth() + 1; // getMonth() returns 0-indexed month
    const newYear = newDate.getFullYear();

    // Check if any existing data matches the month and year of the new data
    return existingData.some((data) => {
      const dataDate = new Date(data.date);
      const dataMonth = dataDate.getMonth() + 1;
      const dataYear = dataDate.getFullYear();
      return newMonth === dataMonth && newYear === dataYear;
    });
  };

  return { existingData, isDataForSameMonthYearExists };
};

export default useExistingData;
