import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const LoginPieChart = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/LoginEvent/loginevent'); // Change this URL to match your backend API route
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Render the pie chart when userData is updated
    if (userData && Object.keys(userData).length > 0) {
      renderPieChart(userData);
    }
  }, [userData]);

  const renderPieChart = (data) => {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'User Types',
          data: Object.values(data),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });

    return chart;
  };

  return (
    <div>
      <canvas id="myPieChart"></canvas>
    </div>
  );
};

export default LoginPieChart;