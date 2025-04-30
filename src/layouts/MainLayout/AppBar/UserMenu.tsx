import React, {useRef} from "react";
import {Menu, MenuItem, ListItemIcon} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAuthDispatch} from "../../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
    useCurrentUserDispatch,

} from "../../../context/CurrentUserContext";
import {useQueryClient} from "react-query";
import Account from "../../../services/Account";
import {tSuccess} from "../../../utils/toast";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import {useThemeContext} from "../../../ThemeContext";

interface UserMenuProps {
    anchorElUser: null | HTMLElement;
    setAnchorElUser: (arg: null | HTMLElement) => void;
}

const UserMenu: React.FC<UserMenuProps> = (props) => {
    const {anchorElUser, setAnchorElUser} = props;
    const {t} = useTranslation();
    const AuthDispatch = useAuthDispatch();
    const queryClient = useQueryClient();
    const currentUserDispatch = useCurrentUserDispatch();
    const handleClose = (): void => setAnchorElUser(null);

    const {toggleTheme, themeMode, theme} = useThemeContext();

    const logout = async () => {

        tSuccess("You have successfully logged out. You will be redirected to the login page shortly!")
        setTimeout(() => {
            localStorage.removeItem("mainToken");
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
                <MenuItem onClick={() => logout()} className="txt-sm">
                    <ListItemIcon>
                        <ExitToAppIcon/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            {/*{userDetailedOpen && currentUserInfo?.id !== 0 && (*/}
            {/*  <UserDetails*/}
            {/*    infoMode={false}*/}
            {/*    userId={currentUserInfo?.id}*/}
            {/*    open={userDetailedOpen}*/}
            {/*    handleCancel={handleCloseDetailedUser}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{userChangePassOpen && (*/}
            {/*  <LeftModal*/}
            {/*    title={t("users.changePass")}*/}
            {/*    open={userChangePassOpen}*/}
            {/*    maxWidth={"md"}*/}
            {/*    handleClose={() => {*/}
            {/*      setChangePassOpen(false);*/}
            {/*    }}*/}
            {/*    handleAdd={submitChangeUserPass}*/}
            {/*    buttonLabel={t("general.confirmation").toString()}*/}
            {/*  >*/}
            {/*    <ChangeUserPassword ref={changePasswordRef} />*/}
            {/*  </LeftModal>*/}
            {/*)}*/}
        </>
    );
};

export default UserMenu;
