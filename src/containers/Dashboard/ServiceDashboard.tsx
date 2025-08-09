import React, { useState } from "react";
import { Grid, Paper, Select, MenuItem, FormControl, InputLabel, Typography, Box } from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import BasicCard2 from "../../components/Card/BasicCard2";
import { iranProvinces } from "../../utils/ProvinceUtils/ProvinceUtils";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CancelIcon from '@mui/icons-material/Cancel';
import SignalCellularConnectedNoInternet1BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet1Bar';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useAuthState } from "../../context/AuthContext";
import DashboardService from "../../services/DashboardService";
import { useQuery } from "react-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getItemSecure } from "../../utils/AESCrypto/AESCrypto";
import {
    Analytics, AssignmentReturn,
    BuildCircleOutlined,
    BuildCircleRounded,
    BuildOutlined, CalendarMonth,
    Handyman, NotificationsActive, School,
    SettingsSuggestOutlined
} from "@mui/icons-material";

const ServiceDashboard = () => {
    const { themeMode } = useThemeContext();
    const { isAdmin, isSuperAdmin } = useAuthState();
    const { getAedServicesStatisticalReport } = new DashboardService();

    const [selectedProvinceId, setSelectedProvinceId] = useState<string>(
        isAdmin || isSuperAdmin ? "tehran" : getItemSecure('province')!
    );

    const { data: aedStatus, isLoading: isAedStatusLoading } = useQuery(
        ['aedServicesStatReport', selectedProvinceId],
        () => getAedServicesStatisticalReport(selectedProvinceId),
        {
            enabled: !!selectedProvinceId,
        }
    );


    return (
        <Paper className={`main-container-${themeMode}`} sx={{ p: 2 }}>
            {isAedStatusLoading ? <LoadingComponent /> : (
                <>
                    <Grid container spacing={2} alignItems="center" mb={3}>
                        <Grid item xs={12} sm={isAdmin || isSuperAdmin ? 6 : 12} md={isAdmin || isSuperAdmin ? 8 : 12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <SettingsSuggestOutlined sx={{ fontSize: '2.5rem', mr: 1, color: 'primary.main' }} />
                                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                                    {"AED Monitoring Services Dashboard"}
                                </Typography>
                            </Box>
                        </Grid>
                        {(isAdmin || isSuperAdmin) && (
                            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                <FormControl size="small" sx={{ minWidth: 250, width: '100%', maxWidth: 300 }}>
                                    <InputLabel id="province-select-label">Select Province</InputLabel>
                                    <Select
                                        labelId="province-select-label"
                                        value={selectedProvinceId}
                                        label="Select Province"
                                        onChange={(e) => setSelectedProvinceId(e.target.value)}
                                    >
                                        {iranProvinces.map((province) => (
                                            <MenuItem key={province.value} value={province.value}>
                                                {province.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Total AEDs" headerIcon={<MonitorHeartIcon />} variant={"normal"}>
                                {aedStatus?.totalAedCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="AED Services" headerIcon={<BuildOutlined />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedServicesCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Repairs" headerIcon={<Handyman />} variant={"normal"}>
                                {aedStatus?.totalAedRepairsCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="PMs"
                                        headerIcon={<CalendarMonth />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedPmsCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Recalls"
                                        headerIcon={<NotificationsActive />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedRecallsCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Trainings"
                                        headerIcon={<School />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedTrainingsCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Data Collection"
                                        headerIcon={<Analytics />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedDataCollectionsCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <BasicCard2 header="Returns"
                                        headerIcon={<AssignmentReturn />}
                                        variant={"normal"}>
                                {aedStatus?.totalAedReturnsCount}
                            </BasicCard2>
                        </Grid>
                    </Grid>
                </>
            )}
            <br/>
        </Paper>
    );
};

export default ServiceDashboard;
