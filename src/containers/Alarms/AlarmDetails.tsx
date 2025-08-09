import React from 'react';
import {Box, Grid, Paper, Typography, Stack, GridProps, useTheme} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MessageIcon from '@mui/icons-material/Message';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import {useThemeContext} from '../../ThemeContext';
import {getJalaliDateTime, getJalaliDateTime2} from '../../utils/TimeUtils/time';
import {useQuery} from "react-query";
import Alarm from "../../services/Alarm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"; // فرض بر این است که این تابع وجود دارد

// AlarmType enum
enum AlarmType {
    AedBattery = 'AedBattery',
    AedSelfTestFail = 'AedSelfTestFail',
    AedSensor = 'AedSensor',
    AedConnection = 'AedConnection',
    Other = 'Other'
}


interface AlarmDetailsProps {
    alarmId: string;
}

interface StatusCardProps {
    title: string;
    color: string;
    children: React.ReactNode;
    Icon: React.ElementType;
    gridProps?: GridProps;
    cardBg?: string;
    textColor?: string;
    themeMode: string;
}

// کامپوننت StatusCard از کدهای شما گرفته شده و کمی ساده‌تر شده است
export const StatusCard: React.FC<StatusCardProps> = ({
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
                <Icon sx={{
                    color,
                    fontSize: 34,
                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                    transition: "color 0.25s ease"
                }}/>
                <Typography variant="h6" sx={{color, fontWeight: 700, letterSpacing: 0.8, userSelect: "none"}}>
                    {title}
                </Typography>
            </Stack>
            {children}
        </Paper>
    </Grid>
);


const AlarmDetails: React.FC<AlarmDetailsProps> = ({alarmId}) => {
    const {themeMode} = useThemeContext();
    const theme = useTheme();

    const colors = {
        light: {
            textPrimary: theme.palette.text.primary,
            textSecondary: theme.palette.text.secondary,
            background: theme.palette.background.default,
            cardBackground: theme.palette.background.paper,
        },
        dark: {
            textPrimary: theme.palette.text.primary,
            textSecondary: theme.palette.text.secondary,
            background: theme.palette.background.default,
            cardBackground: theme.palette.background.paper,
        }
    };
    const themeColors = themeMode === 'dark' ? colors.dark : colors.light;

    // انتخاب رنگ برای کارت بر اساس نوع آلارم
    const getAlarmColor = (type: AlarmType): string => {
        switch (type) {
            case AlarmType.AedSelfTestFail:
            case AlarmType.AedConnection:
            case AlarmType.AedSensor:
                return theme.palette.error.main;
            case AlarmType.AedBattery:
                return theme.palette.warning.main;
            default:
                return theme.palette.info.main;
        }
    };

    const {getById} = new Alarm();
    const {data, isLoading} = useQuery(
        ['alarmDetails', alarmId],
        () => getById(alarmId!),
        {
            enabled: !!alarmId,
        }
    );

    return (
        <>
            {
                isLoading ? <LoadingComponent/> : (
                    <>
                        <Box
                            sx={{
                                p: 5,
                                bgcolor: themeColors.background,
                                minHeight: "100vh",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                color: themeColors.textPrimary,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                    gap: 1.5,
                                    p: 1,
                                    bgcolor: getAlarmColor(data?.alarmType),
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    maxWidth: 320,
                                    userSelect: "none",
                                }}
                            >
                                <ErrorOutlineIcon sx={{color: '#fff', fontSize: 30}}/>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#fff',
                                        letterSpacing: 1,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Alarm Details
                                </Typography>
                            </Box>

                            <Grid container direction={"column"} spacing={4} mb={5}>
                                {/* شماره سریال */}
                                <StatusCard
                                    title="Device Serial Number"
                                    color={getAlarmColor(data?.alarmType)}
                                    Icon={DeviceHubIcon}
                                    gridProps={{xs: 12, sm: 6, md: 3}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        <strong>{data?.serialNumber}</strong>
                                    </Typography>
                                </StatusCard>

                                {/* نوع آلارم */}
                                <StatusCard
                                    title="Alarm Type"
                                    color={getAlarmColor(data?.alarmType)}
                                    Icon={ErrorOutlineIcon}
                                    gridProps={{xs: 12, sm: 6, md: 3}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        <strong>{data?.alarmType}</strong>
                                    </Typography>
                                </StatusCard>

                                {/* زمان وقوع */}
                                <StatusCard
                                    title="Occurrence Time"
                                    color={getAlarmColor(data?.alarmType)}
                                    Icon={AccessTimeIcon}
                                    gridProps={{xs: 12, sm: 6, md: 3}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        <strong>{getJalaliDateTime2(data?.occurrenceTime)}</strong>
                                    </Typography>
                                </StatusCard>

                                {/* پیام آلارم */}
                                <StatusCard
                                    title="Message"
                                    color={getAlarmColor(data?.alarmType)}
                                    Icon={MessageIcon}
                                    gridProps={{xs: 12, sm: 6, md: 3}}
                                    cardBg={themeColors.cardBackground}
                                    textColor={themeColors.textSecondary}
                                    themeMode={themeMode}
                                >
                                    <Typography variant="body1" sx={{color: themeColors.textPrimary}}>
                                        <strong>{data?.message}</strong>
                                    </Typography>
                                </StatusCard>
                            </Grid>
                        </Box>
                    </>
                )
            }

        </>
    );
};

export default AlarmDetails;