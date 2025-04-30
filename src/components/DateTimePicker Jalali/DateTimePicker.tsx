import React, {useEffect} from "react";
// import "./DateTimePickers.css";
import {DateTimeInput, DateInput} from "react-hichestan-datetimepicker";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";
import {InputLabel, Theme} from "@mui/material";
import {convertTimeToLocale} from "../../utils/time";
import {useThemeContext} from "../../ThemeContext";

const useStyles = makeStyles((theme: Theme) => ({
    inputLabel: {
        fontSize: "0.9em !important",
        color: theme.palette.text.primary,
        // marginBottom: "10px !important",
        //marginTop: "20px !important",
    },
}));

interface DateTimePickerProps {
    name: string;
    value?: string;
    formik?: any;
    change?: (name: string) => void;
    blur: () => void;
    label?: string;
    required?: boolean;
    hasError?: boolean;
    onChangeFunc?: any;
    isQueryBuilderValue?: boolean;
}

const MyDateTimePicker: React.FC<DateTimePickerProps> = ({
                                                             value,
                                                             label,
                                                             formik,
                                                             name,
                                                             blur,
                                                             change,
                                                             required,
                                                             hasError,
                                                             onChangeFunc,
                                                             isQueryBuilderValue = false,
                                                         }) => {
    const classes = useStyles();
    const customStyles = {
        zIndex: 3000,
    };
    React.useEffect(() => {
        if (value && formik) {

            //@ts-ignore
            formik.setFieldValue(name, value);
        }
        change && change(name);
        blur();
    }, [formik ? formik.values[name] : null]);

    const {themeMode, theme} = useThemeContext();
    useEffect(() => {
        // Conditionally load the appropriate theme file
        const loadThemeCSS = async () => {
            if (themeMode === "dark") {
                //@ts-ignore
                await import("./darkDateTimePickers.css");
            } else {
                //@ts-ignore
                await import("./DateTimePickers.css");
            }
        };

        loadThemeCSS();
    }, [themeMode]);

    return (
        <>
            {label ? (
                <InputLabel
                    required={required}
                    htmlFor={name}
                    sx={{
                        color: "red",
                        display: "flex",
                        marginTop: "31px",
                    }}
                >
                    <Typography className={classes.inputLabel}>{label}</Typography>
                </InputLabel>
            ) : (
                <></>
            )}
            <div style={{marginTop: 0}}>
                <DateInput
                    value={value}
                    name={name}
                    // autoPop
                    className={
                        `inputTimePicker-${themeMode}`
                    }
                    // style={{ backgroundColor: "yellow" }}
                    // dialogContainerClassName={{ backgroundColor: "red" }}
                    dialogContainerStyle={customStyles}
                    onChange={(e: any) => {
                        formik
                            ? formik.setFieldValue(name, convertTimeToLocale(e.target.value))
                            : onChangeFunc(e.target.value);

                        // change && change(name);
                        // blur();
                    }}
                    closeLabel={
                        <div style={{color: theme.palette.text.primary}}>تایید</div>
                    }
                    onDismiss={() => {
                        blur();
                    }}
                />
                {hasError && (
                    <div style={{marginTop: "5px", color: "red"}}>
                        زمان شروع نمی تواند از زمان پایان بزرگتر باشد.
                    </div>
                )}
            </div>
        </>
    );
};
export default MyDateTimePicker;
