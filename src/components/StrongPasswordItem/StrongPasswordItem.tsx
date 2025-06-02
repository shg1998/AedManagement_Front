import React from "react";
import chechmarkImage from "../../assets/images/Checkmark Circle.png";
import dismissImage from "../../assets/images/Dismiss Circle.png";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
interface StrogPassItemProps {
  isPassed: boolean | null;
  text: number;
}
const useStyles = makeStyles((theme:Theme) =>
  ({
    container: {
      display: "flex",
      margin: "10px 10px",
    },
    itemText: {
      fontSize: "0.9em",
      color:theme.palette.text.primary,
    },
    logoContainer: { width: 25 },
  })
);
const StrongPasswordItem: React.FC<StrogPassItemProps> = ({
  isPassed,
  text,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      {isPassed != null && (
        <div className={classes.logoContainer}>
          {isPassed ? (
            <img alt="sata_logo" src={chechmarkImage} />
          ) : (
            <img alt="sata_logo" src={dismissImage} />
          )}
        </div>
      )}
      <Typography className={classes.itemText}>
        {t(`login.strongPass${text}`)}
      </Typography>
    </div>
  );
};

export default StrongPasswordItem;
