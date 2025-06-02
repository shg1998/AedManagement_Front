import Highcharts from "highcharts";
import { darkTheme, lightTheme } from "../../theme";

export function exportingOptions() {
  const theme = localStorage.getItem("theme");
  const sheet = new CSSStyleSheet();

  if (theme === "dark") {
    sheet.replaceSync(
      ".highcharts-menu { background-color: #373736 !important; } .highcharts-menu-item {color: #A19F9D !important; }"
    );
    document.adoptedStyleSheets = [sheet];
  } else {
    sheet.replaceSync(".highcharts-menu { } .highcharts-menu-item { }");
    document.adoptedStyleSheets = [sheet];
  }
  return {
    enabled: true,
    buttons: {
      contextButton: {
        menuItems: ["downloadPNG", "downloadJPEG"],
        theme: {
          fill:
            theme === "dark"
              ? darkTheme.palette.secondary.light
              : lightTheme.palette.secondary.light,
          // stroke: "yellow",
        },
        symbolStroke:
          theme === "dark"
            ? darkTheme.palette.card.dark
            : lightTheme.palette.card.dark,
      },
    },
    filename: "Chart_" + Highcharts.dateFormat("%Y.%m.%d (%H-%M)", Date.now()),
    menuItemDefinitions: {
      downloadPNG: {
        text: `PNG دریافت نمودار با فرمت`,
      },
      downloadJPEG: {
        text: `JPEG دریافت نمودار با فرمت`,
      },
    },
  };
}

export const EXPORT_TOOLTIP = "دانلود";
