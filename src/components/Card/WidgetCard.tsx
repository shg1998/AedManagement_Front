// import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { PropsWithChildren } from "react";
import { Box, Theme, alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  cardStyle: {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.card.contrastText}`,
    boxShadow: `0px 4px 10px ${alpha(`${theme.palette.card.main}`, 0.05)}`,
    borderRadius: "20px",
    direction: "rtl",
    height: "100%",
    padding: "24px 4px 0 4px",
    "& path": {
      // color: "white",
      minWidth: "unset !important",
      // fill: "#ffffff",
    },
  },
}));

const WidgetCard = (props: PropsWithChildren) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Box className={classes.cardStyle}>
      <CardContent>{children}</CardContent>
    </Box>
  );
};
export default WidgetCard;
