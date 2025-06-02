import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options: Highcharts.Options;
  series: Highcharts.SeriesOptionsType[];
  xaxisCategory?: string[]; // Make xaxisCategory optional
}

const BarChart: React.FC<Props> = ({
  chartKey,
  options,
  series,
  xaxisCategory = [],
}) => {
  const [storedXaxisCategory, setStoredXaxisCategory] = useState<string[]>([]);

  useEffect(() => {
    if (xaxisCategory.length > 0) {
      setStoredXaxisCategory(xaxisCategory);
    }
  }, [xaxisCategory]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
      marginTop:40,
      marginRight:30
    },
    title: {
      text: "",
    },
    exporting: {
      ...exportingOptions(),
    },
    xAxis: {
      categories: storedXaxisCategory,
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      title: {
        text: "درصد فراوانی",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,

        cursor: "pointer",
      },
      series: {
        animation: false,
        borderWidth: 0,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      enabled: false,
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: series,
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP
    }
  };

  const mergedOptions = { ...chartOptions, ...options };

  return (
    <div >
      <HighchartsReact
        key={chartKey}
        highcharts={Highcharts}
        options={mergedOptions}
      />
    </div>
  );
};

export default BarChart;
