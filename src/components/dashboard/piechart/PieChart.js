import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const monthlyExpensesDataCategorized = props.data;

  const options = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  };

  return (
      <Pie data={monthlyExpensesDataCategorized}/>

  );
};

export default PieChart;
