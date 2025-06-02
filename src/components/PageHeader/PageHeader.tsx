import * as React from "react";
import {Typography} from "@mui/material";
import {useThemeContext} from "../../ThemeContext";
import {ReactNode} from "react";

const PageHeader: React.FC<{ title: ReactNode | string }> = ({title}) => {
    const {themeMode} = useThemeContext();

    return (
        <div className="page-header-container">
            <Typography sx={{direction: 'ltr !important'}} className={`page-header-${themeMode}`}>{title}</Typography>
        </div>
    );
};
export default PageHeader;
