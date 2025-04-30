import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Dialog, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../../ThemeContext";

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (arg?: any) => void;
  deleteId?: any;
  title: string;
  description: any;
  buttonLabel?: string;
  disableButton?: boolean;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  handleClose,
  handleConfirm,
  deleteId,
  title,
  description,
  buttonLabel,
  disableButton,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "start", marginRight: "0.5rem", gap: "0.5rem" }}
        >
          <Button
            color={"error"}
            variant={"contained"}
            disabled={disableButton}
            onClick={() => {
              if (deleteId === undefined) {
                handleConfirm();
              } else {
                handleConfirm(deleteId);
              }
            }}
          >
            {buttonLabel ? buttonLabel : "تایید"}
          </Button>
          <Button
            style={{
              border: `1px solid ${theme.palette.card.contrastText}`,
              color: theme.palette.text.primary,
            }}
            onClick={handleClose}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
