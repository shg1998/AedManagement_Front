import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItems from "./ListItems";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useThemeContext} from "../../../ThemeContext";
import {NavigationLeft} from "../../../components/NavigationIcon/NavigationLeft";
import {NavigationRight} from "../../../components/NavigationIcon/NavigationRight";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

const listItemsGenerator = (): any => {
    return (
        <div style={{overflowX: "hidden"}}>
            <ListItems/>
        </div>
    );
};

const SideBar: React.FC<{ setSidebarOpen: any }> = ({setSidebarOpen}) => {
    const storedValue = sessionStorage.getItem("openSidebar");
    const [isOpenSidebar, setIsopen] = useState(storedValue === "true");
    const matches = useMediaQuery("(max-width:899px)");
    const handleDrawerClose = () => {
        setIsopen(false);
        setSidebarOpen(false);
        sessionStorage.setItem("openSidebar", "false");
    };
    const handleDrawerOpen = () => {
        if (!matches) {
            sessionStorage.setItem("openSidebar", "true");
            setIsopen(true);
            setTimeout(() => {
                setSidebarOpen(true);
            }, 500);
        }
    };
    const {theme} = useThemeContext();
    return (
        <Drawer
            sx={{
                "& .MuiDrawer-paper": {
                    marginTop: "55px",
                    width: isOpenSidebar ? "240px" : "60px",
                    maxHeight: " calc(100% - 60px)",
                    transition: "width 0.5s ease",
                    background: theme.palette.background.default,
                },
                marginTop: "55px",
                minWidth: "40px",
                maxWidth: "240px",
                width: isOpenSidebar ? "240px" : "60px",
                transition: "width 0.5s ease",
                maxHeight: " calc(100% -60px)",
            }}
            variant="permanent"
            anchor="left"
            open={isOpenSidebar}
        >
            <DrawerHeader style={{justifyContent: "left", marginLeft: "5px"}}>
                {isOpenSidebar ? (
                    <IconButton onClick={handleDrawerClose}>
                        <NavigationRight/>
                    </IconButton>
                ) : (
                    <IconButton onClick={handleDrawerOpen}>
                        <NavigationLeft/>
                    </IconButton>
                )}
            </DrawerHeader>
            <Divider/>
            <PerfectScrollbar>
                <List style={{justifyContent: "left"}}>{listItemsGenerator()}</List>
            </PerfectScrollbar>
        </Drawer>
    );
};

export default SideBar;
