import * as React from "react";
import Button from "@mui/material/Button";
import { Breakpoint, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PropsWithChildren } from "react";
import { useStyles } from "./LeftModal";
import clsx from "clsx";
import { useThemeContext } from "../../ThemeContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  // Smooth transition animation
  "& .MuiDialog-paper": {
    transition: "transform 0.6s ease",
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
  confirmButtonTitle?: string;
  confirmSaveButtonTitle?: string;
  closeButtonTitle?: string;
  maxWidth?: Breakpoint;
  height?: string;
  handleClose: () => void;
  handleAdd?: () => void;
  handleSave?: () => void;
  handleReset?: () => void;
  customStyle?: any;
  isDisable?: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
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
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  title,
  confirmButtonTitle = "افزودن",
  confirmSaveButtonTitle = "ذخیره",
  closeButtonTitle = "انصراف",
  handleClose,
  handleAdd,
  handleSave,
  handleReset,
  maxWidth,
  children,
  height,
  customStyle,
  isDisable,
}) => {
  const classes = useStyles();
  const buttonClassNames = clsx(classes.actibeBut, {
    [classes.disabledButton]: isDisable,
  });
  const { theme } = useThemeContext();

  const handleCloseWithBackDrop = (event: {}, reason: string) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };
  return (
    <div
      style={{
        minHeight: "70%",
        maxHeight: "70%",
      }}
    >
      <BootstrapDialog
        onClose={handleCloseWithBackDrop}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        // sx={{ minHeight: "80%" }}
        maxWidth={maxWidth}
        style={{
          backgroundColor: "rgba(255,255,255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
        PaperProps={{
          style: {
            minHeight: height ? height : "70%",
          },
        }}
        disableEscapeKeyDown
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent
          style={customStyle ? customStyle : { padding: "16px", paddingTop: 0 }}
          dividers
        >
          <div
            style={{
              backgroundColor: theme.palette.backTabs.main,
              paddingTop: 0,
              minWidth: "100%",
            }}
          >
            {children}
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button className={classes.cancelBut} onClick={handleClose}>
            {closeButtonTitle}
          </Button>

          {handleSave && (
            <Button
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
              }}
              onClick={handleSave}
            >
              {confirmSaveButtonTitle}
            </Button>
          )}

          {handleAdd && (
            <Button
              className={buttonClassNames}
              onClick={handleAdd}
              disabled={isDisable}
            >
              {confirmButtonTitle}
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
export default Modal;
