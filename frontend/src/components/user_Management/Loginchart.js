import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const LoginPieChart = () => {
  const [loginEventsData, setLoginEventsData] = useState({});

  useEffect(() => {
    // Function to fetch all login events data from backend
    const fetchAllLoginEventsData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/LoginEvent/getloginevents`);
        const data = await response.json();
        setLoginEventsData(data);
      } catch (error) {
        console.error('Error fetching login events data:', error);
      }
    };

    fetchAllLoginEventsData();
  }, []);

  useEffect(() => {
    // Render the pie chart when loginEventsData is updated
    if (loginEventsData && Object.keys(loginEventsData).length > 0) {
      renderPieChart(loginEventsData);
    }
  }, [loginEventsData]);

  // Function to render the pie chart
  const renderPieChart = (data) => {
    const ctx = document.getElementById('myPieChart').getContext('2d');
  
    // Calculate the total sum of values
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);
  
    // Adjust each value to sum up to 100
    const adjustedData = Object.keys(data).reduce((acc, key) => {
      acc[key] = (data[key] / total) * 100;
      return acc;
    }, {});
  
    // Clear any existing chart to avoid "Canvas is already in use" error
    Chart.register({
      id: 'clear',
      beforeDraw(chart, args, options) {
        chart.clear();
      }
    });
  
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(adjustedData),
        datasets: [{
          label: 'User Types',
          data: Object.values(adjustedData),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 205, 500)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart can be resized freely
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                // Specify the precision for percentage values (e.g., 2 decimal places)
                const value = context.parsed.toFixed(2);
                label += value + '%';
                return label;
              }
            }
          }
        }
      }
    });
  
    return chart;
  };

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <canvas id="myPieChart" width="300" height="300"></canvas>
    </div>
  );
};

export default LoginPieChart;