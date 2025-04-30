import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useThemeContext } from "../../../ThemeContext";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  series: any;
}

const DonutChart: React.FC<Props> = ({ chartKey, options, series }) => {
  const { theme } = useThemeContext();
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "",
    },
    exporting: {
      ...exportingOptions(),
    },
    plotOptions: {
      pie: {
        innerSize: "65%",
        borderWidth: 0, // set the border width to 5 pixels

        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",

          style: {
            color: `${theme.palette.text.primary}`,
            textOutline: "none",
            fontWeight: "light",
            fontSize: "0.8rem",
          },
          distance: "20",
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

    credits: { enabled: false },
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

export default DonutChart;
