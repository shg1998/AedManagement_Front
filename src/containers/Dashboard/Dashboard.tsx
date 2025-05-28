import React from "react";
import {Grid, Paper, Typography} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import BasicCard2 from "../../components/Card/BasicCard2";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import CancelIcon from '@mui/icons-material/Cancel';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import SignalCellularConnectedNoInternet1BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet1Bar';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CardTopActions from "../../components/CardTopActions/CardTopActions";
import {DEFAULT_NON_CONFORMITY_INFORMATION} from "../NonConformity/constants";
import BasicCard from "../../components/Card/BasicCard";
import ProvinceMapMarkers from "../../components/map/ProvinceMapMarkers";

const Dashboard = () => {
    const {themeMode} = useThemeContext();

    return (
        <Paper className={`main-container-${themeMode}`}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Total Aeds" headerIcon={<MonitorHeartIcon/>} variant={"normal"}>
                        120
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Total SelfTests" headerIcon={<SignalWifiStatusbar4BarIcon/>}
                                variant={"normal"}>15</BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Passed SelfTests" headerIcon={<DoneOutlineIcon/>} variant={"success"}>
                        10
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Failed SelfTests" headerIcon={<CancelIcon/>} variant={"error"}>2</BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Disconnected Aeds"
                                headerIcon={<SignalCellularConnectedNoInternet1BarIcon/>}
                                variant={"warning"}>1</BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="No-Wifi Aeds"
                                headerIcon={<SignalWifiStatusbarConnectedNoInternet4Icon/>}
                                variant={"warning"}>1</BasicCard2>
                </Grid>
            </Grid>
            <br/>
            <BasicCard header="Distribution of AEDs in each province">
                <ProvinceMapMarkers locations={[{
                    lat: 35.5606,
                    lon: 51.4464,
                    label: 'SerialNumber : 404054',
                    status: 'success'
                },
                    {
                        lat: 35.6717,
                        lon: 51.4464,
                        label: 'SerialNumber : 05405',
                        status: 'error'
                    },
                    {
                        lat: 35.7441,
                        lon: 51.4464,
                        label: 'SerialNumber : 457857',
                        status: 'warning'
                    },
                    {
                        lat: 35.3247,
                        lon: 50.8936,
                        label: 'SerialNumber : 457857',
                        status: 'success'
                    },
                    {
                        lat: 35.4361,
                        lon: 50.8980,
                        label: 'SerialNumber : 05634'
                    }]}/>
            </BasicCard>
            <br/>
        </Paper>
    );
};

export default Dashboard;
