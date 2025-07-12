import React from 'react';
import {Paper} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import SelfTestDashboard from "./SelfTestDashboard";

const GeneralDashboard = () => {
    const {themeMode} = useThemeContext();

    return (
        <Paper className={`main-container-${themeMode}`}>
            <SelfTestDashboard/>
        </Paper>
    );
};

export default GeneralDashboard;