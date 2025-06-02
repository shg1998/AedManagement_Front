import React from "react";
import { createTheme } from "@mui/material/styles";
import { StylesProvider, jssPreset } from "@mui/styles";
import { create } from "jss";
// import rtl from "jss-rtl";
import { faIR } from "@mui/material/locale";

const jss = create({ plugins: [...jssPreset().plugins] });

interface RTLProps {
  children: React.ReactNode;
}

export function RTL(props: RTLProps): JSX.Element {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    primaryColor: Palette["primary"];
    newcolor: Palette["primary"];
    themeLight: Palette["primary"];
    themeLightText: Palette["primary"];
    statusGreen: Palette["primary"];
    statusRed: Palette["primary"];
    redValidtion: Palette["primary"];
    greenValidtion: Palette["primary"];
    grayP: Palette["primary"];
    textGray: Palette["primary"];
    backTabs: Palette["primary"];
    card: Palette["primary"];
    progressChart: Palette["primary"];
    darkBlue: Palette["primary"];
  }
  interface PaletteOptions {
    primaryColor: PaletteOptions["primary"];
    newcolor: PaletteOptions["primary"];
    themeLight: PaletteOptions["primary"];
    themeLightText: PaletteOptions["primary"];
    statusGreen: PaletteOptions["primary"];
    statusRed: PaletteOptions["primary"];
    redValidtion: PaletteOptions["primary"];
    greenValidtion: PaletteOptions["primary"];
    grayP: PaletteOptions["primary"];
    textGray: PaletteOptions["primary"];
    backTabs: PaletteOptions["primary"];
    card: PaletteOptions["primary"];
    progressChart: PaletteOptions["primary"];
    darkBlue: PaletteOptions["primary"];
  }
}

export const lightTheme = createTheme(
  {
    direction: "ltr",
    typography: {
      fontFamily: "sans-serif",
    },
    components: {
      MuiOutlinedInput: {
        // If you're using the TextField with variant="outlined"
        styleOverrides: {
          root: {
            paddingRight: "0px",
          },
        },
      },
    },
    palette: {
      mode: "light",
      background: {
        default: "#FAF9F8",
        paper: "#FFFFFF",
      },
      primary: {
        main: "#4156A6",
        dark: "#0627A7",
      },
      primaryColor: {
        main: "#4156A6",
        dark: "#0627A7",
        light: "#eceef6",
      },

      secondary: {
        main: "#ffffff",
        light: "#FFFFFF",
        dark: "#FAF9F8",
      },
      newcolor: {
        main: "#323130",
      },
      redValidtion: {
        main: "#C4314B",
      },
      greenValidtion: {
        main: "#5EBA7D",
      },
      themeLight: {
        main: "#A0AAD2",
      },
      themeLightText: {
        main: "#C7C7C7",
      },
      statusGreen: {
        main: "#00AC46",
      },
      statusRed: {
        main: "#DC0000",
      },
      grayP: {
        main: "#E1DFDD",
        dark: "#F3F2F1",
        light: "#FFFFFF",
        contrastText: "rgb(242,242,242)",
      },
      textGray: {
        main: "#323130",
      },
      backTabs: {
        main: "#fAf9f8",
      },
      card: {
        main: "#242424",
        light: "#A19F9D",
        dark: "#605E5C",
        contrastText: "rgb(229,229,229)",
      },
      progressChart: {
        main: "#f3f3f3",
        dark: "#F3F2F1",
        light: "#FFFFFF",
        contrastText: "rgb(242,242,242)",
      },
      darkBlue: {
        main: "hsl(212, 24%, 26%)",
        light: "#e2e4f1",
      },
    },
  },
  faIR
);

export const darkTheme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#282625",
          "&:before": {
            // To remove the underline effect on focus
            borderBottomColor: "#e0e0e0",
          },
          "& .MuiInputBase-input": {
            backgroundColor: "#282625",
          },
        },
      },
    },
    MuiOutlinedInput: {
      // If you're using the TextField with variant="outlined"
      styleOverrides: {
        root: {
          paddingRight: "0px",

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.1)", // Custom hover color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.1)", // Custom focus color
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    background: {
      paper: "#272523",
      default: "#1C1B19",
    },
    primary: {
      main: "#7693ff",
      dark: "#58bae5",
    },
    primaryColor: {
      main: "#4156A6",
      dark: "#0627A7",
      light: "#eceef633",
      // default: "#000000", //black
    },
    secondary: {
      main: "#1C1B19",
      light: "#32302E",
      dark: "#282625",
    },
    newcolor: {
      main: "#C7C7C7",
    },
    redValidtion: {
      main: "#C4314B",
    },
    greenValidtion: {
      main: "#5EBA7D",
    },
    themeLight: {
      main: "#A0AAD2",
    },
    themeLightText: {
      main: "#C7C7C7",
    },
    statusGreen: {
      main: "#00AC46",
    },
    statusRed: {
      main: "#DC0000",
    },
    grayP: {
      main: "#373737",
      dark: "#2f2f2f",
      light: "#5c5c5c",
      contrastText: "#A19F9D",
    },
    textGray: {
      main: "#bcc7d0",
    },
    backTabs: {
      main: "#32302E",
    },
    card: {
      main: "#FFFFFF",
      light: "#A19F9D",
      dark: "#A19F9D",
      contrastText: "#373736",
    },
    progressChart: {
      main: "#777",
      dark: "#F3F2F1",
      light: "#FFFFFF",
      contrastText: "rgb(242,242,242)",
    },
    darkBlue: {
      main: "hsl(212deg 58.65% 61.92%)",
      light: "rgb(178 180 193)",
    },
  },
});
