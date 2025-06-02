import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { exportingOptions, EXPORT_TOOLTIP } from "../chartUtils";

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  data: any;
}
const seriesArrayData: any = [
  {
    name: "Speed",
    data: [40],
    tooltip: {
      valueSuffix: "مخاطره آمیز",
    },
    credits: { enabled: false },
    dataLabels: {
      format: " {y}  وضعیت مخاطره آمیز",
      x: 0,
      y: 20,
      borderWidth: 0,
      // color: (
      //     Highcharts.defaultOptions.title &&
      //     Highcharts.defaultOptions.title.style &&
      //     Highcharts.defaultOptions.title.style.color
      // ) || '#333333',
      style: {
        fontSize: "14px",
      },
    },
    dial: {
      radius: "70%",
      backgroundColor: "#780000",
      baseWidth: 24,
      baseLength: "0%",
      rearLength: "0%",
    },
    pivot: {
      backgroundColor: "#ffffff",
      radius: 6,
    },
  },
];

const HighchartsGauge: React.FC<Props> = ({ chartKey, options, data }) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "gauge",
      // plotBackgroundColor: "white",
      // plotBackgroundImage: "green",
      plotBorderWidth: 0,
      plotShadow: false,
      height: "300px",
    },
    exporting: {
      ...exportingOptions(),
    },
    credits: { enabled: false },

    title: {
      text: "",
    },

    pane: {
      startAngle: -155,
      endAngle: 155,
      background: undefined,
      /*         center: ['50%', '75%'],
       */ size: "100%",
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: "#fff",
      tickLength: 40,
      tickWidth: 1,
      minorTickInterval: undefined,
      labels: {
        distance: -50,
        style: {
          fontSize: "14px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 15,
          color: "#B0D136", // green
          thickness: 30,
        },
        {
          from: 15,
          to: 30,
          color: "#00AC46", // yellow
          thickness: 30,
        },
        {
          from: 30,
          to: 50,
          color: "#FFD700", // red
          thickness: 30,
        },
        {
          from: 50,
          to: 70,
          color: "#FD8C00", // red
          thickness: 30,
        },
        {
          from: 70,
          to: 85,
          color: "#DC0000", // red
          thickness: 30,
        },
        {
          from: 85,
          to: 100,
          color: "#780000", // red
          thickness: 30,
        },
      ],
    },

    series: seriesArrayData,
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div>
      <HighchartsReact
        key={chartKey}
        highcharts={Highcharts}
        options={mergedOptions}
      />
    </div>
  );
};

export default HighchartsGauge;
