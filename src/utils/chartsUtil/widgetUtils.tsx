import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import WidgetCard from "../../components/Card/WidgetCard";
import { Box, Link, Typography, useTheme, Theme } from "@mui/material";
import { ReactComponent as RedLineChart } from "../../assets/images/WidgetIcons/redLineChart.svg";
import { ReactComponent as GreenLineChart } from "../../assets/images/WidgetIcons/greenLineChart.svg";
import { ReactComponent as RedArrow } from "../../assets/images/WidgetIcons/redArrow.svg";
import { ReactComponent as GreenArrow } from "../../assets/images/WidgetIcons/greenArrow.svg";
import { useNavigate } from "react-router-dom";
import { FormatQueryOptions, RuleGroupType } from "react-querybuilder";
import routes from "../../routes/routes";
import { formatQuery } from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";

interface Props {
  drillDownRoute?: string;
  drillDownTab?: any;
  from_version?: string;
  to_version?: string;
  title: string;
  number: number;
  difference1: number;
  percentTitle?: string;
  drillDownQuery?: FormatQueryOptions;
  senderID?: string;
  x_organizationSenderID?: string;
  dateTimeTypeNumber?: number;
  has_spec_drillDownQuery?: boolean;
}
const useStyles = makeStyles((theme: Theme) => ({
  numberWidget: {
    position: "absolute",
    width: 324,
    height: 140,
    left: 1052,
    top: 226,
    background: "#FFFFFF",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  chartContainer: {
    flex: 1,
    marginRight: 20,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    maxWidth: "250px",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  number: {
    fontSize: "2rem !important",
    textAlign: "right",
    color: theme.palette.card.main,
  },
  title: {
    fontWeight: 700,
    fontSize: "0.9rem",
    color: theme.palette.card.dark,
    whiteSpace: "nowrap",
    width: "100%",
  },
  differeceText: {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.card.light,
    width: "calc(100% )",
    whiteSpace: "nowrap",
  },
  "@media (max-width: 580px)": {
    title: {
      fontSize: "0.6rem",
      whiteSpace: "normal",
    },
    differeceContainer: {
      flexWrap: "wrap",
    },
    differeceText: {
      fontSize: "0.6rem",
      whiteSpace: "normal",
    },
  },
  "@media (max-width: 600px)": {},
  container: {
    display: "flex",
    flexDirection: "row",
    rowGap: "8px",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    rowGap: "4px",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    width: "100%",
  },
  rightItems: {
    display: "flex",
    flexDirection: "column",
    columnGap: "0px",
    padding: 0,
    justifyContent: "space-between",
  },
  differeceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    columnGap: "4px",
  },
  differeceStyleInc: {
    fontWeight: 700,
    fontSize: "1rem",
    color: "#DC0000",
    direction: "initial",
  },
  differeceStyleDec: {
    fontWeight: 700,
    fontSize: "1rem",
    color: "#00AC46",
  },
  link: {
    textAlign: "left",
    "&:hover": {
      "& $number": {
        color: "#1976d2",
      },
    },
  },
}));

const NumberWidget: React.FC<Props> = ({
  drillDownRoute,
  drillDownTab,
  from_version,
  to_version,
  title,
  number,
  difference1,
  percentTitle,
  drillDownQuery,
  senderID,
  has_spec_drillDownQuery,
  dateTimeTypeNumber,
  x_organizationSenderID,
}) => {
  useEffect(() => {
    if (drillDownQuery) {
      localStorage.setItem("drillDownQuery", JSON.stringify(drillDownQuery));
    }
  }, [drillDownQuery]);

  const navigate = useNavigate();
  const classes = useStyles();

  function handleClick() {
    //let storedDrillDownQuery:any = localStorage.getItem("drillDownQuery");

    let queryBuilderFormatDrillDown: any = "";

    if (senderID || x_organizationSenderID) {
      if (has_spec_drillDownQuery) {
        queryBuilderFormatDrillDown = {
          combinator: "and",
          rules: [
            {
              field: x_organizationSenderID ? "x_organization" : "sender.id",
              operator: "=",
              value: x_organizationSenderID ? x_organizationSenderID : senderID,
            },
            {
              field: "has_reported_vulnerabilities",
              operator: "=",
              value: true,
            },
          ],
        };
      } else {
        queryBuilderFormatDrillDown = {
          combinator: "and",
          rules: [
            {
              field: x_organizationSenderID ? "x_organization" : "sender.id",
              operator: "=",
              value: x_organizationSenderID ? x_organizationSenderID : senderID,
            },
          ],
        };
      }
    } else if (has_spec_drillDownQuery) {
      queryBuilderFormatDrillDown = {
        combinator: "and",
        rules: [
          {
            field: "has_reported_vulnerabilities",
            operator: "=",
            value: true,
          },
        ],
      };
    }

    let drillDownQuery = "";
    if (queryBuilderFormatDrillDown) {
      drillDownQuery = formatQuery(queryBuilderFormatDrillDown, {
        format: "sql",
        parseNumbers: true,
      });
    }

    if (drillDownRoute) {
      navigate(drillDownRoute, {
        state: {
          tab: drillDownTab,
          from_version: from_version,
          to_version: to_version,
          dateTimeTypeNumber: 5,
        },
      });
    }
  }
  return (
    <WidgetCard>
      <Box className={classes.rightItems}>
        <div className={classes.innerContainer}>
          <div className={classes.rightItems}>
            <Typography className={classes.title}>{title}</Typography>
            {drillDownRoute && number !== 0 ? (
              <Link
                underline="none"
                component="button"
                onClick={handleClick}
                className={classes.link}
              >
                <Typography className={classes.number}>{number}</Typography>
              </Link>
            ) : (
              <Typography className={classes.number}>{number}</Typography>
            )}
          </div>
          <div style={{ direction: "ltr" }}>
            {difference1 > 0 ||
            difference1 === 0 ||
            difference1 === undefined ? (
              <GreenLineChart style={{ width: "80%" }} />
            ) : (
              <RedLineChart style={{ width: "100%" }} />
            )}
          </div>
        </div>

        {difference1 !== undefined && difference1 !== null && (
          <div className={classes.differeceContainer}>
            {difference1 > 0 || difference1 === 0 ? (
              <GreenArrow />
            ) : (
              <RedArrow />
            )}
            {difference1 > 0 || difference1 === 0 ? (
              <Typography className={classes.differeceStyleDec}>
                {difference1}%
              </Typography>
            ) : (
              <Typography className={classes.differeceStyleInc}>
                {difference1}%
              </Typography>
            )}
            <Typography className={classes.differeceText}>
              {percentTitle}
            </Typography>
          </div>
        )}
      </Box>
    </WidgetCard>
  );
};

export default NumberWidget;
