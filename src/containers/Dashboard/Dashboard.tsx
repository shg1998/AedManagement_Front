import React, {useEffect, useMemo, useRef, useState} from "react";
import {Paper} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import MapComponent from "../../components/map/MapComponent";


const Dashboard = () => {
    // const [pinedLocation, setPinedLocation] = useState<LocationType | null>(null);
    const {themeMode} = useThemeContext();

    return (
        <Paper className={`main-container-${themeMode}`}>
            {/*<MapComponent*/}
            {/*    // setPinedLocation={(location) => {*/}
            {/*    //     setPinedLocation(location);*/}
            {/*    //     console.log(location)*/}
            {/*    // }}*/}
            {/*/>*/}
        </Paper>
    );
};

export default Dashboard;
