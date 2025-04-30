import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = ["CSV", "JSON", "TXT", "XML"];

interface MenueProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (a: null | HTMLElement) => void;
  itemClicked: (format: string) => void;
}
const MyMenu: React.FC<MenueProps> = ({
  anchorEl,
  setAnchorEl,
  itemClicked,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    itemClicked(
      //@ts-ignore
      event.target.innerText !== "CSV" ? event.target.innerText : "table.csv"
    );
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default MyMenu;
