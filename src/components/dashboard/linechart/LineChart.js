import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = (props) => {
  const budgetData = props.budgetData;
  let labels = [];
  let valuesBudget = [];

  Object.entries(budgetData).forEach((budgetMonth) => {
    labels.push(budgetMonth[0]);
    valuesBudget.push(budgetMonth[1]);
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Added to allow chart resizing
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {},
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Budget (Income - Expenses)',
        data: valuesBudget,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <div className="chart-wrapper" style={{ width: '100%', height: '350px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
