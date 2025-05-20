import Typography from "@mui/material/Typography";
import {InputLabel, TextFieldVariants, MenuItem, Theme} from "@mui/material";
import React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {makeStyles} from "@mui/styles";
import {Height} from "@mui/icons-material";
import {borderTopLeftRadius} from "html2canvas/dist/types/css/property-descriptors/border-radius";
import {boolean} from "yup";

const useStyles = makeStyles((theme: Theme) => ({
    inputLabel: {
        fontSize: "0.9rem!important",
        color: theme.palette.text.primary,
        marginBottom: "8px !important",
        //marginTop: "30px",
    },
    select: {
        "& .MuiSelect-select": {
            paddingRight: "25px !important",
            paddingTop: "8px !important",

            padding: "0px !important",
            height: "30px !important",
            Radius: "8px !important",
        },
        "& .MuiSelect-icon": {
            position: "absolute",
            right: "5px !important",
            left: "unset",
        },
        "& .MuiInputBase-root": {
            paddingLeft: "10px !important",
            Radius: "8px",
        },
    },
    // select: {

    // },
}));

export interface ItemType {
    index?: number;
    value: string | number;
    title: string;
}

interface SelectProps {
    name?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    defaultValue?: string;
    formik?: any;
    variant?: TextFieldVariants;
    items: ItemType[];
    multiple?: boolean;
    required?: boolean;
    isQueryBuilderValue?: boolean;
    blur?: () => void;
    change?: (e: any) => void;
}

const MySelect: React.FC<SelectProps> = ({
                                             name,
                                             label,
                                             value,
                                             defaultValue,
                                             formik,
                                             items,
                                             variant,
                                             multiple,
                                             required,
                                             isQueryBuilderValue = false,
                                             blur,
                                             change,
                                             disabled = false
                                         }) => {
    const classes = useStyles();

    return (
        <>
            {label && (
                <InputLabel
                    sx={{
                        display: "flex",
                        marginBottom: "7px",
                        color: "red",
                        marginTop: "30px",
                    }}
                    required={required}
                    htmlFor={name}
                >
                    <Typography className={classes.inputLabel}>{label}</Typography>
                </InputLabel>
            )}
            <Select disabled={disabled}
                    margin="dense"
                    className={classes.select}
                    defaultValue={defaultValue}
                    value={value}
                    fullWidth
                    style={{
                        height: isQueryBuilderValue ? "34px" : "54px",
                        borderRadius: isQueryBuilderValue ? "8px" : "5px",
                        // border: isQueryBuilderValue ? "2px solid #4156A6" : "",
                    }}
                    id={name}
                    autoComplete="status"
                    variant={variant ?? "outlined"}
                    inputProps={{
                        sx: {
                            backgroundColor: "transparent",
                            borderRadius: isQueryBuilderValue ? "8px" : "5px",
                            ml: 1,
                            fontSize: "1.2rem",
                            paddingLeft: "4px",
                            direction: "rtl",
                            height: isQueryBuilderValue ? "0px" : "54px",
                        },
                    }}
                    multiple={multiple}
                // className={clsx({
                //   [classes.errorBorder]: formik.errors.status && formik.touched.status,
                // })}
                    onBlur={() => blur && blur()}
                    onChange={(e: SelectChangeEvent) => {
                        if (formik) {
                            formik.setFieldValue(name, e.target.value);
                        } else if (change) {
                            change(e);
                        }
                    }}
            >
                {items ? (
                    items.length > 0 ? (
                        items.map((item) => {
                            return (
                                <MenuItem
                                    key={item?.index}
                                    style={{display: "block", padding: "5px 15px"}}
                                    value={item.value}
                                >
                                    {item.title}
                                </MenuItem>
                            );
                        })
                    ) : (
                        <MenuItem>
                            <em>هیچ موردی یافت نشد</em>
                        </MenuItem>
                    )
                ) : (
                    <MenuItem>
                        <em>هیچ موردی یافت نشد</em>
                    </MenuItem>
                )}
            </Select>
        </>
    );
};

export default MySelect;
