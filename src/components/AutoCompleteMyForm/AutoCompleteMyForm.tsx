import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  TextFieldVariants,
  Theme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Autocomplete } from "@mui/lab";

interface ItemType {
  title: string;
  id: string;
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

const useStyles = makeStyles((theme:Theme) => ({
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px",
  },
  disabledOption: {
    pointerEvents: "none",
    opacity: 0.6,
  },
}));

const AutoCompleteMyForm: React.FC<SelectProps> = ({
  name,
  label,
  formik,
  items,
  value,
  required,
  blur,
  defaultValue,
}) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState<any>("");

  const handleChange = (event: any, value: any) => {
    setSelectedValue(value);
    const selectedItem = items.find((item) => item.title === value);
    formik.setFieldValue(name, selectedItem?.id);
  };

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setSelectedValue(defaultValue);
    }
  }, []);

  return (
    <>
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
          onBlur={() => blur()}
          sx={{ direction: "ltr!important" }}
          id={name}
          noOptionsText={"موردی یافت نشد"}
          options={items.map((item) => item.title)}
          onChange={handleChange}
          value={selectedValue}
          disableClearable
          getOptionLabel={(option) => option}
          style={{
            width: "100%",
            // backgroundColor: "white"
          }}
          renderInput={(params) => (
            <TextField sx={{ direction: "ltr !important" }} {...params} />
          )}
        />
      </FormControl>
    </>
  );
};

export default AutoCompleteMyForm;
