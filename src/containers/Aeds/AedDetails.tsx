import React from 'react';
import {useQuery} from "react-query";
import Aed from "../../services/Aed";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import {Box, Divider, Grid, Paper, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MemoryIcon from "@mui/icons-material/Memory";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {internalTestConverter} from "../../utils/SelfTestUtils";
import MapIcon from "@mui/icons-material/Map";
import ProvinceMapMarkers from "../../components/map/ProvinceMapMarkers";
import {StatusCard} from '../SelfTests/SelfTestDetails';
import {getJalaliDateTime} from "../../utils/time";

type AedDetailsProps = {
    aedId?: string;
}

const AedDetails: React.FC<AedDetailsProps> = ({aedId}) => {

    const {themeMode} = useThemeContext();

    const textColor = themeMode === 'dark' ? "#ddd" : "#444";
    const bgColor = themeMode === 'dark' ? "#121212" : "#f0f4f8";
    const cardBg = themeMode === 'dark' ? "#1e1e1e" : "white";

    const {fetchDetails} = new Aed();

    const {data, isLoading} = useQuery(
        ['aedDetails', aedId],
        () => fetchDetails(aedId!),
        {
            enabled: !!aedId,
            staleTime: 60 * 1000, // 1 minute cache
        }
    );

    return (
        <div>
            {
                isLoading ? <LoadingComponent/> : (
                    <>
                        <Box sx={{
                            p: 5,
                            bgcolor: bgColor,
                            minHeight: "100vh",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                    gap: 1.5,
                                    p: 1,
                                    bgcolor: themeMode === 'dark' ? "#0d47a1" : "#e3f2fd",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    maxWidth: 320,
                                    userSelect: "none"
                                }}
                            >
                                <InfoIcon sx={{color: themeMode === 'dark' ? "#bbdefb" : "#1976d2", fontSize: 30}}/>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: themeMode === 'dark' ? "#bbdefb" : "#1976d2",
                                        letterSpacing: 1,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Device Information
                                </Typography>
                            </Box>

                            <Grid container spacing={4} mb={5}>
                                <StatusCard
                                    title="Device Info"
                                    color="#fbc02d"
                                    Icon={DeviceHubIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={cardBg}
                                    textColor={textColor}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Serial Number: <strong>{data?.serialNumber}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Place: <strong>{data?.location?.place}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Self Test
                                        Status: <strong>{data?.lastSelfTest !== null ? (data?.lastSelfTest?.internalTestResult === '255' ? "Passed ✅" : "Failed ⛔") : '-'}</strong>
                                    </Typography>

                                </StatusCard>

                                <StatusCard
                                    title="Battery & Shock Status"
                                    color="#42a5f5"
                                    Icon={BatteryChargingFullIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={cardBg}
                                    textColor={textColor}
                                    themeMode={themeMode ?? 'light'}
                                >
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Battery Type: <strong>{data?.aedBatteryType}</strong>
                                    </Typography>
                                    {
                                        data?.lastSelfTest !== null && (
                                            <>
                                                <Typography variant="body1" sx={{color: textColor}}>
                                                    Remaining
                                                    capacity: <strong>{data?.lastSelfTest?.batteryRemain}</strong>
                                                </Typography>
                                                <Typography variant="body1" sx={{color: textColor}}>
                                                    Shock Count: <strong>{data?.lastSelfTest?.shockCount}</strong>
                                                </Typography>
                                            </>
                                        )
                                    }
                                </StatusCard>

                                <StatusCard
                                    title="Date & Time"
                                    color="#ffb300"
                                    Icon={AccessTimeIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={cardBg}
                                    textColor={textColor}
                                    themeMode={themeMode ?? 'light'}
                                >
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Register Date&Time: <strong>{getJalaliDateTime(data?.registerDateTime)}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: textColor}}>
                                        Last Pm
                                        Date&Time: <strong>{data?.lastPmDateTime === '0001-01-01T00:00:00' ? '-' : data?.lastPmDateTime}</strong>
                                    </Typography>
                                    {
                                        data?.lastSelfTest !== null && (
                                            <Typography variant="body1" sx={{color: textColor}}>
                                                Last Self Test
                                                Time: <strong>{getJalaliDateTime(data?.lastSelfTest?.sentTime)}</strong>
                                            </Typography>
                                        )
                                    }
                                </StatusCard>

                                {
                                    data?.lastSelfTest !== null && (
                                        <StatusCard
                                            title="Device Versions"
                                            color="#66bb6a"
                                            Icon={MemoryIcon}
                                            gridProps={{xs: 12, sm: 12, md: 5}}
                                            cardBg={cardBg}
                                            textColor={textColor}
                                            themeMode={themeMode ?? 'light'}
                                        >
                                            <Typography variant="body1" sx={{color: textColor}}>
                                                Software Version: <strong>{data?.lastSelfTest?.algorithmVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: textColor}}>
                                                SAE Board Version: <strong>{data?.lastSelfTest?.saeBoardVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: textColor}}>
                                                Mother Board
                                                Version: <strong>{data?.lastSelfTest?.motherBoardVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: textColor}}>
                                                High Voltage Board
                                                Version: <strong>{data?.lastSelfTest?.highVoltageBoardVersion}</strong>
                                            </Typography>
                                        </StatusCard>
                                    )
                                }

                                {(data?.lastSelfTest !== null && data?.lastSelfTest?.internalTestResult !== '255') && (
                                    <StatusCard
                                        title="Internal Self Test Result"
                                        color="#e53935"
                                        Icon={ErrorOutlineIcon}
                                        gridProps={{xs: 12, sm: 12, md: 7}}
                                        cardBg={cardBg}
                                        textColor={textColor}
                                        themeMode={themeMode ?? 'light'}
                                    >
                                        <Typography variant="body1" sx={{color: textColor}}>
                                            {internalTestConverter(parseInt(data?.internalTestResult!))}
                                        </Typography>
                                    </StatusCard>
                                )}
                            </Grid>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    gap: 1.5,
                                    p: 1,
                                    bgcolor: themeMode === 'dark' ? "#1b5e20" : "#e8f5e9", // سبز روشن ملایم با توجه به تم
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    maxWidth: 240,
                                    userSelect: "none"
                                }}
                            >
                                <MapIcon sx={{color: themeMode === 'dark' ? "#a5d6a7" : "#388e3c", fontSize: 30}}/>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: themeMode === 'dark' ? "#a5d6a7" : "#388e3c",
                                        letterSpacing: 1,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Location Map
                                </Typography>
                            </Box>

                            <br/>
                            <br/>
                            <br/>
                            <Paper
                                elevation={6}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: cardBg,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: themeMode === 'dark' ? "#ccc" : "#999",
                                    height: 450,
                                    boxShadow: themeMode === 'dark'
                                        ? "0 8px 20px rgba(255,255,255,0.1)"
                                        : "0 8px 20px rgba(0,0,0,0.1)",
                                }}
                            >
                                <ProvinceMapMarkers
                                    locations={[{
                                        lat: data?.location?.lat ?? 0,
                                        lon: data?.location?.long ?? 0,
                                        label: `${data?.place}, ${data?.location?.address}`,
                                        status: data?.lastSelfTest?.internalTestResult === '255' ? 'success' : 'error'
                                    }]}
                                />
                            </Paper>
                        </Box>
                    </>
                )
            }
        </div>
    );
};

export default AedDetails;