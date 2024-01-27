const venteChartOptions = () => {
    return {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  };
  
  export { venteChartOptions };
  