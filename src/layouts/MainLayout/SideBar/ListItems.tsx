import React from "react";
import {List, Divider} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import routes from "../../../routes/routes";
import {useStyles} from "./style";
import {faListAlt} from "@fortawesome/free-solid-svg-icons";
import DvrIcon from '@mui/icons-material/Dvr';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {ListItemInterface} from "../../../interfaces";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import AccessControl from "../../../components/AccessControl/AccessControl";
import {useAuthState} from "../../../context/AuthContext";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';

const {
    aeds,
    users,
    admins,
    nonConformity,
    parts
} = routes;

/**
 * Detect hash string in url has item or not
 * @returns boolean
 */

const ListItems: React.FC = () => {
    const {linkWrapper, openSideLinkWrapper, sidebar, divider, menuContainer} =
        useStyles();
    const {isAdmin, isSuperAdmin} = useAuthState();
    const {t} = useTranslation();
    const storedValue = sessionStorage.getItem("openSidebar");
    const isOpenSidebar = storedValue === "true";

    const pageLocation = useLocation();
    const isOpenPageOfThisGroup = (urls: string): boolean => {
        const pathName = pageLocation.pathname;
        return pathName === urls || pathName === urls + "/";
    };
    /**
     * Create list of sidebar links with dynamic params
     * @returns JSX.Element
     */

    const getListItem = (params: ListItemInterface): React.JSX.Element => {
        return (
            <>
                {params?.children ? (
                    <AccessControl
                        section_name={`${params?.section}`}
                        module_name={`${params?.name}`}
                    >
                        <SidebarItemCollapse item={params} sidebarOpen={isOpenSidebar}/>
                    </AccessControl>
                ) : (
                    <AccessControl
                        section_name={`${params?.section}`}
                        module_name={`${params?.name}`}
                        getOnly={params?.getOnly}
                    >
                        <SidebarItem item={params} sidebarOpen={isOpenSidebar}/>
                    </AccessControl>
                )}
            </>
        );
    };

    const userMenu = (): React.JSX.Element => {
        return (
            <>
                <div className={menuContainer}>
                    <>
                        <List
                            component="div"
                            style={{padding: "0"}}
                            className={isOpenSidebar ? openSideLinkWrapper : linkWrapper}
                        >
                            {isSuperAdmin ?
                                getListItem({
                                    section: "undefined",
                                    name: "admins",
                                    Icon: AdminPanelSettingsIcon,
                                    text: 'Admins',
                                    selected: isOpenPageOfThisGroup(admins),
                                    link: admins,
                                    isNested: false,
                                    props: {
                                        icon: faListAlt,
                                        size: "lg",
                                    },
                                }) : (<></>)}

                            {isAdmin || isSuperAdmin ?
                                getListItem({
                                    section: "undefined",
                                    name: "users",
                                    Icon: GroupIcon,
                                    text: 'Users',
                                    selected: isOpenPageOfThisGroup(users),
                                    link: users,
                                    isNested: false,
                                    props: {
                                        icon: faListAlt,
                                        size: "lg",
                                    },
                                }) : (<></>)}

                            {isAdmin || isSuperAdmin ?
                                getListItem({
                                    section: "undefined",
                                    name: "nonConformity",
                                    Icon: ErrorOutlineIcon,
                                    text: 'NonConformity',
                                    selected: isOpenPageOfThisGroup(nonConformity),
                                    link: nonConformity,
                                    isNested: false,
                                    props: {
                                        icon: faListAlt,
                                        size: "lg",
                                    },
                                }) : (<></>)}

                            {isAdmin || isSuperAdmin ?
                                getListItem({
                                    section: "undefined",
                                    name: "parts",
                                    Icon: WidgetsIcon,
                                    text: 'Parts',
                                    selected: isOpenPageOfThisGroup(parts),
                                    link: parts,
                                    isNested: false,
                                    props: {
                                        icon: faListAlt,
                                        size: "lg",
                                    },
                                }) : (<></>)}

                            {getListItem({
                                section: "undefined",
                                name: "aeds",
                                Icon: DvrIcon,
                                text: 'AEDs',
                                selected: isOpenPageOfThisGroup(aeds),
                                link: aeds,
                                isNested: false,
                                props: {
                                    icon: faListAlt,
                                    size: "lg",
                                },
                            })}
                        </List>
                        <Divider className={divider}/>
                    </>
                </div>
            </>
        );
    };

    return <div className={sidebar}>{userMenu()}</div>;
};

export default ListItems;
