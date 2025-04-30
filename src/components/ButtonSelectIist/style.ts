import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  selectButtonStyle: {
    marginTop: "20px",
    alignItems: "center",
    padding: "0 12px",
    width: "fit-content",
    height: "40px",
    borderRadius: "10px",
    background: theme.palette.background.default,
    border: "1px solid #EDEBE9",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0px 0.3px 0.9px rgba(255, 255, 255, 0.2), 0px 1.6px 3.6px rgba(255, 255,255, 0.13)"
        : "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)",
  },
  selectButtonText: {
    fontStyle: "normal",
    fontWight: 500,
    fontSize: "14px",
    textAlign: "center",
    color: theme.palette.text.primary,
    /* Inside auto layout */
  },
  modalStyle: {
    minHeight: "100%",
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    top: "0",
    left: "0",
    backgroundColor: theme.palette.backTabs.main,
    padding: "20px",
  },
  listStyle: {
    height: "100%",
    overflowY: "auto",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
  listItemStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    direction: "rtl",
    width: "100%",
    height: "40px",
    backgroundColor: theme.palette.grayP.dark,
    borderRadius: "4px",
    padding: "4px",
  },
  recycle: {
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
}));
