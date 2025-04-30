import {
    Badge,
    ListItem,
    ListItemIcon,
    Tooltip,
    Typography,
    Zoom,
} from "@mui/material";
import {ListItemInterface} from "../../../interfaces";
import {useStyles} from "./style";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import {useThemeContext} from "../../../ThemeContext";

interface Props {
    item: ListItemInterface;
    sidebarOpen?: boolean;
    isChild?: boolean;
    onItemClick?: () => void;
}

const SidebarItem = ({item, sidebarOpen, isChild, onItemClick}: Props) => {
    const {
        menuItemText,
        selectedMenuItemText,
        menuItemIcon,
        selectedMenuItemIcon,
    } = useStyles();
    const {theme} = useThemeContext();

    const Icon = item?.Icon;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = (e: any) => {
        e.preventDefault();

        setTimeout(() => {
            navigate(item.link);
        }, 100);

        if (onItemClick) {
            setTimeout(() => {
                onItemClick();
            }, 50);
        }
    };

    const itemToolltipHandle = (
        <ListItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                borderLeft:
                    item.selected && !isChild
                        ? `4px solid ${theme.palette.primaryColor.dark}`
                        : `4px solid ${theme.palette.secondary.main}`,
                backgroundColor:
                    (item.selected && !isChild) || (isHovered && !isChild)
                        ? theme.palette.primaryColor.light
                        : theme.palette.secondary.main,
                height: "45px",
                marginTop: "3px",
                marginBottom: "3px",
                ...(isHovered && {
                    color: theme.palette.primary.main,
                    backgroundColor: !isChild
                        ? theme.palette.primaryColor.light
                        : theme.palette.secondary.main,
                }),
            }}
        >
            {/* <Link to={item.link}> */}
            <ListItemIcon>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        direction: "rtl",
                    }}
                >
                    {Icon && (
                        <Icon
                            className={
                                item.selected || isHovered ? selectedMenuItemIcon : menuItemIcon
                            }
                            style={{
                                fontSize: "1.4em",
                            }}
                        />
                    )}
                    {(sidebarOpen || isChild) && (
                        <>
                            {item.selected && isChild && (
                                <ArrowLeftSharpIcon
                                    className={
                                        item.selected || isHovered
                                            ? selectedMenuItemIcon
                                            : menuItemIcon
                                    }
                                    style={{fontSize: "1.4em" /*transition: " color 0.9s"*/}}
                                />
                            )}
                            <Typography
                                style={{
                                    marginLeft: "auto",
                                    fontSize: "1rem",
                                    marginRight: "5px",
                                    fontWeight: item.selected ? "bold" : "normal",
                                    minWidth: "150px",
                                    direction: "ltr",
                                    textAlign: "left",

                                    ...(isHovered && {
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }),
                                }}
                                className={item.selected ? selectedMenuItemText : menuItemText}
                            >
                                {item.text}
                            </Typography>
                        </>
                    )}
                </div>
            </ListItemIcon>
            {/* </Link> */}
        </ListItem>
    );

    if (!isChild && !sidebarOpen) {
        return (
            <Tooltip title={item.text}
                     PopperProps={{
                         sx: {
                             // "& .MuiTooltip-tooltip": {
                             //     backgroundColor: theme.palette.background.paper,
                             //     color: theme.palette.text.primary,
                             //     maxWidth: 220,
                             //     fontSize: theme.typography.pxToRem(13),
                             //     border: `1px solid ${theme.palette.action.disabledBackground}`,
                             // }
                         }
                     }}
                     placement="bottom-end"
                     TransitionComponent={Zoom}
                     TransitionProps={{timeout: 600}}
                     followCursor
            >
                {itemToolltipHandle}
            </Tooltip>
        );
    } else {
        return itemToolltipHandle;
    }
};

export default SidebarItem;
