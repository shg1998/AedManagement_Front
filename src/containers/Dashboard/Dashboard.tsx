import React, {useState} from "react";
import {Grid, Paper, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import BasicCard2 from "../../components/Card/BasicCard2";
import ProvinceMapMarkers, {Location} from "../../components/map/ProvinceMapMarkers";
import {iranProvinces} from "../../utils/ProvinceUtils";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import CancelIcon from '@mui/icons-material/Cancel';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import SignalCellularConnectedNoInternet1BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet1Bar';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import BasicCard from "../../components/Card/BasicCard";
import LeftModal from "../../components/Modal/LeftModal";
import AedDetails from "../Aeds/AedDetails";
import {useAuthState} from "../../context/AuthContext";
import DashboardService from "../../services/DashboardService";
import {useQuery} from "react-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {getItemSecure} from "../../utils/AESCrypto";
import { getStatus } from "../../utils/generalUtils";

const Dashboard = () => {
    const {themeMode} = useThemeContext();
    const {isAdmin, isSuperAdmin} = useAuthState();
    const {getAedStatus, getAedSelfTestLocation} = new DashboardService();

    const [selectedProvinceId, setSelectedProvinceId] = useState<string>(isAdmin || isSuperAdmin ? "tehran" : getItemSecure('province')!);

    const [openDetailsAedModal, setOpenDetailsAedModal] =
        useState<boolean>(false);
    const [selectedAed, setSelectedAed] = useState<string>('');

    const {data: aedStatus, isLoading: isAedStatusLoading} = useQuery(
        ['aedStatus'],
        () => getAedStatus(),
        {
            staleTime: 60 * 1000,
        }
    );

    const {data: aedsLocation, isLoading: isAedsLocationLoading} = useQuery(
        ['aedsLocation', selectedProvinceId],
        () => getAedSelfTestLocation(selectedProvinceId),
        {
            enabled: !!selectedProvinceId,
            staleTime: 60 * 1000,
        }
    );


    const handleCloseDetailsModal = () => {
        setOpenDetailsAedModal(false);
    }

    const handleMarkerClicked = (location: Location) => {
        setSelectedAed(location.id!);
        setOpenDetailsAedModal(true);
    }

    return (
        <Paper className={`main-container-${themeMode}`} sx={{p: 2}}>
            {
                isAedStatusLoading ? <LoadingComponent/> : (
                    <>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="Total Aeds" headerIcon={<MonitorHeartIcon/>} variant={"normal"}>
                                    {aedStatus?.totalAedCount}
                                </BasicCard2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="Total SelfTests" headerIcon={<SignalWifiStatusbar4BarIcon/>}
                                            variant={"normal"}>
                                    {aedStatus?.totalSelfTestCount}
                                </BasicCard2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="Passed SelfTests" headerIcon={<DoneOutlineIcon/>}
                                            variant={"success"}>
                                    {aedStatus?.passedSelfTestCount}
                                </BasicCard2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="Failed SelfTests" headerIcon={<CancelIcon/>} variant={"error"}>
                                    {aedStatus?.failedSelfTestCount}
                                </BasicCard2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="Disconnected Aeds"
                                            headerIcon={<SignalCellularConnectedNoInternet1BarIcon/>}
                                            variant={"warning"}>
                                    {aedStatus?.disconnectedAedCount}
                                </BasicCard2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <BasicCard2 header="No-Wifi Aeds"
                                            headerIcon={<SignalWifiStatusbarConnectedNoInternet4Icon/>}
                                            variant={"noWifi"}>
                                    {aedStatus?.noWifiAedCount}
                                </BasicCard2>
                            </Grid>
                        </Grid>

                        <BasicCard
                            header="Distribution of AEDs in each province"
                            headerChildren={
                                isAdmin || isSuperAdmin ? (
                                    <FormControl size="small" sx={{minWidth: 250, ml: 2}}>
                                        <InputLabel id="province-select-label">Select Province</InputLabel>
                                        <Select
                                            labelId="province-select-label"
                                            value={selectedProvinceId}
                                            label="Select Province"
                                            onChange={(e) => setSelectedProvinceId(e.target.value)}
                                        >
                                            {iranProvinces.map((province) => (
                                                <MenuItem key={province.id} value={province.id}>
                                                    {province.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : <></>
                            }
                        >
                            <ProvinceMapMarkers
                                provinceId={selectedProvinceId}
                                locations={aedsLocation?.map((loc: any) => {
                                    return {
                                        id: loc.aedId,
                                        lat: loc.lat,
                                        lon: loc.long,
                                        label: 'Serial Number: ' + loc.serialNumber,
                                        status: getStatus(loc.internalTestResult)!
                                    }
                                })}
                                zoom={10}
                                onMarkerClick={handleMarkerClicked}
                            />
                        </BasicCard>
                    </>
                )
            }

            <LeftModal
                title={
                    "👀 Aed Details"
                }
                open={openDetailsAedModal}
                maxWidth={"xl"}
                handleClose={handleCloseDetailsModal}
            >
                <AedDetails aedId={selectedAed}/>
            </LeftModal>
        </Paper>
    );
};

export default Dashboard;
