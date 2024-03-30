import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import * as Luxon from 'luxon';
import 'chartjs-adapter-luxon';


const LineGraph = ({ pressureData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!pressureData) return;
  
    const dates = pressureData.map((entry) => Luxon.DateTime.fromISO(entry.date).toMillis());
    const high = pressureData.map((entry) => entry.high);
    const low = pressureData.map((entry) => entry.low);
  
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
  }, [pressureData]);
  

  return (
    <div>
      <h3>Pressure Level Over Time</h3>
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
};

export default LineGraph;
