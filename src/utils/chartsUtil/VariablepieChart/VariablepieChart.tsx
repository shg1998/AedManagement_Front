import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

variablePie(Highcharts);

interface Props {
  options?: Highcharts.Options;
  series: any;
}

const VariablepieChart: React.FC<Props> = ({ options, series }) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "variablepie",
    },

    credits: { enabled: false },
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 2, // this will show the grid line in Y-axis
    },

    xAxis: {
      gridLineWidth: 2, // this will show the grid line in X-axis
    },
    exporting: {
      ...exportingOptions(),
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",

          // <b>{point.name}</b>:

          style: {
            color: "#fff",
            textOutline: "none",
            fontWeight: "light",
            fontSize: "0.8rem",
          },
          distance: "-30",
        },
        showInLegend: true,
      },
    },

    legend: {
      layout: "horizontal",
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      symbolRadius: 4,
      symbolPadding: 10,
      rtl: true,
    },

    series: series,
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP
    }
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={mergedOptions} />
    </div>
  );
};

export default VariablepieChart;
