import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
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

const CheckMarkSelect: React.FC<SelectProps> = ({
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
  const [enableAutoCmp, setEnableAutoCmp] = useState<any>("");

  const handleChange = (event: any, value: any) => {
    setSelectedValue(value);
    const selectedItem = items?.find((item) => item.title === value);
    formik.setFieldValue(name, selectedItem?.id);
  };

  const handleRadioChange = (event: any) => {
    setEnableAutoCmp(event.target.value);
  };

  useEffect(() => {
    if (enableAutoCmp === "no") {
      formik.setFieldValue(name, "");
      blur();
    } else if (enableAutoCmp === "yes" && selectedValue === defaultValue) {
      const selectedItem = items?.find((item) => item.title === selectedValue);
      formik.setFieldValue(name, selectedItem?.id);
      blur();
    }
  }, [enableAutoCmp]);

  useEffect(() => {
    if (defaultValue.length > 0) {
      setSelectedValue(defaultValue);
      setEnableAutoCmp("yes");
    } else if (defaultValue.length === 0) {
      setEnableAutoCmp("no");
    }
  }, []);

  return (
    <div>
      <InputLabel
        required={required}
        htmlFor={"روش برچسب"}
        sx={{
          marginBottom: "6px",
          display: "flex",
          color: "red",
          marginTop: "30px",
        }}
      >
        <Typography className={classes.inputLabel}>{label}</Typography>
      </InputLabel>
      <RadioGroup
        aria-label="demo-radio-buttons-group-label"
        name={name}
        value={enableAutoCmp}
        onChange={handleRadioChange}
        onBlur={() => {
          blur();
        }}
      >
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label="برچسب خودکار"
        />
        <FormControlLabel value="no" control={<Radio />} label="برچسب دستی" />
      </RadioGroup>
      {enableAutoCmp === "yes" && (
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
              options={items?.map((item) => item.title)}
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
      )}
    </div>
  );
};

export default CheckMarkSelect;
