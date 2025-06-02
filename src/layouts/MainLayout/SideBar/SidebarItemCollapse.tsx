import {
  Collapse,
  List,
  ListItemIcon,
  Typography,
  ListItem,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "./SidebarItem";
import { ListItemInterface } from "../../../interfaces";
import { Link } from "react-router-dom";
import { useStyles } from "./style";
import { ChevronLeft } from "@mui/icons-material";
import MyHoverMenu from "../../../components/MyHoverMenu/MyHoverMenu";
import AccessControl from "../../../components/AccessControl/AccessControl";
import { useThemeContext } from "../../../ThemeContext";
type Props = {
  item: ListItemInterface;
  sidebarOpen?: boolean;
};

const SidebarItemCollapse = ({ item, sidebarOpen }: Props) => {
  const {
    notNested,
    menuItemText,
    selectedMenuItemText,
    menuItemIcon,
    selectedMenuItemIcon,
  } = useStyles();
  let currentlyHovering = false;

  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false); // just for hover style
  const { theme } = useThemeContext();

  function handleNormalClick(event: React.MouseEvent<HTMLElement>) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    setIsHovered(true);
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNormalCloseHover() {
    currentlyHovering = false;
    setIsHovered(false);

    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 0);
  }

  function handleHoverableClick(event: React.MouseEvent<HTMLElement>) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function onItemClick() {
    setAnchorEl(null);
  }

  const Icon = item?.Icon;
  const generateListItem = () => {
    return (
      <ListItem
        style={{
          minWidth: "100%",
          borderRight: item.children.some(
            (child: ListItemInterface) => child.selected === true
          )
            ? `4px solid ${theme.palette.primaryColor.dark}`
            : `4px solid ${theme.palette.secondary.main}`,
          backgroundColor: item.children.some(
            (child: ListItemInterface) => child.selected === true
          )
            ? theme.palette.primaryColor.light
            : theme.palette.secondary.main,

          justifyContent: "right",
          display: "flex",
          height: "45px",
          marginTop: "2px",
          marginBottom: "2px",
          //transition: "background-color 0.5s, color 0.5s", // Add transition for color and background-color

          ...(isHovered && {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primaryColor.light,
          }),
        }}
        onClick={sidebarOpen ? () => setOpen(!open) : handleHoverableClick}
        onMouseOver={sidebarOpen ? undefined : handleNormalClick}
        onMouseLeave={sidebarOpen ? undefined : handleNormalCloseHover}
      >
        <Link
          to={item.link}
          className={notNested}
          style={{
            minWidth: "100%",
            height: item.selected ? "129%" : "",
          }}
        >
          <ListItemIcon style={{ minWidth: "100% !important" }}>
            <div style={{ display: "flex", minWidth: "100% !important" }}>
              {Icon && (
                <Icon
                  className={
                    item.children.some(
                      (child: ListItemInterface) => child.selected === true
                    ) || isHovered
                      ? selectedMenuItemIcon
                      : menuItemIcon
                  }
                  style={{ fontSize: "1.2em" }}
                />
              )}
              {sidebarOpen && (
                <div
                  style={{
                    display: "flex",
                    minWidth: "100% !important",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Typography
                    style={{
                      fontSize: "1rem",
                      marginRight: "5px",
                      //transition: " color 0.5s",
                      ...(isHovered && {
                        color: theme.palette.primary.main,
                      }),
                    }}
                    className={
                      item.children.some(
                        (child: ListItemInterface) => child.selected === true
                      )
                        ? selectedMenuItemText
                        : menuItemText
                      //   item.selected ? selectedMenuItemText : menuItemText
                    }
                  >
                    {item.text}
                  </Typography>
                  {sidebarOpen && open ? (
                    <ExpandMoreOutlinedIcon
                      style={{
                        color: item.children.some(
                          (child: ListItemInterface) => child.selected === true
                        )
                          ? theme.palette.primary.main
                          : isHovered
                          ? theme.palette.primary.main
                          : theme.palette.textGray.main,
                      }}
                    />
                  ) : (
                    <ChevronLeft
                      style={{
                        color: item.children.some(
                          (child: ListItemInterface) => child.selected === true
                        )
                          ? theme.palette.primary.main
                          : isHovered
                          ? theme.palette.primary.main
                          : theme.palette.textGray.main,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </ListItemIcon>
        </Link>
      </ListItem>
    );
  };
  return (
    <>
      {generateListItem()}

      {sidebarOpen ? (
        <Collapse
          in={open}
          timeout={{
            enter: 500,
            exit: 400,
          }}
          style={{
            // backgroundColor: "#ECEEF6",
            padding: "0",
            paddingBottom: "4px",
          }}
        >
          <List style={{ padding: "0", width: "100%" }}>
            {item.children?.map((child: any) => child?.access ? <>
                  <AccessControl
                      //key={child?.toString()}
                      key={child?.name + "0"}
                      section_name={`${child?.section}`}
                      module_name={`${child?.name}`}
                      access={`${child?.access}`}
                  >
                    <div
                        style={{
                          height: "45px",
                          margin: "2px",
                          paddingRight: "20px",
                          minWidth: "100%",
                        }}
                    >
                      <SidebarItem
                          item={child}
                          //key={child.toString()}
                          key={child?.name + "2"}
                          sidebarOpen={sidebarOpen}
                          isChild={true}
                      />
                    </div>
                  </AccessControl>
                </> : <>
                  <AccessControl
                      //key={child?.toString()}
                      key={child?.name + "0"}
                      section_name={`${child?.section}`}
                      module_name={`${child?.name}`}
                  >
                    <div
                        style={{
                          height: "45px",
                          margin: "2px",
                          paddingRight: "20px",
                          minWidth: "100%",
                        }}
                    >
                      <SidebarItem
                          item={child}
                          //key={child.toString()}
                          key={child?.name + "2"}
                          sidebarOpen={sidebarOpen}
                          isChild={true}
                      />
                    </div>
                  </AccessControl>
                </>

            )}
          </List>
        </Collapse>
      ) : (
        <MyHoverMenu
          anchorEl={anchorEl}
          handleClose={handleNormalCloseHover}
          handleCloseHover={handleNormalCloseHover}
          handleHover={handleHover}
          menuOptions={item.children?.map((child: any, index: number) =>
            child?.access ?
                <>
                  <AccessControl
                      section_name={`${child?.section}`}
                      module_name={`${child?.name}`}
                      access={`${child?.access}`}
                      //key={child?.name ?? index.toString()}
                      key={child?.name}
                  >
                    <SidebarItem
                        item={child}
                        //key={child.toString()}
                        key={child?.name + "1"}
                        sidebarOpen={sidebarOpen}
                        isChild={true}
                        onItemClick={onItemClick}
                    />
                  </AccessControl>
                </> : <AccessControl
                    section_name={`${child?.section}`}
                    module_name={`${child?.name}`}
                    //key={child?.name ?? index.toString()}
                    key={child?.name}
                >
                  <SidebarItem
                      item={child}
                      //key={child.toString()}
                      key={child?.name + "1"}
                      sidebarOpen={sidebarOpen}
                      isChild={true}
                      onItemClick={onItemClick}
                  />
                </AccessControl>

          )}
        />
      )}
    </>
  );
};

export default SidebarItemCollapse;
