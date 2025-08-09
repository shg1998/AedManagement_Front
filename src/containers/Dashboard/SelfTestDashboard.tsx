import React, {useState} from "react";
import {Grid, Paper, Select, MenuItem, FormControl, InputLabel, Typography, Box} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import BasicCard2 from "../../components/Card/BasicCard2";
import ProvinceMapMarkers, {Location} from "../../components/map/ProvinceMapMarkers";
import {iranProvinces} from "../../utils/ProvinceUtils/ProvinceUtils";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CancelIcon from '@mui/icons-material/Cancel';
import SignalCellularConnectedNoInternet1BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet1Bar';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import BasicCard from "../../components/Card/BasicCard";
import LeftModal from "../../components/Modal/LeftModal";
import AedDetails from "../Aeds/AedDetails";
import {useAuthState} from "../../context/AuthContext";
import DashboardService from "../../services/DashboardService";
import {useQuery} from "react-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {getItemSecure} from "../../utils/AESCrypto/AESCrypto";
import {getStatus} from "../../utils/General/generalUtils";
import CustomBarChart from "../../components/BarChart/CustomBarChart";
import BiotechIcon from "@mui/icons-material/Biotech";
import {useNavigate} from "react-router-dom";
import routes from "../../routes/routes";

const SelfTestDashboard = () => {
    const {themeMode} = useThemeContext();
    const {isAdmin, isSuperAdmin} = useAuthState();
    const {getAedStatus, getAedSelfTestLocation, getAedTestTrend} = new DashboardService();
    const navigate = useNavigate();
    const [selectedProvinceId, setSelectedProvinceId] = useState<string>(
        isAdmin || isSuperAdmin ? "all" : getItemSecure('province')!
    );

    const [openDetailsAedModal, setOpenDetailsAedModal] = useState<boolean>(false);
    const [selectedAed, setSelectedAed] = useState<string>('');

    const {data: aedStatus, isLoading: isAedStatusLoading} = useQuery(
        ['aedStatus', selectedProvinceId],
        () => getAedStatus(selectedProvinceId),
        {
            enabled: !!selectedProvinceId,
            staleTime: 10 * 1000,
        }
    );

    const {data: aedsLocations = [], isLoading: isAedsLocationLoading} = useQuery(
        ['aedsLocation', selectedProvinceId],
        () => getAedSelfTestLocation(selectedProvinceId),
        {
            enabled: !!selectedProvinceId,
            staleTime: 10 * 1000,
        }
    );

    const {data: aedTestTrend = [], isLoading: isTestTrendLoading} = useQuery(
        ['aedTestTrend', selectedProvinceId],
        () => getAedTestTrend(selectedProvinceId),
        {
            enabled: !!selectedProvinceId,
            staleTime: 10 * 1000,
        }
    );

    const handleCloseDetailsModal = () => {
        setOpenDetailsAedModal(false);
    }

    const handleMarkerClicked = (location: Location) => {
        setSelectedAed(location.id!);
        setOpenDetailsAedModal(true);
    }

    const handleTotalRegisteredAedsClicked = () => {
        navigate(routes.aeds);
    }

    const handleTotalSelfTestAedsClicked = () => {
        navigate(routes.aeds + "?type=connected");
    }

    const handlePassedSelfTestsClicked = () => {
        navigate(routes.aeds + "?type=passed");
    }

    const handleFailedSelfTestsClicked = () => {
        navigate(routes.aeds + "?type=failed");
    }

    const handleTotalDisconnectedAedsClicked = () => {
        navigate(routes.aeds + "?type=disconnected");
    }

    return (
        <Paper className={`main-container-${themeMode}`} sx={{p: 2}}>
            {isAedStatusLoading ? <LoadingComponent/> : (
                <>
                    <Grid container spacing={2} alignItems="center" mb={3}>
                        <Grid item xs={12} sm={isAdmin || isSuperAdmin ? 6 : 12} md={isAdmin || isSuperAdmin ? 8 : 12}>
                            <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                <BiotechIcon sx={{fontSize: '2.5rem', mr: 1, color: 'primary.main'}}/>
                                <Typography variant="h5" component="h1" sx={{fontWeight: 'bold'}}>
                                    {"AED Monitoring Self Tests Dashboard"}
                                </Typography>
                            </Box>
                        </Grid>
                        {(isAdmin || isSuperAdmin) && (
                            <Grid item xs={12} sm={6} md={4}
                                  sx={{display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}}}>
                                <FormControl size="small" sx={{minWidth: 250, width: '100%', maxWidth: 300}}>
                                    <InputLabel id="province-select-label">Select Province</InputLabel>
                                    <Select
                                        labelId="province-select-label"
                                        value={selectedProvinceId}
                                        label="Select Province"
                                        onChange={(e) => setSelectedProvinceId(e.target.value)}
                                    >
                                        {[{value: 'all', title: 'همه استان ها'}, ...iranProvinces].map((province) => (
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
                        <Grid item xs={12} sm={6} md={3} lg={2.4} onClick={handleTotalRegisteredAedsClicked}
                              sx={{cursor: 'pointer'}}>
                            <BasicCard2 header="Registered AEDs" headerIcon={<MonitorHeartIcon/>} variant={"normal"}>
                                {aedStatus?.totalRegisteredAeds}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2.4} onClick={handleTotalSelfTestAedsClicked}
                              sx={{cursor: 'pointer'}}>
                            <BasicCard2 header="Self-Test AEDs" headerIcon={<MonitorHeartIcon/>} variant={"normal"}>
                                {aedStatus?.totalAedCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2.4} onClick={handlePassedSelfTestsClicked}
                              sx={{cursor: 'pointer'}}>
                            <BasicCard2 header="Passed SelfTests" headerIcon={<DoneOutlineIcon/>}
                                        variant={"success"}>
                                {aedStatus?.passedSelfTestCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2.4} onClick={handleFailedSelfTestsClicked}
                              sx={{cursor: 'pointer'}}>
                            <BasicCard2 header="Failed SelfTests" headerIcon={<CancelIcon/>} variant={"error"}>
                                {aedStatus?.failedSelfTestCount}
                            </BasicCard2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2.4} onClick={handleTotalDisconnectedAedsClicked}
                              sx={{cursor: 'pointer'}}>
                            <BasicCard2 header="Disconnected AEDs"
                                        headerIcon={<SignalCellularConnectedNoInternet1BarIcon/>}
                                        variant={"warning"}>
                                {aedStatus?.disconnectedAedCount}
                            </BasicCard2>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item sm={12} xl={7.2}>
                            <BasicCard
                                header={"Distribution of AEDs"}
                            >
                                {
                                    isAedsLocationLoading ? <LoadingComponent/> : (
                                        <ProvinceMapMarkers
                                            provinceId={selectedProvinceId}
                                            locations={aedsLocations?.data === undefined ? aedsLocations?.filter((w: any) => w.internalTestResult !== 'NoWifi').map((loc: any) => {
                                                return {
                                                    id: loc.aedId,
                                                    lat: loc.lat,
                                                    lon: loc.long,
                                                    label: '',
                                                    status: getStatus(loc.internalTestResult)!
                                                }
                                            }) : aedsLocations?.data?.filter((w: any) => w.internalTestResult !== 'NoWifi').map((loc: any) => {
                                                return {
                                                    id: loc.aedId,
                                                    lat: loc.lat,
                                                    lon: loc.long,
                                                    label: '',
                                                    status: getStatus(loc.internalTestResult)!
                                                }
                                            })}
                                            zoom={10}
                                            onMarkerClick={handleMarkerClicked}
                                        />
                                    )
                                }
                            </BasicCard>
                        </Grid>
                        <Grid item sm={12} xl={4.8}>
                            <BasicCard
                                header={'Monthly SelfTest Results: Pass vs Fail'}>
                                {
                                    isTestTrendLoading ? <LoadingComponent/> : (
                                        <CustomBarChart data={aedTestTrend}/>
                                    )
                                }
                            </BasicCard>
                        </Grid>
                    </Grid>
                </>
            )}

            <LeftModal
                title={"👀 Aed Details"}
                open={openDetailsAedModal}
                maxWidth={"xl"}
                handleClose={handleCloseDetailsModal}
            >
                <AedDetails aedId={selectedAed}/>
            </LeftModal>
        </Paper>
    );
};

export default SelfTestDashboard;
