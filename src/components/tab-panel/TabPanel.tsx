import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  const matches = useMediaQuery('(max-width:899px)');
  return (
    <Typography
      component="div"
      // sx={{p:3}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tab-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {<Box py={3} px={!matches ? 3 : 0}>{children}</Box>}
    </Typography>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
