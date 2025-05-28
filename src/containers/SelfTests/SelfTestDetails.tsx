import React, {ReactNode} from 'react';
import {AedSelfTestDetailsPropsType} from "./constants";
import {Box, Grid, Paper, Typography} from '@mui/material';


const SelfTestDetails:React.FC<AedSelfTestDetailsPropsType> = ({data}) => {
    return (
        <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Device Dashboard
            </Typography>

            <Grid container spacing={3} mb={4}>
                {/* کارت‌ها */}
                <StatusCard title="Device Info" color="#4caf50">
                    <Typography variant="body1"><strong>Device ID:</strong> AET-1234567</Typography>
                    <Typography variant="body1"><strong>Status:</strong> Normal ✅</Typography>
                </StatusCard>

                <StatusCard title="Battery Status" color="#2196f3">
                    <Typography variant="body1">Remaining capacity: <strong>90%</strong></Typography>
                    <Typography variant="body1">Last Battery Replacement: 2023-05-01</Typography>
                </StatusCard>

                <StatusCard title="Profile Status" color="#ff9800">
                    <Typography variant="body1">Profile expires on 2023-10-04</Typography>
                </StatusCard>

                <StatusCard title="Position Status" color="#4caf50">
                    <Typography variant="body1">Status: Normal</Typography>
                </StatusCard>

                <StatusCard title="Network Status" color="#4caf50">
                    <Typography variant="body1">Signal: Good</Typography>
                </StatusCard>
            </Grid>

            {/* بخش نقشه */}
            <Paper elevation={3} sx={{ borderRadius: 2, height: 400, bgcolor: "white", display: "flex", justifyContent: "center", alignItems: "center", color: "#999" }}>
                {/* اینجا کامپوننت نقشه یا iframe یا هر کامپوننت نقشه دلخواه را جایگزین کنید */}
                <Typography variant="h6">Map Component Here</Typography>
            </Paper>
        </Box>
    );
};

interface StatusCardProps {
    title: string;
    color: string;
    children: ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, color, children }) => (
    <Grid item xs={12} sm={6} md={4}>
        <Paper
            elevation={3}
            sx={{
                borderLeft: `6px solid ${color}`,
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                bgcolor: "white",
            }}
        >
            <Typography variant="h6" sx={{ color, mb: 1 }}>
                {title}
            </Typography>
            {children}
        </Paper>
    </Grid>
);
export default SelfTestDetails;