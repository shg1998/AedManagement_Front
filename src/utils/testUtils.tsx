import { QueryClient, QueryClientProvider } from "react-query";
import { lightTheme as theme, RTL } from "../theme";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface AllTheProvidersPropTypes {
  children?: any;
}

export const AllTheProviders: React.FC<AllTheProvidersPropTypes> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RTL>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </RTL>
    </QueryClientProvider>
  );
};