import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  BgContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowY: "hidden",
    padding: "0 16px 24px 16px",
    paddingTop: 0,
  },
  logoContainer: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: "1.2em",
    lineHeight: "32px",
  },
  fontCustum: {
    fontSize: "0.9em",
  },
  footerContainer: {
    display: "flex",
  },
  footer: {
    display: "flex",
  },
  rememberContainer: {
    fontSize: "1em",
    marginLeft: "-10px",
  },
  createNewPassword: {
    marginLeft: "5px",
    fontSize: "1em",
    color: theme?.palette?.text?.primary,
  },
  formContainer: {
    direction: "rtl",
    width: "100%",
    paddingTop: "20px",
  },
  inputLabel: {
    left: "auto",
    marginTop: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1em",
  },

  errorText: {
    fontSize: "0.8em",
    marginBottom: "10px",
  },
  errorBorder: {
    border: "1px solid red",
    borderRadius: "10px",
  },
  mainContainer: {
    padding: "8px",
  },
  entityTimeFilter: {
    color: "green !important",
    border: "1px solid green !important",
    height: "30px !important",
    marginLeft: "20px !important",
  },
  middleButtons: {
    border: "1px solid #4156A6",
    height: "85%",
    width: "15%",
    borderRadius: "0px !important",
    borderLeft: "none",
  },
  lastButton: {
    border: "1px solid #4156A6",
    height: "85%",
    width: "15%",
    borderRadius: "5px 0 0 5px !important",
  },
  firstButton: {
    border: "1px solid #4156A6",
    height: "85%",
    width: "15%",
    borderRadius: "0 5px 5px 0 !important",
    borderLeft: "none",
  },
}));
