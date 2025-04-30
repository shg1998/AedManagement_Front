import { Item, Menu, Separator } from "react-contexify";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Styles from "./IdentitiesContextMenu.module.scss";

// @ts-ignore
const IdentitiesContextMenu = ({ id, handleItemClick }) => {
  return (
    <>
      <Menu
        className={Styles.menuReactContextify}
        id={id}
        style={{ direction: "rtl", textAlign: "right" }}
      >
        <Item id={"delete"} onClick={handleItemClick}>
          <DeleteIcon color={"error"} />
          <span style={{ marginRight: "2px" }}>حذف موجودیت</span>
        </Item>

        <Separator />

        <Item id={"copy-id"} onClick={handleItemClick}>
          <ContentCopyIcon color={"primary"} />
          <span style={{ marginRight: "2px" }}>کپی کردن شناسه</span>
        </Item>

        <Separator />

        <Item id={"open-details-in-new-tab"} onClick={handleItemClick}>
          <LaunchIcon color={"primary"} />
          <span style={{ marginRight: "2px" }}>مشاهده جزئیات در صفحه جدید</span>
        </Item>
      </Menu>
    </>
  );
};

export default IdentitiesContextMenu;
