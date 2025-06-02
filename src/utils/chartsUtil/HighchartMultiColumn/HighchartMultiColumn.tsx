import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options?: Highcharts.Options;
  series: any;
  xaxisCategory: string[];
}

const HighchartMultiColumn: React.FC<Props> = ({
  chartKey,
  series,
  xaxisCategory,
  options,
}) => {
  // useEffect(() => {
  //   // Perform any necessary actions here when the series prop changes
  // }, [series]);

  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "column",
    },
    exporting: {
      ...exportingOptions(),
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: xaxisCategory,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
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

export default HighchartMultiColumn;
