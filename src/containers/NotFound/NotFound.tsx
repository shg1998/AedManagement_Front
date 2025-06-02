import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";
import EmptyPage from '../../assets/images/openBox.png';

const NotFound = () => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                textAlign: "center",
            }}
        >
            <Box
                component="img"
                src={EmptyPage}
                alt="Windows 11 Not Found"
                sx={{
                    maxWidth: 300,
                    mb: 3,
                    borderRadius: 4,
                }}
            />
            <br/>
            <Typography
                variant="h5"
                sx={{
                    color: theme.palette.textGray.main,
                    mb: 2,
                }}
            >
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: theme.palette.textGray.main,
                    mb: 4,
                    maxWidth: 480,
                }}
            >
                It might have been removed, renamed, or did not exist in the first place. Let’s get you back home.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/")}
                sx={{ textTransform: "none", fontWeight: "bold" }}
            >
                Go to Homepage
            </Button>
        </Box>
    );
};

export default NotFound;
