import * as React from "react";
import {Theme, Typography} from "@mui/material";
import {PropsWithChildren} from "react";
import {Button} from "@mui/base";
import {makeStyles} from "@mui/styles";
import uploadIcon from "../../assets/images/upload.png";
import addIcon from "../../assets/images/plusIcon.png";
import AccessControl from "../AccessControl/AccessControl";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "0.5rem",
    },
    title: {
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "white",
        padding: "8px 12px",
        fontSize: "0.65em",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
        },
    },
    title2: {
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "5px",
        color: "white",
        border: "none",
        fontSize: "0.65em",
        padding: "8px 12px",
        marginLeft: "1vw",
        cursor: "pointer",

        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },

    title3: {
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        border: "1px solid lightGray",
        fontSize: "0.65em",
        padding: "8px 12px",
        marginLeft: "1vw",
    },

    text: {
        fontSize: "0.9em",
        marginRight: "5px !important",
    },
}));

interface CardTopActionsProps {
    firstTitle?: string;
    firstAction?: () => void;
    first_section_name?: string;
    first_module_name?: string;
    first_access?: string;

    secondTitle?: string;
    secondAction?: () => void;
    second_section_name?: string;
    second_module_name?: string;
    second_access?: string;

    thirdTitle?: string;
    thirdAction?: () => void;
    third_section_name?: string;
    third_module_name?: string;
    third_access?: string;
    addImageNeeded?: boolean;
}

const CardTopActions = (props: PropsWithChildren<CardTopActionsProps>) => {
    const {
        firstTitle,
        firstAction,
        first_section_name,
        first_module_name,
        first_access,

        secondTitle,
        secondAction,
        second_section_name,
        second_module_name,
        second_access,

        thirdTitle,
        thirdAction,
        third_section_name,
        third_module_name,
        third_access,
        addImageNeeded = true
    } = props;
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.buttonContainer}>
            {location?.pathname !== "/advanceSearch" && firstTitle ? (
                <AccessControl
                    section_name={first_section_name}
                    module_name={first_module_name}
                    access={first_access}
                >
                    <Button className={classes.title} onClick={firstAction}>
                        <img alt="" src={uploadIcon}/>
                        <Typography className={classes.text}>{firstTitle}</Typography>
                    </Button>
                </AccessControl>
            ) : null}
            {location?.pathname !== "/advanceSearch" && secondTitle ? (
                <AccessControl
                    section_name={second_section_name}
                    module_name={second_module_name}
                    access={second_access}
                >
                    <Button className={classes.title2} onClick={secondAction}>
                        {
                            addImageNeeded && <img alt="" src={addIcon}/>
                        }
                        <Typography className={classes.text}>{secondTitle}</Typography>
                    </Button>
                </AccessControl>
            ) : null}
            {location?.pathname !== "/advanceSearch" && thirdTitle ? (
                <AccessControl
                    section_name={third_section_name}
                    module_name={third_module_name}
                    access={third_access}
                >
                    <Button className={classes.title2} onClick={thirdAction}>
                        <ManageSearchIcon/>
                        <Typography className={classes.text}>{thirdTitle}</Typography>
                    </Button>
                </AccessControl>
            ) : null}
        </div>
    );
};
export default CardTopActions;
