import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ColumnChartsProps {
  data: number[];
  labels: string[];
  potential?: number[];
}

const ColumnCharts: React.FC<ColumnChartsProps> = ({
  data,
  labels,
  potential,
}) => {
  const series = [
    {
      name: 'Total',
      type: 'column',
      data: data,
    },
    {
      name: 'Esperado',
      type: 'line',
      data: potential,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 5, 0],
      curve: 'straight',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: 'Horas',
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: any) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' horas';
          }
          return y;
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ColumnCharts;
