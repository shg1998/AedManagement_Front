import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  series: any;
  category: any;
}

const SPLineChart: React.FC<Props> = ({
  chartKey,
  options,
  series,
  category,
}) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "spline",
    },

    title: {
      text: "",
    },
    exporting: {
      ...exportingOptions(),
    },
    xAxis: {
      categories: category,
    },
    yAxis: {
      title: {
        text: "تعداد تهدیدات",
      },
    },

    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "bottom",
      symbolRadius: 10,
      symbolPadding: 10,
      rtl: true,
    },
    plotOptions: {
      series: {
        marker: {
          symbol: "circle",
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: undefined,
          radius: 3,
        },
      },
    },

    credits: {
      enabled: false,
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

export default SPLineChart;
