import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import * as Luxon from 'luxon';
import 'chartjs-adapter-luxon';

const LineGraph = ({ diabetesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!diabetesData) return;
  
    const dates = diabetesData.map((entry) => Luxon.DateTime.fromISO(entry.date).toMillis());
    const levels = diabetesData.map((entry) => entry.level);
  
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
  }, [diabetesData]);
  

  return (
    <div>
      <h3>Diabetes Level Over Time</h3>
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
};

export default LineGraph;
