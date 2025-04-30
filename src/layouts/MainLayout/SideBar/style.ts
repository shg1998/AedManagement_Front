import {Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    notNested: {
        paddingLeft: 0,
        paddingRight: 0,
        // backgroundColor: 'green',
        color: "black",
        direction: "rtl",
        width: "fit-to-content",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    menuContainer: {
        padding: "0",
        "&:nth-child(even)": {
            backgroundColor: "white",
        },
    },
    exchangeMenu: {
        background: "#ddd",
        "& *": {
            color: "navy",
        },
    },
    linkWrapper: {
        display: "block",
        justifyContent: "center",
        "&:hover": {
            transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "& div": {
            color: "white",
            minWidth: "unset !important",
        },
        "& a": {
            color: "#4625B2",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& div:nth-child(2)": {
                display: "inline-block",
            },
        },
    },
    openSideLinkWrapper: {
        display: "flex",
        justifyContent: "right",
        flexDirection: "column",
        "&:hover": {
            transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "& div": {
            color: theme.palette.background.default,
            minWidth: "100% !important",
            paddingLeft: "5px",
            // minWidth: "unset !important",
        },
        "& a": {
            color: "#4625B2",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            "& div:nth-child(2)": {
                display: "inline-block",
            },
        },
    },
    divider: {
        backgroundColor: "rgba(255,255,255,0.63)",
        height: "1px",
        margin: "0 12px",
        marginTop: "8px",
        display: "none",
    },
    sidebar: {
        justifyContent: "left",
    },
    menuItemText: {
        color: theme.palette.textGray.main,
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "0.9em",
        lineHeight: "20px",
        marginLeft: "10px",
        whiteSpace: "nowrap",
    },
    selectedMenuItemText: {
        color: theme.palette.primary.dark,
        fontStyle: "normal",
        fontSize: "0.9em",
        lineHeight: "20px",
        marginLeft: "10px",
        whiteSpace: "nowrap",
        fontWeight: 700,
    },

    selectedMenuItemIcon: {
        "& path": {
            color: theme.palette.primary.dark,
            fill: theme.palette.primary.dark,
            minWidth: "10% !important",
            fontWeight: "bolder",
        },
        "& svg": {
            color: theme.palette.primary.dark,
            minWidth: "10% !important",
            fill: theme.palette.primary.dark,
        },
        minWidth: "10% !important",
        alignSelf: "center !important",
    },

    menuItemIcon: {
        "& path": {
            color: theme.palette.textGray.main,
            fill: theme.palette.textGray.main,
            minWidth: "10% !important",
            fontWeight: "bolder",
        },

        "& svg": {
            color: theme.palette.primary.dark,
            minWidth: "10% !important",
            fill: theme.palette.primary.dark,
        },

        minWidth: "10% !important",
        alignSelf: "center !important",
    },

    svgWrapper: {
        display: "flex",
        "& path": {
            color: "white",
            minWidth: "unset !important",
            fill: "#ffffff",
        },
    },
}));
