import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartsProps {
  data: number[];
  labels: string[];
}

const PieCharts: React.FC<PieChartsProps> = ({ data, labels }) => {
  const series = data;
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieCharts;
