import React from "react";
import { Menu } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useThemeContext } from "../../ThemeContext";

interface MyHoverMenuProps {
  menuOptions: any[];
  anchorEl: any;
  handleClose: () => void;
  handleHover: () => void;
  handleCloseHover: () => void;
}

const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none",
    top: "100%", // Position the sub-menu below the parent item
  },
});


function MyHoverMenu({
  menuOptions,
  anchorEl,
  handleClose,
  handleCloseHover,
  handleHover,
}: MyHoverMenuProps) {
  const styles = useStyles();
  const { theme } = useThemeContext();
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={anchorEl ? {display:'block'} : {display:'none'}}
      MenuListProps={{
        onMouseEnter: handleHover,
        onMouseLeave: handleCloseHover,
        style: {
          pointerEvents: "auto",
          background: theme.palette.background.default,
        },
      }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PopoverClasses={{ root: styles.popOverRoot }}
      // TransitionComponent={Fade}
      TransitionProps={{
        timeout: {
          enter: 700,
          exit: 500,
        },
      }}
    >
      {menuOptions}
    </Menu>
  );
}

export default MyHoverMenu;
