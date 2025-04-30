import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { EXPORT_TOOLTIP, exportingOptions } from "../chartUtils";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportingOffline from "highcharts/modules/offline-exporting";

HC_exporting(Highcharts);
HC_exportingOffline(Highcharts);
interface Props {
  chartKey: number;
  seriesArrayData: Highcharts.SeriesOptionsType[];
  xaxisCategory: string[];
  options: Highcharts.Options;
}

const CulomnChart: React.FC<Props> = ({
  chartKey,
  seriesArrayData,
  xaxisCategory,
  options,
}) => {
  // const export_options = exportingOptions();

  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "column",
      marginTop: 40,
    },
    credits: { enabled: false },
    exporting: {
      ...exportingOptions(),
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: xaxisCategory,
    },
    yAxis: {
      title: {
        text: "",
      },
    },

    plotOptions: {
      column: {
        cursor: "pointer",
        colorByPoint: true,
      },
    },

    colors: ["#826AF9", "#FFE700", "#FF6C40", "#2D99FF", "#505D6F", "#022EA8"],

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

export default CulomnChart;
