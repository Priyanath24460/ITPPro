import React, { useEffect, useRef,useState } from 'react';
import { Chart } from 'chart.js/auto';
import * as Luxon from 'luxon';
import 'chartjs-adapter-luxon';
import './medicalCSS/LineGraph.css';

const LineGraph = ({ pressureData }) => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (!pressureData) return;
    
     // Filter data based on the selected year
    const filtered = pressureData.filter(entry => {
      const year = Luxon.DateTime.fromISO(entry.date).year;
      return year === selectedYear;
    });

    const dates = filtered.map((entry) => Luxon.DateTime.fromISO(entry.date).toMillis());
    const high = filtered.map((entry) => entry.high);
    const low = filtered.map((entry) => entry.low);
  
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
            label: 'high Pressure Level',
            data: high,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Low Pressure Level',
            data: low,
            borderColor: 'rgba(255, 99, 132, 1)',
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
              text: 'Pressure Level',
            },
          },
        },
      },
    });
  
    // Save the chart instance in the ref for future reference
    chartRef.current.chart = newChart;
  }, [pressureData,selectedYear]);
   
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
