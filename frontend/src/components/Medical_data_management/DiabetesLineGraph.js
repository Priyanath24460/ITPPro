import React, { useEffect, useRef, useState  } from 'react';
import { Chart } from 'chart.js/auto';
import * as Luxon from 'luxon';
import 'chartjs-adapter-luxon';
import './medicalCSS/LineGraph.css'; // Import the CSS file

const LineGraph = ({ diabetesData }) => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (!diabetesData) return;

     // Filter data based on the selected year
     const filtered = diabetesData.filter(entry => {
      const year = Luxon.DateTime.fromISO(entry.date).year;
      return year === selectedYear;
    });
  
    const dates = filtered.map((entry) => Luxon.DateTime.fromISO(entry.date).toMillis());
    const levels = filtered.map((entry) => entry.level);

  
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    // Clear the existing canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
  
    // Create a new chart
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Diabetes Level',
            data: levels,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'timeseries',
            time: {
              unit: 'month',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Diabetes Level',
            },
          },
        },
      },
    });
  
    // Save the chart instance in the ref for future reference
    chartRef.current.chart = newChart;
  }, [diabetesData,selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  

  return (
    <div className="chart-container">
    <div className="year-input">
      <label htmlFor="year-input">Enter Year : </label>
      <input 
        id="year-input" 
        type="number" 
        value={selectedYear} 
        onChange={handleYearChange} 
        placeholder="Enter Year"
      />
    </div>
    <h3>Cholesterol Level Over Time</h3>
    <canvas ref={chartRef} />
  </div>
  );
};

export default LineGraph;
