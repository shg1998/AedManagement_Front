import React, {ReactNode} from 'react';
import {AedSelfTestDetailsPropsType} from "./constants";
import {Box, Grid, Paper, Typography, Stack, GridProps, Divider} from '@mui/material';
import {internalTestConverter} from "../../utils/SelfTestUtils";
import ProvinceMapMarkers from "../../components/map/ProvinceMapMarkers";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MemoryIcon from '@mui/icons-material/Memory';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import {useThemeContext} from '../../ThemeContext';

const SelfTestDetails: React.FC<AedSelfTestDetailsPropsType> = ({data}) => {
    const {themeMode, theme} = useThemeContext();

    const textColor = themeMode === 'dark' ? "#ddd" : "#444";
    const bgColor = themeMode === 'dark' ? "#121212" : "#f0f4f8";
    const cardBg = themeMode === 'dark' ? "#1e1e1e" : "white";

    return (
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
                        Status: <strong>{data?.internalTestResult === '255' ? "Passed ✅" : "Failed ⛔"}</strong>
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
                        Remaining capacity: <strong>{data?.batteryRemain}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{color: textColor}}>
                        Shock Count: <strong>{data?.shockCount}</strong>
                    </Typography>
                </StatusCard>

                <StatusCard
                    title="Sent Time"
                    color="#ffb300"
                    Icon={AccessTimeIcon}
                    gridProps={{xs: 12, sm: 6, md: 4}}
                    cardBg={cardBg}
                    textColor={textColor}
                    themeMode={themeMode ?? 'light'}
                >
                    <Typography variant="body1" sx={{color: textColor}}>
                        Time: <strong>{data?.sentTime}</strong>
                    </Typography>
                </StatusCard>

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
                        Software Version: <strong>{data?.algorithmVersion}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{color: textColor}}>
                        SAE Board Version: <strong>{data?.saeBoardVersion}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{color: textColor}}>
                        Mother Board Version: <strong>{data?.motherBoardVersion}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{color: textColor}}>
                        High Voltage Board Version: <strong>{data?.highVoltageBoardVersion}</strong>
                    </Typography>
                </StatusCard>

                {data?.internalTestResult !== '255' && (
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

            <Divider
                sx={{
                    mb: 4,
                    borderColor: themeMode === 'dark' ? "#4caf50" : "#a5d6a7",
                    borderWidth: 2,
                    borderRadius: 1,
                    maxWidth: 420,
                    mx: "auto",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        borderColor: "#4caf50",
                        boxShadow: "0 0 8px #4caf50",
                    },
                }}
            />

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
                        lat: data?.lat ?? 0,
                        lon: data?.long ?? 0,
                        label: `${data?.place}, ${data?.address}`,
                        status: data?.internalTestResult === '255' ? 'success' : 'error'
                    }]}
                />
            </Paper>
        </Box>
    );
};

interface StatusCardProps {
    title: string;
    color: string;
    children: ReactNode;
    Icon: React.ElementType;
    gridProps?: GridProps;
    cardBg?: string;
    textColor?: string;
    themeMode: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
                                                   title,
                                                   color,
                                                   children,
                                                   Icon,
                                                   gridProps,
                                                   cardBg = "white",
                                                   textColor = "#444",
                                                   themeMode = "light"
                                               }) => (
    <Grid item {...gridProps}>
        <Paper
            elevation={8}
            sx={{
                borderRadius: 3,
                borderLeft: `8px solid`,
                borderImage: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0) 100%) 1`,
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                bgcolor: cardBg,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "default",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: themeMode === 'dark'
                        ? "0 20px 40px rgba(255,255,255,0.1)"
                        : "0 20px 40px rgba(0,0,0,0.15)",
                }
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Icon
                    sx={{
                        color: color,
                        fontSize: 34,
                        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                        transition: "color 0.25s ease",
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        color: color,
                        fontWeight: 700,
                        letterSpacing: 0.8,
                        userSelect: "none",
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            {children}
        </Paper>
    </Grid>
);

export default SelfTestDetails;
