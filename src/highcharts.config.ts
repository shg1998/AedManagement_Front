import Highcharts from "highcharts";

Highcharts.setOptions({
  lang: {
    decimalPoint: ".",
    thousandsSep: ",",
  },
  tooltip: {
    useHTML: true,
    style: {
      whiteSpace: "nowrap",
      textAlign: "right",
      direction: "rtl",
    },
  },
  colors: [
    "#7cb5ec",
    "#434348",
    "#90ed7d",
    "#f7a35c",
    "#8085e9",
    "#f15c80",
    "#e4d354",
    "#2b908f",
    "#f45b5b",
    "#91e8e1",
  ],
});
