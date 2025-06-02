import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {RTL} from "./theme";
import "./i18n";
import "./assets/scss/main.scss";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./context/AuthContext";
import "./highcharts.config";
import "./assets/scss/style.scss";
import "./scrollbar.css";
import "react-contexify/ReactContexify.css";
import {MyThemeProvider} from "./ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        {/*<RTL>*/}
            <CssBaseline/>
            <MyThemeProvider>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </MyThemeProvider>
        {/*</RTL>*/}
    </QueryClientProvider>
);

reportWebVitals();
