import React, {useRef, useState} from "react";
import {Menu, MenuItem, ListItemIcon} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuthDispatch} from "../../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyIcon from '@mui/icons-material/Key';
import {
    useCurrentUserDispatch,

} from "../../../context/CurrentUserContext";
import {useQueryClient} from "react-query";
import {tSuccess} from "../../../utils/toast";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import {useThemeContext} from "../../../ThemeContext";
import LeftModal from "../../../components/Modal/LeftModal";
import UserChangePassword, {
    NewChangeUserPasswordHandle
} from "../../../containers/UserChangePassword/UserChangePassword";

interface UserMenuProps {
    anchorElUser: null | HTMLElement;
    setAnchorElUser: (arg: null | HTMLElement) => void;
}

const UserMenu: React.FC<UserMenuProps> = (props) => {
    const changePasswordRef = useRef<NewChangeUserPasswordHandle>(null);
    const {anchorElUser, setAnchorElUser} = props;
    const {t} = useTranslation();
    const AuthDispatch = useAuthDispatch();
    const queryClient = useQueryClient();
    const currentUserDispatch = useCurrentUserDispatch();
    const handleClose = (): void => setAnchorElUser(null);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const {toggleTheme, themeMode, theme} = useThemeContext();

    const logout = async () => {

        tSuccess("You have successfully logged out. You will be redirected to the login page shortly!")
        setTimeout(() => {
            localStorage.removeItem("mainToken");
            localStorage.removeItem("userRoleName");
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('/')) {
                    localStorage.removeItem(key);
                }
            }
            currentUserDispatch({type: "CLEAR"});
            AuthDispatch({type: "SIGN_OUT_SUCCESS"});
            queryClient.clear();
            window.location.replace(window.location.origin + "/login");
        }, 3000)
    };

    const handleChangePassword = async () => {
        changePasswordRef?.current?.sendRequest();
    }

    const handleCloseChangePasswordModal = () => {
        setOpenChangePassword(false);
    }

    return (
        <>
            <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                {/*{renderItems}*/}
                <MenuItem onClick={toggleTheme} className="txt-sm">
                    <ListItemIcon>
                        <IconButton sx={{padding: 0}} color="inherit">
                            {themeMode === "dark" ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </ListItemIcon>
                    {themeMode === "dark" ? "Light Mode" : "Night Mode"}
                </MenuItem>
                <MenuItem onClick={() => setOpenChangePassword(true)} className="txt-sm">
                    <ListItemIcon>
                        <KeyIcon/>
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <MenuItem onClick={() => logout()} className="txt-sm">
                    <ListItemIcon>
                        <ExitToAppIcon/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <LeftModal title={"Change Password"}
                       open={openChangePassword}
                       maxWidth={"sm"}
                       handleClose={handleCloseChangePasswordModal}
                       handleAdd={handleChangePassword}
                       buttonLabel={"Apply"}>
                <UserChangePassword closeModal={handleCloseChangePasswordModal} ref={changePasswordRef} />
            </LeftModal>
        </>
    );
};

export default UserMenu;
