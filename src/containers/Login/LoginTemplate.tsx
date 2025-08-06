import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import backgroundImage from "../../assets/images/bgLogin.jpg";
import logoImage from "../../assets/images/pix_logo_header.svg";
import React, {PropsWithChildren} from "react";
import {Theme} from "@mui/material";

// @ts-ignore
export const useStyles = makeStyles((theme: Theme) => ({
    BgContainer: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    Bg: {
        width: "25vw",
        "@media (max-width: 1200px)": {
            width: "50vw",
        },
        "@media (max-width: 768px)": {
            width: "70vw",
        },
        "@media (max-width: 500px)": {
            width: "90vw",
        },
        borderRadius: 15,
        background:
            theme.palette.mode === "light"
                ? "linear-gradient(90deg, #C4C5C7 0%, #DCDDDF 52%, #EBEBEB 100%);"
                : "linear-gradient(90deg, #5f5f5f 0%, #3c3b37 52%, #5f5f5f 100%);",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
    },
    logoImage: {
        width: "10rem",
        height: "25vh",
        marginTop: "30px",
        "@media (max-width: 500px)": {
            width: "10rem",
        },
        marginBottom: '-80px'
    },
    title: {
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "1vw !important",
        lineHeight: "32px",
        marginBottom: "20px",
    },
    fontCustum: {
        fontSize: "0.9em",
    },
    footerContainer: {
        display: "flex",
    },
    footer: {
        display: "flex",
    },
    rememberContainer: {
        fontSize: "1em",
        marginLeft: "-10px",
    },
    createNewPassword: {
        marginLeft: "5px",
        fontSize: "1em",
    },
    formContainer: {
        direction: "rtl",
        width: "92%",
    },
    inputLabel: {
        left: "auto",
        fontSize: "1em",
        marginTop: "10px",
    },
    errorText: {
        fontSize: "1em",
        marginBottom: "15px !important",
    },
    errorBorder: {
        border: "2px solid red",
    },
}));

const LoginTemplate: React.FC<PropsWithChildren> = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.BgContainer}>
            <div className={classes.logoContainer}>
                <img alt="aed_logo" className={classes.logoImage} src={logoImage}/>
            </div>
            <div style={{paddingBottom: "30px"}}>
                <Box
                    sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: '600px',
                        direction: 'ltr'
                    }}
                    className={classes.Bg}
                >
                    {children}
                </Box>
            </div>
        </div>
    );
};
export default LoginTemplate;
