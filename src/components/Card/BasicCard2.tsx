import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PropsWithChildren, ReactNode } from "react";

type Variant = "success" | "normal" | "warning" | "error";

interface CardProps {
    header?: string;
    variant?: Variant;
    headerIcon?: ReactNode;
    headerChildren?: ReactNode;
    className?: string;
    elevation?: number;
}

const lightPalette: Record<Variant, { bg: string; border: string; main: string }> = {
    success: { bg: "#E8F5E9", border: "rgba(67, 160, 71, 0.25)", main: "#2E7D32" },
    normal: { bg: "#E3F2FD", border: "rgba(33, 150, 243, 0.25)", main: "#1565C0" },
    warning: { bg: "#FFF3E0", border: "rgba(255, 152, 0, 0.25)", main: "#F57C00" },
    error: { bg: "#FFEBEE", border: "rgba(239, 83, 80, 0.25)", main: "#D32F2F" },
};

const darkPalette: Record<Variant, { bg: string; border: string; main: string }> = {
    success: { bg: "#1B262C", border: "rgba(102, 187, 106, 0.4)", main: "#66BB6A" },
    normal: { bg: "#263238", border: "rgba(38, 198, 218, 0.4)", main: "#00BCD4" },
    warning: { bg: "#3E2723", border: "rgba(239, 83, 80, 0.4)", main: "#EF5350" },
    error: { bg: "#4A2424", border: "rgba(211, 47, 47, 0.4)", main: "#EF5350" },
};

const BasicCard: React.FC<PropsWithChildren<CardProps>> = ({
                                                               header,
                                                               variant = "normal",
                                                               headerIcon,
                                                               headerChildren,
                                                               className,
                                                               elevation = 8,
                                                               children,
                                                           }) => {
    const theme = useTheme();
    const palette = theme.palette.mode === "dark" ? darkPalette : lightPalette;

    const colors = palette[variant] ?? palette.normal;

    return (
        <Card
            className={className}
            elevation={elevation}
            sx={{
                flexGrow: 1,
                borderRadius: 3,
                bgcolor: colors.bg,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.border}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                color: colors.main,
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 8px 24px ${colors.border}`,
                },
            }}
        >
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            fontFamily: "'Inter', sans-serif",
                            color: colors.main,
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                mr: 1,
                                display: "flex",
                                alignItems: "center",
                                fontSize: 28,
                                color: colors.main,
                            }}
                        >
                            {headerIcon ?? <InfoOutlinedIcon fontSize="medium" />}
                        </Box>
                        {header}
                    </Typography>
                }
                action={headerChildren}
                sx={{
                    px: 3,
                    pt: 3,
                    pb: 1.5,
                    direction: "rtl",
                    ".MuiCardHeader-action": {
                        alignSelf: "center",
                    },
                }}
            />
            <Divider sx={{ borderColor: colors.border, mx: 3, mb: 2 }} />
            <CardContent
                sx={{
                    px: 3,
                    pb: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "fit-content",
                    flexGrow: 1,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem !important", sm: "2rem !important", md: "2.5rem !important" },
                        fontFamily: "'Inter', sans-serif",
                        userSelect: "none",
                        color: colors.main,
                        lineHeight: 1,
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BasicCard;
