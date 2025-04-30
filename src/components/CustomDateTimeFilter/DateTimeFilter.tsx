import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Grid, InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import MyDateTimePicker from "../DateTimePicker Jalali/DateTimePicker";
import {useStyles} from "../../assets/scss/timeFilterStyle";


export type DateTimeFilterType = {
    from: string;
    to: string;
};

export interface DateTimeFilterProps {
    data?: DateTimeFilterType;
}

export interface NewFilterHandle {
    setBoundaries: () => DateTimeFilterType;
}

const DateTimeFilter = forwardRef<NewFilterHandle, DateTimeFilterProps>(({data}, ref) => {

    const [fromDate, setFromDate] = useState<string>(data ? data?.from : new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    const [toDate, setToDate] = useState<string>(data ? data?.to : new Date().toISOString());
    const classes = useStyles();

    useImperativeHandle(ref, () => ({
        setBoundaries,
    }));

    const setBoundaries = () => {
        return {
            from: fromDate,
            to: toDate
        };
    }

    function removeCharsAfterZ(dateString: string) {
        const zIndex = dateString.indexOf('Z');
        return zIndex !== -1 ? dateString.substring(0, zIndex + 1) : dateString;
    }

    return (
        <Grid sx={{p: 4}}>
            <InputLabel htmlFor="DateTimePicker">
                <Typography className={classes.inputLabel}>
                    From Date
                </Typography>
            </InputLabel>
            <br/>
            <MyDateTimePicker
                required
                name="DateTimePicker"
                blur={() => {
                }}
                value={fromDate}
                onChangeFunc={(d: any) => {
                    const formattedDate = d ? removeCharsAfterZ(d) : "";
                    setFromDate(formattedDate);
                }}
            />
            <br/>
            <br/>
            <InputLabel htmlFor="DateTimePickerTo">
                <Typography className={classes.inputLabel}>
                   To Date
                </Typography>
            </InputLabel>
            <br/>
            <MyDateTimePicker
                required
                name="DateTimePickerTo"
                blur={() => {
                }}
                value={toDate}
                onChangeFunc={(d: any) => {
                    const formattedDate = d ? removeCharsAfterZ(d) : "";
                    setToDate(formattedDate);
                }}
            />
        </Grid>
    );
});
export default DateTimeFilter;
