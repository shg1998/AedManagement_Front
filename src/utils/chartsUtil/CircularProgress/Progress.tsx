import * as React from "react";
import PropTypes from "prop-types";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useThemeContext } from "../../../ThemeContext";

const useStyles = makeStyles((theme: Theme) => ({
  mainBox: {
    width: "100px",
    height: "100px",
    cursor: "pointer",
  },
  label: {
    fill: `${theme.palette.text.primary} !important`,
    fontSize: "small",
  },
}));
function CircularProgressWithLabel(props: any) {
  let pct = cleanPercentage(props.value);
  const { theme } = useThemeContext();

  const classes = useStyles();

  return (
    <Box className={classes.mainBox} onClick={props.onCategoryClick}>
      <svg width={100} height={100}>
        <g transform={`rotate(-90 ${"100 100"})`}>
          <Circle colour={theme.palette.progressChart.main} />
          <Circle colour={props.color} percentage={pct} />
        </g>
        <text
          x="50%"
          y="45%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={"1em"}
          style={{ color: theme.palette.progressChart.light }}
          className={classes.label}
        >
          {pct < 1 ? pct.toFixed(2) : pct.toFixed(0)}%
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={"small"}
          className={classes.label}
          style={{ fontSize: "small" }}
        >
          {props.label}
        </text>
      </svg>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Progress(props: any) {
  const [progress, setProgress] = React.useState(props.value);
  //@ts-ignore
  return (
    <CircularProgressWithLabel
      value={props.value}
      //@ts-ignore
      label={props.label}
      total={props.total}
      color={props.color}
      onCategoryClick={props.onCategoryClick}
    />
  );
}

const cleanPercentage = (percentage: any) => {
  let isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  let isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage }: any) => {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={150}
      cy={50}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"0.6rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};
