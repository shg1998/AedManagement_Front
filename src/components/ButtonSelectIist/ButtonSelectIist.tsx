import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Divider, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LeftModal from "../../components/Modal/LeftModal";
import { ReactComponent as Recycle } from "../../../src/assets/images/publicIcons/recycle.svg";
import ListCheckBox from "../../components/ListCheckBox/ListCheckBox";
import { useStyles } from "./style";
import { useThemeContext } from "../../ThemeContext";

interface ListItemType {
  name: string;
  id: string;
}

interface ButtonSelectListProps {
  name: string;
  items: ListItemType[];
  title?: string;
  multiselect?: boolean;
  label: string;
  formik?: any;
  blur: () => void;
  values: ListItemType[];
  specificPropertyForList?: string;
}

const ButtonSelectList: React.FC<ButtonSelectListProps> = (props) => {
  const { name, items, title, label, formik, multiselect, blur, values } =
    props;

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ListItemType[]>(
    values ? values : []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item: ListItemType) => {
    if (multiselect) {
      if (selectedItems?.some((selectedItem) => selectedItem.id === item.id)) {
        setSelectedItems(
          selectedItems?.filter((selectedItem) => selectedItem.id !== item.id)
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([...[], item]);
    }
  };

  const handleConfirm = () => {
    blur();
    setIsOpen(false);
  };

  const handleCancel = () => {
    // setSelectedItems([...selectedItems]);
    setSelectedItems([...values]);
    setIsOpen(false);
  };

  const handleDeleteItem = (item: ListItemType) => {
    let newSelectedItems = selectedItems?.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems(newSelectedItems);
    let selectedIds = newSelectedItems?.map((item) => item.id);

    if (props.specificPropertyForList)
      Reflect.set(formik.values, props.specificPropertyForList, [
        ...selectedIds,
      ]);
    blur();
  };
  const { theme } = useThemeContext();

  const previousValuesRef = useRef();

  // useEffect(() => {
  //   // Compare against the previous values
  //   if (JSON.stringify(previousValuesRef.current) !== JSON.stringify(values)) {
  //     setSelectedItems(values);
  //   }
  //   // Update previous values ref
  //   //@ts-ignore
  //   previousValuesRef.current = values;
  // }, [values]);
  useEffect(() => {
    setSelectedItems(values);
  }, [values]);
  const getSelectedItems = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
          height: "100%",
          minWidth: "450px",
        }}
      >
        <Button
          startIcon={<AddIcon style={{ marginLeft: "10px" }} />}
          className={classes.selectButtonStyle}
          onClick={() => setIsOpen(true)}
        >
          <Typography className={classes.selectButtonText}>{label}</Typography>
        </Button>

        <FormControl>
          <List className={classes.listStyle}>
            {/* {selectedItems?.map((item) => ( */}
            {values?.map((item) => (
              <ListItem className={classes.listItemStyle} key={item?.id}>
                <ListItemSecondaryAction
                  style={{
                    left: "8px",
                    right: "auto",
                  }}
                >
                  <IconButton
                    style={{ alignSelf: "left" }}
                    aria-label="delete"
                    onClick={() => {
                      handleDeleteItem(item);
                    }}
                  >
                    <Recycle className={classes.recycle} />
                  </IconButton>
                </ListItemSecondaryAction>
                <span>{item?.name}</span>
              </ListItem>
            ))}
          </List>
        </FormControl>
      </div>
    );
  };

  const getChooseGroupsModal = () => {
    return (
      <LeftModal
        title={title || ""}
        open={isOpen}
        maxWidth={"sm"}
        handleClose={handleCancel}
        handleAdd={handleConfirm}
      >
        <div className={classes.modalStyle}>
          <TextField
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="جستجو"
          />
          <List
            style={{
              height: "100%",
              overflowY: "auto",
              marginTop: "40px",
              border: `1px solid ${theme.palette.grayP.main}`,
              padding: "0",
            }}
          >
            {filteredItems.map((item, index) => (
              <>
                <ListItem
                  key={item.id}
                  sx={{
                    borderTop: `1px solid ${theme.palette.grayP.main}`,
                    backgroundColor: selectedItems?.some(
                      (selectedItem) => selectedItem?.id === item?.id
                    )
                      ? "#ECEEF6"
                      : "inherit",
                    color: selectedItems?.some(
                      (selectedItem) => selectedItem?.id === item?.id
                    )
                      ? "black"
                      : "inherit",
                  }}
                >
                  <ListCheckBox
                    checked={
                      multiselect
                        ? selectedItems?.some(
                            (selectedItem) => selectedItem?.id === item?.id
                          )
                        : selectedItems?.[0]?.id === item?.id
                    }
                    onChange={() => {
                      handleItemClick(item);
                    }}
                    onBlur={() => {
                      const selectedIds = selectedItems?.map(
                        (item) => item?.id
                      );
                      formik.setFieldValue(name, selectedIds);
                    }}
                  />
                  {item?.name}
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </div>
      </LeftModal>
    );
  };

  return (
    <>
      {getSelectedItems()}
      {getChooseGroupsModal()}
    </>
  );
};

export default ButtonSelectList;
