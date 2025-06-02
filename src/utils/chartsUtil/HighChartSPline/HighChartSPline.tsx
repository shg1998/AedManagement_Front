import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { exportingOptions, EXPORT_TOOLTIP } from "../chartUtils";

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  xaxisCategory: string[];
  series: any;
}

const HighChartSPline: React.FC<Props> = ({
  chartKey,
  options,
  series,
  xaxisCategory,
}) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "spline",
    },

    credits: { enabled: false },
    exporting: {
      ...exportingOptions(),
    },
    xAxis: {
      categories: xaxisCategory,
      labels: {
        enabled: false,
      },
      lineWidth: 0, // remove x-axis border
    },
    title: {
      text: series[0].name,
      align: "center",
    },

    legend: {
      enabled: false,
    },

    yAxis: {
      title: {
        text: "تعداد رخدادهای شناسایی شده",
      },
      labels: {
        format: "{value}",
      },

      lineWidth: 2,
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
        },
      },
    },
    series: series,
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP,
    },
    // tooltip: {
    //     headerFormat: '<b>{series.name}</b><br/>',
    //     pointFormat: '{point.x} km: {point.y}°C'
    // },

    // series: seriesArrayData
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

export default HighChartSPline;
