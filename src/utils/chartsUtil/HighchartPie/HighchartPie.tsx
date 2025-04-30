import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/routes";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

interface Props {
  chartKey: number;
  options?: Highcharts.Options;
  series: any;
}

const HighchartPie: React.FC<Props> = ({ chartKey, options, series }) => {
  const navigate = useNavigate();
  useEffect(() => {}, [series]);

  const defaultOptions: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      ...exportingOptions(),
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            color: "#fff",
            textOutline: "none",
            fontWeight: "light",
            fontSize: "0.8rem",
          },
          distance: "-30",
        },
        showInLegend: true,
        point: {
          events: {
            click: function () {
            },
          },
        },
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
      <HighchartsReact
        key={chartKey}
        highcharts={Highcharts}
        options={mergedOptions}
      />
    </div>
  );
};

export default HighchartPie;
