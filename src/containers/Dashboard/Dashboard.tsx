import React, {useState, useMemo} from "react";
import {Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Box} from "@mui/material";
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

const allLocations: Location[] = [
    {id: '8da83440-f53d-f011-9cba-708bcd8218e1', lat: 35.5606, lon: 51.4464, label: 'SerialNumber : 404054', status: 'success'},
    {id: '977e0963-f53d-f011-9cba-708bcd8218e1', lat: 35.6717, lon: 51.4464, label: 'SerialNumber : 05405', status: 'error'},
    {id: 'c8310683-f53d-f011-9cba-708bcd8218e1', lat: 35.7441, lon: 51.4464, label: 'SerialNumber : 457857', status: 'warning'},
    {id: '6bb036a0-f53d-f011-9cba-708bcd8218e1', lat: 35.3247, lon: 50.8936, label: 'SerialNumber : 457857', status: 'success'},
    {id: '0f96f139-c53b-f011-9cba-708bcd8218e1', lat: 35.4361, lon: 50.8980, label: 'SerialNumber : 05634'},
];

const Dashboard = () => {
    const {themeMode} = useThemeContext();
    const [selectedProvinceId, setSelectedProvinceId] = useState<string>("tehran");
    const [openDetailsAedModal, setOpenDetailsAedModal] =
        useState<boolean>(false);
    const [selectedAed, setSelectedAed] = useState<string>('');

    const handleCloseDetailsModal = () => {
        setOpenDetailsAedModal(false);
    }

    const handleMarkerClicked = (location: Location) => {
        setSelectedAed(location.id!);
        setOpenDetailsAedModal(true);
    }
    return (
        <Paper className={`main-container-${themeMode}`} sx={{p: 2}}>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Total Aeds" headerIcon={<MonitorHeartIcon/>} variant={"normal"}>
                        120
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Total SelfTests" headerIcon={<SignalWifiStatusbar4BarIcon/>} variant={"normal"}>
                        15
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Passed SelfTests" headerIcon={<DoneOutlineIcon/>} variant={"success"}>
                        10
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Failed SelfTests" headerIcon={<CancelIcon/>} variant={"error"}>
                        2
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="Disconnected Aeds" headerIcon={<SignalCellularConnectedNoInternet1BarIcon/>}
                                variant={"warning"}>
                        1
                    </BasicCard2>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <BasicCard2 header="No-Wifi Aeds" headerIcon={<SignalWifiStatusbarConnectedNoInternet4Icon/>}
                                variant={"normal"}>
                        1
                    </BasicCard2>
                </Grid>
            </Grid>

            <BasicCard
                header="Distribution of AEDs in each province"
                headerChildren={
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
                }
            >
                <ProvinceMapMarkers
                    provinceId={selectedProvinceId}
                    locations={allLocations}
                    zoom={10}
                    onMarkerClick={handleMarkerClicked}
                />
            </BasicCard>

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
