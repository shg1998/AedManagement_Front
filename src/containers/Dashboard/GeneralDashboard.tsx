import React, {useState} from 'react';
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import {dashboardOptions} from "./constants";
import SelfTestDashboard from "./SelfTestDashboard";
import ServiceDashboard from "./ServiceDashboard";

const GeneralDashboard = () => {
    const [value, setValue] = useState(dashboardOptions[0].value);
    const {themeMode} = useThemeContext();

    const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
        setValue(newValue);
    };

    const getTabContent = (selectedValue: string) => {
        switch (selectedValue) {
            case 'SelfTests':
                return <SelfTestDashboard/>;
            case 'Services':
                return <ServiceDashboard/>;
        }
    };

    return (
        <Paper className={`main-container-${themeMode}`}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
                {
                    dashboardOptions.map((option) => (
                        <Tab key={option.label} label={option.label} value={option.value}/>
                    ))
                }
            </Tabs>
            <Box sx={{marginTop: 3}}>
                {getTabContent(value)}
            </Box>
        </Paper>
    );
};

export default GeneralDashboard;