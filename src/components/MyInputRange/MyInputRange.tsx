import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  multiTabs: {
    "& .MuiTabs-flexContainer": {
      display: "flex",
      gap: "25px",
      justifyContent: "right",
      backgroundColor: theme?.palette?.grayP?.light,
    },
  },
  sliderStyles: {
    "& 	.MuiSlider-rail": {
      backgroundImage:
        "linear-gradient(.75turn, #f00 , #F5C21E , #ECF915, #44AE44)",
      height: "8px",
    },
    "& 	.MuiSlider-track": {
      backgroundImage: "transparent",
      backgroundColor: "transparent",
      height: "8px",
      border: "none",
    },
    "& 	.MuiSlider-mark": {
      color: "transparent",
      backgroundColor: "transparent",
    },
  },
  inputLabel: {
    fontSize: "0.9em",
    color: theme?.palette?.text?.primary,
    marginBottom: "10px",
  },
}));

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

interface TextFieldProps {
  name: string;
  label?: string;
  formik?: any;
  blur?: () => void;
  dontHaveClassName?: boolean;
}

const MyInputRange: React.FC<TextFieldProps> = ({
  name,
  label,
  formik,
  blur,
  dontHaveClassName,
}) => {
  const [value, setValue] = useState(
    formik?.values[name] ? formik?.values[name] : 0
  );
  const classes = useStyles();

  // /* eslint-disable */
  // useEffect(() => {
  //   if (formik) {
  //     formik.setFieldValue(name, 1);
  //   }
  // }, []);

  const handleChange = (event: any, newValue: any) => {
    if (formik) {
      formik.setFieldValue(name, newValue);
    }
    setValue(newValue);
  };

  return (
    <>
      <Typography className={classes.inputLabel}>{label}</Typography>
      <Slider
        id={name}
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        defaultValue={1}
        valueLabelDisplay="on"
        step={1}
        marks={marks}
        min={1}
        max={10}
        onBlur={() => {
          blur && blur();
        }}
        className={dontHaveClassName ? "" : classes.sliderStyles}
      />
    </>
  );
};

export default MyInputRange;
