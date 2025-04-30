import React, { useEffect, useState } from "react";
import {
  Alert,
  Chip,
  FormControl,
  InputLabel,
  TextField,
  TextFieldVariants,
  Theme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import { useThemeContext } from "../../ThemeContext";

interface ItemType {
  value: string;
  title: string;
}

interface SelectProps {
  name?: string;
  label?: string;
  formik?: any;
  value?: any;
  variant?: TextFieldVariants;
  items: ItemType[];
  multiple?: boolean;
  required?: boolean;
  blur: () => void;
  freeSolo?: boolean;
  defaultValue?: any;
  maxItems?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px !important",
  },
  disabledOption: {
    pointerEvents: "none",
    opacity: 0.6,
  },
  inputContainer: {
    "& .MuiAutocomplete-input": {
      boxShadow: "none",
    },
  },
}));

const CheckMarkSelect: React.FC<SelectProps> = ({
  name,
  label,
  formik,
  items,
  value,
  required,
  blur,
  freeSolo,
  defaultValue,
  maxItems,
}) => {
  const classes = useStyles();
  const [selectedCount, setSelectedCount] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { theme } = useThemeContext();
  const handleChange = (event: any, values: any) => {
    if (freeSolo) {
      formik.setFieldValue(name, values);
    } else {
      let selectedValues = values.map((value: any) => {
        const selectedItem = items.find((item) => item.title === value);

        return selectedItem ? selectedItem.value : value;
      });

      formik.setFieldValue(name, selectedValues);
    }

    setSelectedCount(values.length);
    setShowAlert(values.length === maxItems);
  };
  useEffect(() => {
    if (name && formik.values[name]) {
      blur();
    }
  }, [formik.values]);
  return (
    <div>
      {showAlert && (
        <Alert severity="warning" sx={{ marginBottom: "1rem" }}>
          حداکثر تعداد قابل انتخاب برابر با {maxItems} گزینه می‌باشد
        </Alert>
      )}
      <InputLabel
        required={required}
        htmlFor={name}
        sx={{
          marginBottom: "6px",
          display: "flex",
          color: "red",
          marginTop: "30px",
        }}
      >
        <Typography className={classes.inputLabel}>{label}</Typography>
      </InputLabel>
      <FormControl sx={{ width: "100%" }}>
        <Autocomplete
          className={classes.inputContainer}
          multiple
          onBlur={() => blur()}
          sx={{ direction: "ltr!important" }}
          id={name}
          noOptionsText={"موردی یافت نشد"}
          defaultValue={defaultValue}
          options={items.map((item) => item.title)}
          freeSolo={freeSolo}
          onChange={handleChange}
          value={value}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li
              {...props}
              style={{ direction: "rtl", display: "flex" }}
              className={
                maxItems
                  ? selectedCount == null && defaultValue?.length > 0
                    ? defaultValue?.length === maxItems && !selected
                      ? classes.disabledOption
                      : undefined
                    : selectedCount === maxItems && !selected
                    ? classes.disabledOption
                    : undefined
                  : undefined
              }
              // disabled={selectedCount === maxItems && !selected}
            >
              <Checkbox
                checked={selected}
                disabled={selectedCount === maxItems && !selected}
              />
              <ListItemText
                sx={{ display: "flex", justifyContent: "start" }}
                primary={
                  option === "C++" ? "++C" : option === "C#" ? "#C" : option
                }
              />
            </li>
          )}
          style={{
            width: "100%",
            // backgroundColor: "white"
          }}
          renderInput={(params) => <TextField {...params} />}
          renderTags={(value: any, getTagProps) =>
            value.map((option: any, index: number) => (
              <Chip
                sx={{
                  backgroundColor: "#E0E0E0!important ",
                  padding: "0 0.5rem !important",
                  borderRadius: "0.2rem!important",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  "& path": {
                    color: theme.palette.background.default,
                  },
                }}
                variant="outlined"
                label={
                  option === "++C" ? "C++" : option === "#C" ? "C#" : option
                }
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </FormControl>
    </div>
  );
};

export default CheckMarkSelect;
