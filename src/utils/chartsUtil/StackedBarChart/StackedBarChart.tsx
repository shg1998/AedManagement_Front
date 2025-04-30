import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  series: any;
  xaxisCategory: string[];
}

const StackedBarChart: React.FC<Props> = ({
  chartKey,
  options,
  series,
  xaxisCategory,
}) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "bar",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    exporting: {
      ...exportingOptions(),
    },
    xAxis: {
      categories: xaxisCategory,
    },
    yAxis: {
      min: 0,
      // max: Math.max(...data),
      tickInterval: 1, // Set the distance between labels to 1
      title: {
        text: "فراوانی",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },

    series: series,
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP
    }
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

export default StackedBarChart;
