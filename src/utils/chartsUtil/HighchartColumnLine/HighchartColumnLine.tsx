import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';

const HighchartColumnLine: React.FC = () => {
  const defaultOptions: Highcharts.Options = {
    title: {
      text: "",
    },
    credits: { enabled: false },
    exporting: {
      ...exportingOptions(),
    },
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP
    },
    xAxis: {
      categories: [
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
    },
    yAxis: {
      title: {
        text: "تعداد تهدیدات",
      },
    },
    tooltip: {
      valueSuffix: "تعداد تهدیدات",
    },

    colors: ["#6200EE"],
    series: [
      {
        type: "column",
        name: "تهدیدات",
        data: [59, 83, 65, 228, 184, 59, 83, 65, 228, 184],
        colors: ["#6200EE"],
      },
      {
        type: "line",
        name: "آسیب‌پذیری‌ها",
        data: [
          47, 83.33, 70.66, 239.33, 175.66, 47, 83.33, 70.66, 239.33, 175.66,
        ],
        color: "#C8A1FF",
        marker: {
          lineWidth: 2,
          lineColor: "#800080",
          fillColor: "white",
        },
      },
    ],
  };

  const mergedOptions = { ...defaultOptions };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={mergedOptions} />
    </div>
  );
};

export default HighchartColumnLine;
