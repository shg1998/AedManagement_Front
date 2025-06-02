import React from "react";
import { makeStyles } from "@mui/styles";
import {
  InputLabel,
  TextField,
  Typography,
  TextFieldVariants,
  Theme,
} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  inputField: {
    width: "100%",
    "& .MuiFilledInput-input": {
      paddingTop: "0px !important",
      borderRadius: "5px",
      fontSize: "1em",
      paddingRight: 1,
      height: "25px",
    },
    "& .MuiInputBase-multiline": {
      padding: "0px !important",
    },
    marginBottom: "5px",
    marginTop: "15px",
  },
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px",
  },
}));

interface TextFieldProps {
  name: string;
  label?: string;
  formik?: any;
  defaultValue?: string;
  inputType?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  variant?: TextFieldVariants;
  multiline?: boolean;
  minRows?: number;
  required?: boolean;
  maxLength?: number;
  blur: () => void;
}

const MyTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  defaultValue,
  formik,
  readOnly,
  autoFocus,
  inputType,
  variant,
  multiline,
  minRows,
  required,
  blur,
  maxLength
}) => {
  const classes = useStyles();
  return (
    <div>
      <InputLabel
        style={{ display: "flex", color: "red", marginTop: "30px" }}
        required={required}
        htmlFor={name}
      >
        {label && (
          <Typography className={classes.inputLabel}>{label}</Typography>
        )}
      </InputLabel>
      <TextField
        id={name}
        defaultValue={defaultValue ? defaultValue : ""}
        margin="normal"
        autoComplete={name}
        autoFocus={autoFocus}
        variant={variant}
        inputProps={
          multiline
            ? (maxLength ? {
                readOnly: readOnly,
                sx: {
                  backgroundColor: "#ffffff",
                  padding: "10px 14px",
                },
                maxLength: maxLength
              } : {
                readOnly: readOnly,
                sx: {
                  backgroundColor: "#ffffff",
                  padding: "10px 14px",
                },
              })
            : (maxLength ? {
                readOnly: readOnly,
                maxLength: maxLength,
                sx: {
                  backgroundColor: "#ffffff",
                },
              } : {
                readOnly: readOnly,
                sx: {
                  backgroundColor: "#ffffff",
                },
              })
        }
        multiline={multiline}
        type={inputType === undefined ? "text" : "password"}
        minRows={minRows}
        className={classes.inputField}
        onBlur={() => {
          blur();
          formik.setFieldTouched(name, true);
        }}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
      />
      {formik.touched[name] && (
        <div className="errorMessage">{formik?.errors[name]}</div>
      )}
    </div>
  );
};

export default MyTextField;
