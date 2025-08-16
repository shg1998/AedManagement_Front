import React from 'react';
import {useQuery} from "react-query";
import Aed from "../../services/Aed";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {useThemeContext} from "../../ThemeContext";
import {Box, Button, Divider, Grid, ListItem, Paper, Typography, useTheme} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MemoryIcon from "@mui/icons-material/Memory";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {internalTestConverter} from "../../utils/SelfTestUtils/SelfTestUtils";
import MapIcon from "@mui/icons-material/Map";
import ImageIcon from '@mui/icons-material/Image';
import ProvinceMapMarkers from "../../components/map/ProvinceMapMarkers";
import {StatusCard} from '../SelfTests/SelfTestDetails';
import {getJalaliDateTime, getJalaliDateTime2} from "../../utils/TimeUtils/time";
import AedImage from "../../assets/images/aedImage.png";
import {getStatus} from "../../utils/General/generalUtils";
import Attachment from "../../services/Attachment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {iranProvinces} from "../../utils/ProvinceUtils/ProvinceUtils";

type AedDetailsProps = {
    aedId?: string;
}

const AedDetails: React.FC<AedDetailsProps> = ({aedId}) => {
    const {themeMode} = useThemeContext();
    const theme = useTheme();
    const { downloadAttachment } = new Attachment();
    const colors = {
        light: {
            textPrimary: "#212121",
            textSecondary: "#424242",
            background: "#f9fafb",
            cardBackground: "#ffffff",
            headerBg: "#e3f2fd",
            headerText: "#1565c0",
            iconColor: "#1976d2",
            success: "#06670a",
            successLight: "#81c784",
            error: "#d32f2f",
            errorLight: "#ef9a9a",
            warning: "#fbc02d",
            warningLight: "#fff176",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            paperShadowLight: "0 8px 20px rgba(0,0,0,0.1)",
            paperShadowDark: "0 8px 20px rgba(255,255,255,0.1)",
        },
        dark: {
            textPrimary: "#e0e0e0",
            textSecondary: "#cfd8dc",
            background: "#121212",
            cardBackground: "#1e1e1e",
            headerBg: "#0d47a1",
            headerText: "#90caf9",
            iconColor: "#90caf9",
            success: "#0b570f",
            successLight: "#4caf50",
            error: "#ef9a9a",
            errorLight: "#d32f2f",
            warning: "#fff176",
            warningLight: "#fbc02d",
            boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
            paperShadowLight: "0 8px 20px rgba(0,0,0,0.6)",
            paperShadowDark: "0 8px 20px rgba(255,255,255,0.1)",
        }
    };

    const themeColors = themeMode === 'dark' ? colors.dark : colors.light;

    const {fetchDetails} = new Aed();

    const {data, isLoading} = useQuery(
        ['aedDetails', aedId],
        () => fetchDetails(aedId!),
        {
            enabled: !!aedId,
            refetchOnWindowFocus: false,
        }
    );

    const handleDownloadClicked = (id: any) => {
        downloadAttachment(id).then();
    }

    const generateInternalTestResult = (status: string): string => {
        switch (status) {
            case 'Pass':
                return "Passed ✅";
            case 'Fail':
                return "Failed ⛔";
            case 'NoWifi':
                return "No Wifi ⚠️";
            case 'Disconnected':
                return "Disconnected 📴";
        }
        return '';
    }

    return (
        <div>
            {
                isLoading ? <LoadingComponent/> : (
                    <>
                        <Box sx={{
                            p: 5,
                            bgcolor: themeColors.background,
                            minHeight: "100vh",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            color: themeColors.textPrimary,
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                    gap: 1.5,
                                    p: 1,
                                    bgcolor: themeColors.headerBg,
                                    borderRadius: 2,
                                    boxShadow: themeColors.boxShadow,
                                    maxWidth: 320,
                                    userSelect: "none"
                                }}
                            >
                                <InfoIcon sx={{color: themeColors.iconColor, fontSize: 30}}/>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: themeColors.headerText,
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
                                    color={themeColors.warning}
                                    Icon={DeviceHubIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Serial Number: <strong>{data?.serialNumber}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Province: <strong>{(iranProvinces.filter(s=>s.value === data?.location?.province))[0]?.title}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        city: <strong>{data?.location?.city}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Place: <strong>{data?.location?.place}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Department: <strong>{data?.location?.unit}</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Self Test
                                        Status: <strong>{generateInternalTestResult(data?.internalTestResult)}</strong>
                                    </Typography>

                                </StatusCard>

                                <StatusCard
                                    title="Battery & Shock Status"
                                    color={themeColors.iconColor}
                                    Icon={BatteryChargingFullIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Battery Type: <strong>{data?.aedBatteryType}</strong>
                                    </Typography>
                                    {
                                        data?.lastSelfTest !== null && (
                                            <>
                                                <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                    Remaining
                                                    capacity: <strong>{data?.lastSelfTest?.batteryRemain}</strong>
                                                </Typography>
                                                <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                    Shock Count: <strong>{data?.lastSelfTest?.shockCount}</strong>
                                                </Typography>
                                            </>
                                        )
                                    }
                                </StatusCard>

                                <StatusCard
                                    title="Date & Time"
                                    color={themeColors.warning}
                                    Icon={AccessTimeIcon}
                                    gridProps={{xs: 12, sm: 6, md: 4}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        Register Date&Time: <strong>{getJalaliDateTime(data?.registerDateTime)}</strong>
                                    </Typography>
                                    {/*<Typography variant="body1" sx={{color: themeColors.textPrimary}}>*/}
                                    {/*    Last Pm*/}
                                    {/*    Date&Time: <strong>{data?.lastPmDateTime === '0001-01-01T00:00:00' ? '-' : data?.lastPmDateTime}</strong>*/}
                                    {/*</Typography>*/}
                                    {
                                        data?.lastSelfTest !== null && (
                                            <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                Last Self Test
                                                Time: <strong>{getJalaliDateTime2(data?.lastSelfTest?.sentTime)}</strong>
                                            </Typography>
                                        )
                                    }
                                </StatusCard>

                                {
                                    data?.lastSelfTest !== null && (
                                        <StatusCard
                                            title="Device Versions"
                                            color={themeColors.success}
                                            Icon={MemoryIcon}
                                            gridProps={{xs: 12, sm: 12, md: 5}}
                                            cardBg={themeColors.cardBackground}
                                            textColor={themeColors.textSecondary}
                                            themeMode={themeMode}
                                        >
                                            <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                Software Version: <strong>{data?.lastSelfTest?.algorithmVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                SAE Board Version: <strong>{data?.lastSelfTest?.saeBoardVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                Mother Board
                                                Version: <strong>{data?.lastSelfTest?.motherBoardVersion}</strong>
                                            </Typography>
                                            <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                                High Voltage Board
                                                Version: <strong>{data?.lastSelfTest?.highVoltageBoardVersion}</strong>
                                            </Typography>
                                        </StatusCard>
                                    )
                                }

                                {(data?.internalTestResult === 'Fail') && (
                                    <StatusCard
                                        title="Internal Self Test Result"
                                        color={themeColors.error}
                                        Icon={ErrorOutlineIcon}
                                        gridProps={{xs: 12, sm: 12, md: 7}}
                                        cardBg={themeColors.cardBackground}
                                        textColor={themeColors.textPrimary}
                                        themeMode={themeMode}
                                    >
                                        <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                            {data?.lastSelfTest?.internalTestResult === null ? "" : (data?.lastSelfTest?.internalTestResult === "255" ? internalTestConverter(parseInt("FF", 16))
                                                : internalTestConverter(parseInt(data?.lastSelfTest?.internalTestResult, 16)))}
                                        </Typography>
                                    </StatusCard>
                                )}
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item sm={12} md={6}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                            gap: 1.5,
                                            p: 1,
                                            bgcolor: themeMode === 'dark' ? colors.dark.success : colors.light.successLight,
                                            borderRadius: 2,
                                            boxShadow: themeColors.boxShadow,
                                            maxWidth: 240,
                                            userSelect: "none"
                                        }}
                                    >
                                        <MapIcon
                                            sx={{
                                                color: themeMode === 'dark' ? colors.dark.successLight : colors.light.success,
                                                fontSize: 30
                                            }}/>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: themeMode === 'dark' ? colors.dark.successLight : colors.light.success,
                                                letterSpacing: 1,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Location Map
                                        </Typography>
                                    </Box>

                                    <br/><br/><br/>

                                    <Paper
                                        elevation={6}
                                        sx={{
                                            borderRadius: 3,
                                            bgcolor: themeColors.cardBackground,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: themeColors.textSecondary,
                                            height: 450,
                                            boxShadow: themeColors.paperShadowLight,
                                        }}
                                    >
                                        <ProvinceMapMarkers
                                            locations={[{
                                                lat: data?.location?.lat ?? 0,
                                                lon: data?.location?.long ?? 0,
                                                label: `${data?.location?.place},${data?.location?.unit}, ${data?.location?.address ? data?.location?.address : ""}`,
                                                status: getStatus(data?.internalTestResult)!
                                            }]}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                            gap: 1.5,
                                            p: 1,
                                            bgcolor: themeMode === 'dark' ? "#8e7038" : "#d6c4a5",
                                            borderRadius: 2,
                                            boxShadow: themeColors.boxShadow,
                                            maxWidth: 240,
                                            userSelect: "none"
                                        }}
                                    >
                                        <ImageIcon
                                            sx={{color: themeMode === 'dark' ? "#d6c4a5" : "#8e7038", fontSize: 30}}/>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: themeMode === 'dark' ? "#d6c4a5" : "#8e7038",
                                                letterSpacing: 1,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Aed Image
                                        </Typography>
                                    </Box>

                                    <Paper
                                        elevation={6}
                                        sx={{
                                            borderRadius: 3,
                                            bgcolor: 'transparent',
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: 600,
                                            boxShadow: themeColors.paperShadowLight,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={AedImage}
                                            alt="AED Device"
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                borderRadius: 2,
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                            {/* Attachments */}
                            <ListItem sx={{ px: 2, pt: 3, pb: 1 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                        gap: 1.5,
                                        p: 1,
                                        bgcolor: themeMode === 'dark' ? colors.dark.success : colors.light.successLight,
                                        borderRadius: 2,
                                        boxShadow: themeColors.boxShadow,
                                        maxWidth: 240,
                                        userSelect: "none"
                                    }}
                                >
                                    <AttachFileIcon
                                        sx={{
                                            color: themeMode === 'dark' ? colors.dark.successLight : colors.light.success,
                                            fontSize: 30
                                        }}/>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: themeMode === 'dark' ? colors.dark.successLight : colors.light.success,
                                            letterSpacing: 1,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Attachments
                                    </Typography>
                                </Box>
                            </ListItem>
                            {/*<Divider component="li" />*/}
                            {data?.attachments && data.attachments.length > 0 ? (
                                data.attachments.map((attachment: any, idx: any) => (
                                    <ListItem
                                        key={idx}
                                        sx={{
                                            justifyContent: 'space-between',
                                            px: 2,
                                            py: 1,
                                            bgcolor: idx % 2 === 0 ? theme.palette.action.hover : 'transparent',
                                            borderRadius: 1,
                                            transition: 'background-color 0.3s',
                                            '&:hover': { bgcolor: theme.palette.action.selected },
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: 300,
                                                userSelect: 'text',
                                            }}
                                            title={attachment.fileName}
                                        >
                                            {attachment.fileName}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleDownloadClicked(attachment?.id)}
                                            aria-label={`Download file ${attachment.fileName}`}
                                            sx={{
                                                ml: { xs: 0, sm: 2 },
                                                mt: { xs: 1, sm: 0 },
                                                minWidth: 100,
                                            }}
                                        >
                                            Download
                                        </Button>
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>
                                    <Typography
                                        color={theme.palette.text.disabled}
                                        fontStyle="italic"
                                        align="center"
                                        width="100%"
                                    >
                                        🚫 No attachments found.
                                    </Typography>
                                </ListItem>
                            )}
                        </Box>
                    </>
                )
            }
        </div>
    );
};
export default AedDetails;