import Dropdown from "react-multilevel-dropdown";
import * as React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface MultiLevelDropDownProps {
  fields: any;
  handleClick: (e: any) => void;
  fieldTitle: any;
}
const useStyles = makeStyles((theme: Theme) => ({
  dropdownBut: {
    // maxWidth: "500px",
    minWidth: "450px",
    backgroundColor: "white !important",
    height: "30px !important",
    border: `2px solid ${theme.palette.primary.dark} !important`,
    borderRadius: "0.5rem!important",
  },
  listItem: {
    color: `${theme.palette.primary.dark} !important`,
    fontWeight: "bold",
  },
  dropDownCls: {
    maxHeight: "9000px",
    // height: "auto",
    // overflowY: "scroll",
    // position: "absolute",
  },
}));

const MultiLevelDropDown: React.FC<MultiLevelDropDownProps> = ({
  fields,
  handleClick,
  fieldTitle,
}) => {
  // for closing Dropdown
  const dropDownRef = React.useRef<any>(null);
  const { dropdownBut, listItem, dropDownCls } = useStyles();

  const generateSubmenu = (item: any, prefix: string) => {
    return (
      <Dropdown.Submenu position="right">
        <div className={dropDownCls}>
          {item?.children?.map((child: any) => {
            const handleChildItemClick = (childName: string) => {
              if (!child?.children) {
                handleClick(childName);
              }
            };
            return (
              <Dropdown.Item
                key={
                  prefix !== ""
                    ? prefix + "." + item.name + "." + child.name
                    : item.name + "." + child.name
                }
                onClick={() =>
                  handleChildItemClick(
                    prefix !== ""
                      ? prefix + "." + item.name + "." + child.name
                      : item.name + "." + child.name
                  )
                }
              >
                {child?.name}
                {child?.children &&
                  generateSubmenu(
                    child,
                    prefix != "" ? prefix + "." + item.name : item.name
                  )}
              </Dropdown.Item>
            );
          })}
        </div>
      </Dropdown.Submenu>
    );
  };

  return (
    <Dropdown
      position="right"
      ref={dropDownRef}
      buttonClassName={dropdownBut}
      title={fieldTitle}
      menuClassName={dropDownCls}
    >
      {fields &&
        fields?.map((item: any) => {
          const handleItemClick = (itemName: string) => {
            if (!item?.children) handleClick(itemName);
          };
          return (
            <Dropdown.Item
              className={item?.name === "x_related_objects" ? listItem : ""}
              key={item.name}
              onClick={() => handleItemClick(item.name)}
            >
              {item?.name}
              {item?.children && generateSubmenu(item, "")}
            </Dropdown.Item>
          );
        })}
    </Dropdown>
  );
};

export default MultiLevelDropDown;
