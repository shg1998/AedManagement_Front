import React, { CSSProperties } from "react";
import "./style.css";
import { Typography, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

export interface ModalPropsInterface {
  open: boolean;
  title: string;
  toggle: () => void;
  className?: any;
  zIndex?: number;
  style?: CSSProperties;
  maxWidth?: any;
  fullWidth?: boolean;
  fullScreen?: boolean;
  children?: any;
  onCancel?: any;
  onConfirm?: any;
}

const ModalRadar: React.FC<ModalPropsInterface> = (props) => {
  const {
    open,
    toggle,
    onCancel,
    onConfirm,
    children,
    title,
    maxWidth = "",
    fullWidth = true,
    fullScreen = false,
    className = "",
    zIndex,
    style = {},
  } = props;
  const { t } = useTranslation();

  const modalStyle = {
    content: {
      width: "90%",
      minWidth: "60%",
      // zIndex :8888,
      // overflowY:'hidden',
      ...style,
    },
    title: {
      color: "#444444",
      fontSize: "15px",
      fontFamily: "sans-serif",
      fontWeight: 700,
      overflow: "hidden",
      zIndex: 9999,
    },
    form: {
      padding: "40px",
      paddingBottom: "20px",
      overflow: "auto",
    },
    overlay: {
      zIndex: zIndex ?? 1250,
      backgroundColor: "rgba(0, 0, 0, .3)",
    },
    addButton: {
      alignSelf: "left",
      minWidth: "99.65px",
      height: "37px",
      borderRadius: "5px",
      // marginLeft: theme.spacing(2),
      background: "#21AD72",
      color: "white",
      boxShadow: "none",
      fontWeight: 500,
      width: "99.65px",
      "&:hover": {
        background: "rgba(33,173,114,0.5)",
        color: "white",
        boxShadow: "none",
      },
    },
    cancelBtn: {
      alignSelf: "left",
      minWidth: "50px",
      height: "37px",
      borderRadius: "5px",
      // marginLeft: theme.spacing(2),
      background: "#ffffff",
      color: "#444444",
      boxShadow: "none",
      fontWeight: 700,
      fontSize: "13px",
      width: "fit-content",
      padding: 0,
      "&:hover": {
        background: "transparent",
        color: "rgba(68,68,68,0.6)",
        boxShadow: "none",
      },
    },
  };

  // Notice: Maybe using of useCAllback method be a good solution rather this implmentation
  return (
    <Dialog
      open={open}
      onClose={toggle}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      // style={modalStyle.content}
      PaperProps={{ sx: { width: "100%" } }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography style={{ ...modalStyle.title }}>{title}</Typography>
      </DialogTitle>
      <DialogContent style={{ ...modalStyle.form }}>{children}</DialogContent>
      {(onCancel || onConfirm) && (
        <DialogActions style={{ margin: "24px" }}>
          {onCancel ? (
            <Button
              variant="contained"
              style={{ ...modalStyle.cancelBtn }}
              onClick={onCancel}
            >
              {t("general.cancel")}
            </Button>
          ) : null}

          {onConfirm ? (
            <Button
              type="submit"
              variant="contained"
              style={{ ...modalStyle.addButton }}
              onClick={onConfirm}
            >
              {t("general.confirm")}
            </Button>
          ) : null}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalRadar;
