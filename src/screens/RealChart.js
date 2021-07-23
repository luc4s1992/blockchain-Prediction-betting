import React from "react";
import Chart from "react-apexcharts";

export default props => {
  return <Chart type="line" options={props.options} series={props.series}  height="500" />;
};
