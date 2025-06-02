import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import { useThemeContext } from "../ThemeContext";

export default function useHighchartTheme() {
  const { theme } = useThemeContext();
  const [chartKey, setChartKey] = useState<number>(Math.random());
  useEffect(() => {
    Highcharts.theme = {
      chart: {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, `${theme.palette.secondary.light}`],
            [1, `${theme.palette.secondary.light}`],
          ],
        },
      },
      title: {
        style: {
          color: theme.palette.text.primary,
        },
      },
      subtitle: {
        style: {
          color: theme.palette.text.primary,
        },
      },
      xAxis: {
        gridLineColor: theme.palette.card.contrastText,

        labels: {
          style: {
            color: theme.palette.text.primary,
          },
        },
        title: {
          style: {
            color: theme.palette.text.primary,
          },
        },
      },
      yAxis: {
        gridLineColor: theme.palette.card.contrastText,
        labels: {
          style: {
            color: theme.palette.text.primary,
          },
        },
        title: {
          style: {
            color: theme.palette.text.primary,
          },
        },
      },
      legend: {
        itemStyle: {
          color: theme.palette.text.primary,
        },
        itemHoverStyle: {
          color: theme.palette.text.primary,
        },
        itemHiddenStyle: {
          color: theme.palette.text.primary,
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            style: {
              color: theme.palette.text.primary,
              textOutline: "none",
            },
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,

        style: {
          textOutline: "none",
          color: theme.palette.text.primary,
        },
      },
    };
    Highcharts.setOptions(Highcharts.theme);
    setChartKey(Math.random());
  }, [theme]);
  return chartKey;
}
