
// const Speedometer = ({ value }) => {
//   const chartRef = useRef(null);
//   const [valeur, setValeur] = useState(value);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');

//     const data = {
//       labels: ['Low', 'Medium', 'High'],
//       datasets: [{
//         data: [33.3, 33.3, 33.3], // Les valeurs représentent un tiers de la jauge pour chaque niveau
//         backgroundColor: ['#ffcc00', '#ff9900', '#cc3300']
//       }]
//     };

//     const options = {
//       scale: {
//         ticks: {
//           display: false,
//           beginAtZero: true,
//           max: 100
//         },
//         pointLabels: {
//           fontColor: 'black',
//           fontSize: 12
//         }
//       }
//     };

//     new Chart(ctx, {
//       type: 'polarArea',
//       data: data,
//       options: options
//     });
//   }, [value]);

//   return <canvas ref={chartRef} />;
// };

// export default Speedometer;

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Diagrammecamamber = ({ value }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['Low', 'Medium', 'High'],
      datasets: [{
        data: [33.3, 33.3, 33.3],
        backgroundColor: ['#ffcc00', '#ff9900', '#cc3300']
      }]
    };

    const options = {
      scale: {
        ticks: {
          display: false,
          beginAtZero: true,
          max: 100
        },
        pointLabels: {
          fontColor: 'black',
          fontSize: 12
        }
      }
    };

    const newChartInstance = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [value]);

  return <canvas ref={chartRef} />;
};

export default Diagrammecamamber;