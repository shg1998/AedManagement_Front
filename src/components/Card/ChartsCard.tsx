import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  CardActions,
  CardHeader,
  Divider,
  Theme,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { makeStyles } from "@mui/styles";
import { useThemeContext } from "../../ThemeContext";

const useStyles = makeStyles((theme: Theme) => ({
  cardStyle: {
    minWidth: "100%",
    boxShadow: "none",
    p: 0,
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
}));
interface CardProps {
  header: string;
  // headerChildren: React.ReactElement;
  style?: React.CSSProperties; // Add the style prop
  headerAction?: any;
  footerAction?: () => void;
  footerActionTitle?: string;
}

const ChartsCard = (props: PropsWithChildren<CardProps>) => {
  const {
    header,
    children,
    style,
    headerAction,
    footerAction,
    footerActionTitle,
  } = props;
  const classes = useStyles();
  const { theme } = useThemeContext();
  return (
    <Card
      className={classes.cardStyle}
      sx={style ? style : { height: "500px" }}
    >
      <CardHeader
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
                fontSize: "0.9em",
                color: theme.palette.text.primary,
              }}
            >
              {header}
            </Typography>
            {/* <Button
            //  onClick={handleOpen}
            >
              فیلتر پیشرفته
            </Button> */}
            {headerAction}
          </div>
        }
        style={{ direction: "rtl" }}
      ></CardHeader>
      <Divider style={{ borderColor: theme.palette.card.contrastText }} />
      <CardContent
        style={{
          paddingBottom: "24px",
          alignItems: "inherit",
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
        }}
        sx={{ p: "2%" }}
      >
        {children}
      </CardContent>
      <CardActions>
        <Button
          style={{
            display: "contents",
            position: "absolute",
            cursor: "pointer",
            color: theme.palette.text.primary,
          }}
          size="small"
          onClick={footerAction}
        >
          {footerActionTitle}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChartsCard;
