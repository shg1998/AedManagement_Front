import React, { useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextFieldVariants,
  Theme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";

interface ItemType {
  value: boolean | string;
  title: string;
}
interface SelectProps {
  name: string;
  label?: string;
  formik?: any;
  defaultValue?: any;
  variant?: TextFieldVariants;
  items: ItemType[];
  blur: () => void;
  rowDirection: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px",
  },
}));

const RadioSelectBox: React.FC<SelectProps> = ({
  name,
  label,
  formik,
  items,
  blur,
  rowDirection,
  defaultValue,
}) => {
  const classes = useStyles();

  // /* eslint-disable */
  // useEffect(() => {
  //   formik.setFieldValue(
  //     name,
  //     defaultValue != undefined ? defaultValue : items[0].value
  //   );
  // }, []);
  const [radioValue, setValue] = React.useState<boolean | string>(
    defaultValue !== undefined ? defaultValue : items[0].value
  );
  const handleChange = (event: any) => {
    formik.setFieldValue(name, event.target.value);
    setValue(event.target.value);
  };
  useEffect(() => {
    blur();
  }, [formik?.values[name]]);
  return (
    <div>
      <InputLabel sx={{ marginTop: "30px" , marginBottom:"10px" }} htmlFor={name}>
        <Typography className={classes.inputLabel}>{label}</Typography>
      </InputLabel>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name={name}
          value={radioValue}
          onChange={handleChange}
          sx={
            rowDirection
              ? {
                  display: "flex",
                  //paddingRight:'0.75rem',
                  flexDirection: "row",
                }
              : {
                  display: "flex",
                  paddingRight: "0.75rem",
                }
          }
        >
          {items.map((item) => (
            <FormControlLabel
              key={uuidv4()}
              style={{ display: "flex", gap: "0.5rem" , marginRight:"-10px" , marginLeft:"15px" }}
              value={item.value}
              control={<Radio sx={{ marginLeft: "-10px" }} />}
              label={item.title}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioSelectBox;
