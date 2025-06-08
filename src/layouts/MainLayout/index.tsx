import React, {createContext, useState} from "react";
import {styled, Theme} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material/";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import logoImage from "../../assets/images/logo-white.png";
import {ButtonBase, Typography} from "@mui/material";
import SideBar from "./SideBar/SideBar";
import UserMenu from "./AppBar/UserMenu";
import {getBaseUrl} from "../../config";
import {useCurrentUserState} from "../../context/CurrentUserContext";
import {makeStyles} from "@mui/styles";
import {useThemeContext} from "../../ThemeContext";
import AedImage from "../../assets/images/aed.png";

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})<{
    open?: boolean;
}>(({theme, open}) => ({
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: "60px",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `calc(100% - ${60}px)`,
    }),
    ...(open && {
        marginTop: "60px",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${240}px)`,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 240,
    }),
}));

const useStyles = makeStyles((theme: Theme) => ({
    appBarStyle: {
        backgroundColor: `${theme.palette.primaryColor.main} !important`,
        height: "55px !important",
        minWidth: "100% !important",
        top: "0 !important",
        marginLeft: "0 !important",
        boxShadow: "none !important",
    },
    drawerStyle: {
        marginTop: "50px !important",
    },
    logoContainer: {
        position: "fixed",
    },
    toolbarStyle: {
        display: "flex !important",
        flexDirection: "row",
        justifyContent: "space-between !important",
        direction: "ltr",
        padding: "8px !important",
        minHeight: "55px !important",
        maxHeight: "55px !important",
    },
    searchFieldStyle: {
        fontFamily: "sans-serif !important",
    },
}));

interface SideWidthContextValue {
    sideWidth: string;

    setSideWidth(sideWidth: string): void;
}

interface DashboardPropsInterface {
    component: React.ReactNode;
}

sessionStorage.setItem("openSidebar", "false");

createContext<SideWidthContextValue>({
    sideWidth: "50px",
    setSideWidth() {
    },
});

const Dashboard: React.FC<DashboardPropsInterface> = ({component}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const currentUserInfo = useCurrentUserState();
    const {theme} = useThemeContext();
    return (
        <Box
            sx={{
                display: "flex",
                background: theme.palette.background.default,
            }}
        >
            <CssBaseline/>
            <AppBar className={classes.appBarStyle} position="fixed" open={open}>
                <Toolbar className={classes.toolbarStyle}>
                    <Box component="span" sx={{display: {xs: "none", md: "block"}}}>
                        <ButtonBase>
                            <img
                                alt="sata_logo"
                                style={{
                                    width: "200px",
                                    height: '150px'
                                }}
                                src={logoImage}
                            />
                        </ButtonBase>
                    </Box>

                    <Box component="span" sx={{margin: 'auto', display: 'inline-block', mr: '42%'}}>
                        <Typography sx={{fontSize: '28px !important'}} fontWeight={'bolder'}>
                            <>
                                <img
                                    src={AedImage}
                                    alt="AED"
                                    style={{
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        verticalAlign: 'middle',
                                        marginRight: '0.2em',
                                        marginTop: '-0.6em',
                                    }}
                                />
                                AED Alert
                            </>
                        </Typography>
                    </Box>

                    <div>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar
                                alt=""
                                src={
                                    currentUserInfo?.image_url
                                        ? getBaseUrl().replace("api/", "") +
                                        currentUserInfo?.image_url
                                        : ""
                                }
                            />
                        </IconButton>
                        <UserMenu
                            anchorElUser={anchorElUser}
                            setAnchorElUser={setAnchorElUser}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <SideBar setSidebarOpen={setOpen}/>
            <Main open={open}>
                <div style={{overflowX: 'hidden', height: '100vh'}}>{component}</div>
            </Main>
        </Box>
    )
        ;
};

export default Dashboard;
