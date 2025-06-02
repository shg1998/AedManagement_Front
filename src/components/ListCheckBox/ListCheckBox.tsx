import { Checkbox, Theme } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme: Theme) => ({
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px",
  },
  checkboxStyle: {
    // borderRadius: '20px',
    height: "16px",
    width: "16px",
    // border: '1px solid var(--type-colors-secondary, #605E5C)',
    background: "white",
    marginLeft: "20px !important",
    "&.Mui-checked": {
      borderRadius: "8px",
      background: "#fff",
      color: "#0627A7",
    },
    "& .MuiSvgIcon-root": {
      borderRadius: "8px",
    },
  },
}));

interface CheckboxProps {
  name?: string;
  label?: string;
  checked?: boolean;
  multiple?: boolean;
  onChange: () => void;
  onBlur: () => void;
}

const ListCheckBox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  onBlur,
}) => {
  const classes = useStyles();
  return (
    <>
      {/* <InputLabel htmlFor={name}>
        <Typography className={classes.inputLabel}>{label}</Typography>
      </InputLabel> */}
      <Checkbox
        className={classes.checkboxStyle}
        icon={<CheckBoxOutlineBlankIcon />}
        checkedIcon={<CheckBoxIcon />}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 20,
            borderRadius: "20px",
          },
          // marginleft:'10px'
        }}
        onBlur={onBlur}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default ListCheckBox;
