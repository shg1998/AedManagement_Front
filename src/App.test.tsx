import React from "react";
import { render, screen } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { RTL, lightTheme } from "./theme";

import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/styles";

jest.unmock("./context/CurrentUserContext.tsx");

const queryClient = new QueryClient();
test("renders without crashing", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <RTL>
        <ThemeProvider theme={lightTheme}>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </RTL>
    </QueryClientProvider>
  );
});

// test('redirects to dashboard when authenticated', async () => {
//   jest.mock('./context/AuthContext', () => ({
//     useAuthState: () => ({ isAuthenticated: true }),
//   }));

//   render(
//     <AllTheProviders >
//         <App />
//     </AllTheProviders>
//   );
//   const dashboardContent = screen.getByTestId('dashboard-page');
//   expect(dashboardContent).toBeInTheDocument();
// });

test("redirects to login when not authenticated", async () => {
  jest.mock("./context/AuthContext", () => ({
    useAuthState: () => ({ isAuthenticated: false }),
  }));

  render(
    <QueryClientProvider client={queryClient}>
      <RTL>
        <ThemeProvider theme={lightTheme}>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </RTL>
    </QueryClientProvider>
  );
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();
});
