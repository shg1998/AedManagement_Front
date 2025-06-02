import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

HC_more(Highcharts);

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  series: any;
  category: any;
}

const HighchartpolarSpider: React.FC<Props> = ({
  chartKey,
  options,
  series,
  category,
}) => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      polar: true,
      type: "line",
    },
    credits: { enabled: false },
    exporting: {
      ...exportingOptions(),
    },
    title: {
      text: "",
    },
    pane: {
      size: "80%",
    },
    xAxis: {
      categories: category,
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      tickAmount: 5,
      min: 0,
    },
    tooltip: {
      shared: false,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
    },
    series: series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            pane: {
              size: "70%",
            },
          },
        },
      ],
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

export default HighchartpolarSpider;
