import React, { createContext, useState, useEffect, ReactNode } from "react";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import {
  StylesProvider,
  ThemeProvider as StylesThemeProvider,
  jssPreset,
} from "@mui/styles";
import { create } from "jss";
import rtl from "jss-rtl";

interface IThemeContext {
  theme: any;
  toggleTheme: () => void;
  themeMode: string;
}

const defaultState: IThemeContext = {
  theme: darkTheme,
  toggleTheme: () => {},
  themeMode: "dark",
};

const ThemeContext = createContext<IThemeContext>(defaultState);

interface ThemeProviderProps {
  children: ReactNode;
}

export const MyThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const rootElement = document.getElementById("root");
    // Ensure that the rootElement is not null
    if (rootElement) {
      rootElement.style.backgroundColor =
        themeMode === "light"
          ? lightTheme.palette.background.paper
          : darkTheme.palette.background.paper;
    }
  }, [themeMode]);
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setThemeMode(
      localTheme === "light" || localTheme === "dark" ? localTheme : "light"
    );
  }, []);

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newThemeMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newThemeMode);
      return newThemeMode;
    });
  };

  const theme = themeMode === "light" ? lightTheme : darkTheme;
  /* <ThemeProvider theme={theme}>{children}</ThemeProvider> */
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeMode }}>
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <StylesThemeProvider theme={theme}>
            {/* <RTL> */}
            {children}
            {/* </RTL> */}
          </StylesThemeProvider>
        </StylesProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook for components to get the theme toggle function and current theme
export const useThemeContext = () => React.useContext(ThemeContext);
