import * as React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useTheme from "@mui/system/useTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { InputLabel, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  timepicker: {
    width: "100%",
    marginBottom: "10px",
    "& .MuiPickersLayout-root": {
      direction: "ltr",
    },
  },
  inputLabel: {
    fontSize: "0.9em",
    color: theme.palette.text.primary,
    marginBottom: "10px",
  },
}));
interface DateTimePickerProps {
  name: string;
  value?: string;
  formik?: any;
  blur: () => void;
  label: string;
  required: boolean;
}
const MyDateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  value,
  formik,
  blur,
  label,
  required,
}) => {
  const classes = useStyles();
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () => createTheme({ direction: "rtl" }, existingTheme),
    [existingTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <InputLabel
        required={required}
        htmlFor={name}
        sx={{
          marginBottom: "15px!important",
          display: "flex",
          marginTop: "30px",
          color: "red",
        }}
      >
        <Typography className={classes.inputLabel}>{label}</Typography>
      </InputLabel>
      <div dir="ltr" style={{ display: "flex", flexDirection: "row-reverse" }}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DateTimePicker
            defaultValue={new Date()}
            // value={value && new Date(value)}
            ampm={false}
            className={classes.timepicker}
            onChange={(e) => {
              //@ts-ignore
              formik.setFieldValue(name, e?.toISOString());
            }}
            onClose={() => blur()}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
};

export default MyDateTimePicker;
