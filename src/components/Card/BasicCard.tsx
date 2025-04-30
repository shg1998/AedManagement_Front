import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Divider, Typography, alpha } from "@mui/material";
import { PropsWithChildren } from "react";
import styles from "./BasicCard.module.scss";
import { useThemeContext } from "../../ThemeContext";
interface CardProps {
  header?: string;
  headerChildren?: React.ReactElement;
  className?: string;
}

const BasicCard = (props: PropsWithChildren<CardProps>) => {
  const { header, children, className, headerChildren } = props;
  const { theme } = useThemeContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card
        className={className}
        sx={{
          flexGrow: 1,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.card.contrastText}`,
          boxShadow: `0px 4px 10px ${alpha(
            `${theme.palette.card.main}`,
            0.05
          )}`,
        }}
      >
        <CardHeader
          title={
            <div className={styles.cardHeader}>
              <Typography
                style={{
                  fontFamily: "sans-serif",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "1em",
                }}
              >
                {header}
              </Typography>
              {headerChildren}
            </div>
          }
          style={{ direction: "rtl" }}
        ></CardHeader>
        <Divider style={{ borderColor: theme.palette.card.contrastText }} />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "fit-content",
          }}
        >
          {children}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

export default BasicCard;
