import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";

interface CheckboxProps {
  name?: string;
  label?: string;
  value?: boolean;
  formik?: any;
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  blur?: () => void;
  readonly?: boolean;
  defaultChecked?: boolean;
}
const MyCheckbox: React.FC<CheckboxProps> = ({
  name,
  label,
  value,
  formik,
  change,
  blur,
  readonly,
  defaultChecked,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          value={value}
          checked={value}
          defaultChecked={defaultChecked}
          onChange={(e) => {
            if (formik) {
              formik?.setFieldValue(name, e.target.value);
            } else if (change) {
              change(e);
            }
          }}
          onBlur={() => {
            blur && blur();
          }}
          disabled={readonly}
        />
      }
      label={label}
    />
  );
};

export default MyCheckbox;
