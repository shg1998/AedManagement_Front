import React, {useState} from "react";
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import {correctiveActionOptions} from "./constants";
import AllRepairs from "./SpecificAedServices/AllRepairs";
import AllPms from "./SpecificAedServices/AllPms";
import AllRecalls from "./SpecificAedServices/AllRecalls";
import AllTrainings from "./SpecificAedServices/AllTrainings";

const AllAedServices = () => {
    const [value, setValue] = useState(correctiveActionOptions[0].value);
    const {themeMode} = useThemeContext();

    const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
        setValue(newValue);
    };

    const getTabContent = (selectedValue: string) => {
        switch (selectedValue) {
            case 'Repair':
                return <AllRepairs/>;
            case 'Pm':
                return <AllPms/>;
            case 'Recall':
                return <AllRecalls/>;
            case 'Training':
                return <AllTrainings/>;
        }
    };

    return (
        <Paper className={`main-container-${themeMode}`}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
                {
                    correctiveActionOptions.map((option) => (
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

export default AllAedServices;
