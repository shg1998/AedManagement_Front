import * as React from "react";
import Button from "@mui/material/Button";
import {Breakpoint, Theme, styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton/IconButton";
import {PropsWithChildren} from "react";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useThemeContext} from "../../ThemeContext";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
    position: "absolute",
}));
export const useStyles = makeStyles((theme: Theme) => ({
    actibeBut: {
        backgroundColor: `${theme?.palette?.primary?.main} !important`,
        color: "white !important",
        "&:hover": {
            backgroundColor: `${theme?.palette?.primary?.light} !important`,
            color: "white",
        },
        "& .MuiButtonBase-root": {
            fontWeight: 600,
        },
    },
    disabledButton: {
        opacity: 0.4,
        cursor: "not-allowed",
        color: "white !important",
        "& .MuiButtonBase-root": {
            fontWeight: 600,
            minWidth: "auto",
        },
    },
    cancelBut: {
        border: `1px solid ${theme?.palette?.card?.contrastText}  !important`,
        backgroundColor: `white !important`,
        color: `${theme?.palette?.primary?.main} !important`,

        "&:hover": {
            backgroundColor: `${theme?.palette?.primary?.light} !important`,
            color: `white !important`,
        },
        "& .MuiButtonBase-root": {
            fontWeight: 600,
        },
    },
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

interface ModalProps {
    open: boolean;
    title: string;
    maxWidth?: Breakpoint;
    fullScreen?: boolean;
    isNotLastTab?: boolean;
    buttonLabel?: string;
    handleClose: () => void;
    handleAdd?: () => void;
    withoutAction?: boolean;
    height?: string;
    leftPosition?: string;
    closeOutsideClicked?: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                minHeight: 60,
            }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme: any) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const LeftModal: React.FC<PropsWithChildren<ModalProps>> = ({
                                                                open,
                                                                title,
                                                                handleClose,
                                                                handleAdd,
                                                                isNotLastTab,
                                                                maxWidth,
                                                                fullScreen,
                                                                buttonLabel,
                                                                children,
                                                                withoutAction,
                                                                height,
                                                                leftPosition,
                                                                closeOutsideClicked,
                                                            }) => {
    const classes = useStyles();
    const matches = useMediaQuery("(max-width:899px)");
    const buttonClassNames = clsx(classes.actibeBut, {
        [classes.disabledButton]: isNotLastTab,
    });

    const handleCloseWithBackDrop = (event: {}, reason: string) => {
        // if (reason !== "backdropClick") {
        //
        // }
        handleClose();
    };
    const {theme} = useThemeContext();
    return (
        <div>
            <BootstrapDialog
                onClose={closeOutsideClicked ? handleClose : handleCloseWithBackDrop}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                fullScreen={matches ? true : fullScreen}
                sx={{height: "100%"}}
                style={{
                    backgroundColor: "rgba(255,255,255, 0.1)",
                    // backdropFilter: "blur(10px)",
                }}
                PaperProps={{
                    style: {
                        minHeight: height ? height : "100%",
                        position: "absolute",
                        right: leftPosition ? leftPosition : 0,
                        margin: "0",
                        // width: "50%",
                        alignSelf: "right",
                        // maxWidth: '30%'
                    },
                }}
                disableEscapeKeyDown
                maxWidth={maxWidth}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers style={{position: "relative"}}>
                    <div
                        style={{
                            backgroundColor: theme?.palette?.backTabs?.main,
                            position: "absolute",
                            top: 0,
                            left: 20,
                            bottom: 0,
                            right: 20,
                            overflow: "auto",
                        }}
                    >
                        {children}
                    </div>
                </DialogContent>
                {!withoutAction && (
                    <DialogActions
                        sx={{
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    >
                        <Button
                            className={classes.cancelBut}
                            onClick={handleClose}
                            data-testId={"closeModal"}
                            sx={{textTransform: 'none'}}
                        >
                            Cancel
                        </Button>
                        {
                            buttonLabel ? (
                                <Button
                                    className={buttonClassNames}
                                    onClick={handleAdd}
                                    disabled={isNotLastTab}
                                    data-testId={"addModal"}
                                    sx={{textTransform: 'none', mr: 1}}
                                >
                                    {buttonLabel ? buttonLabel : "Submit"}
                                </Button>
                            ) : <></>
                        }

                    </DialogActions>
                )}
            </BootstrapDialog>
        </div>
    );
};
export default LeftModal;
