import { Switch, Typography } from "@mui/material";

import { ChangeEvent, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

interface Props {
  name: string;
  label?: string;
  formik?: any;
  defaultValue: number;
  blur: () => void;
  value: boolean;
}

const MySwitch: React.FC<Props> = ({
  name,
  label,
  formik,
  defaultValue,
  blur,
  value,
}) => {
  useEffect(() => {
    blur();
  }, [formik.values[name]]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ marginRight: "0!important" }}
      control={<Switch checked={value} onChange={handleChange} />}
      label={label}
    />
  );
};

export default MySwitch;
