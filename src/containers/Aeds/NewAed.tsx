import Container from "@mui/material/Container";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import {useStyles} from "../../assets/scss/timeFilterStyle";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import {useMutation} from "react-query";
import {tError, tSuccess} from "../../utils/toast";
import {styled} from "@mui/material/styles";
import MySelect, {ItemType} from "../../components/MySelect/MySelect";
import {provinceItems} from "../../utils/ProvinceUtils";
import MyDateTimePicker from "../../components/DateTimePicker Jalali/DateTimePicker";
import {removeCharsAfterZ} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import Aed from "../../services/Aed";
import {convertTimeToLocale} from "../../utils/time";


const BatteryTypes: ItemType[] = [
    {
        value: 'NonChargeable', title: 'Non Chargeable'
    },
    {
        value: 'Chargeable', title: 'Chargeable'
    }
]

const AddAedSchema = Yup.object().shape({
    serialNumber: Yup.string()
        .required("⛔ Serial Number is required!"),

    province: Yup.string()
        .required("⛔ Province is required!"),

    city: Yup.string()
        .required("⛔ City is required!"),

    place: Yup.string()
        .required("⛔ Place is required!"),

    registerDateTime: Yup.string()
        .required("⛔ Register DateTime is required!")
        .test("is-valid-date", "⛔ Invalid date format.", (value: any) => {
            return value && !isNaN(Date.parse(value));
        }),
});


const StyledTextField = styled(TextField)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: "100%",

    "& input": {
        fontSize: "18px",
        paddingRight: theme.spacing(1),
        height: "25px",
        direction: "ltr",
        textAlign: "left",
        borderRadius: "100px",
    },
}));

export interface NewAedHandle {
    sendRequest: () => void;
}

export type AedType = {
    id: string;
    serialNumber: string;
    province: string;
    city: string;
    place: string;
    registerDateTime: string;
    aedBatteryType: string;
}

interface NewAedProps {
    data: AedType;
    closeModal: () => void;
}

const NewAed = forwardRef<NewAedHandle, NewAedProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postNewAedForm, editAedForm} = new Aed();

    const {mutate: addAed} = useMutation(postNewAedForm, {
        onSuccess: async (data) => {
            if (data?.isSuccess) {
                closeModal();
                tSuccess(data?.data);
            }
        },
        onError: async (error: any) => {
            closeModal();
            tError(error.response.data.Message);
        },
    });

    const {mutate: editAed} = useMutation(editAedForm, {
        onSuccess: async (data) => {
            if (data?.isSuccess) {
                closeModal();
                tSuccess(data?.data);
            }
        },
        onError: async (error: any) => {
            closeModal();
            tError(error.response.data.Message);
        },
    });


    const formik = useFormik<AedType>({
        initialValues: data,
        validationSchema: AddAedSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === '0') {
                // @ts-ignore
                delete values.id;
                addAed(values);
            } else {
                editAed(values);
            }
        },
    });

    useImperativeHandle(ref, () => ({
        sendRequest,
    }));

    const sendRequest = () => {
        submitBtnRef.current.click();
    }

    return (
        <div className={classes.BgContainer}>
            <Container className={classes.mainContainer}>
                <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
                    <InputLabel htmlFor="serialNumber">
                        <Typography className={classes.inputLabel}>
                            Serial Number
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="serialNumber"
                        autoComplete="serialNumber"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("serialNumber")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.serialNumber && formik.touched.serialNumber,
                        })}
                    />
                    {formik.errors.serialNumber && formik.touched.serialNumber ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.serialNumber}
                        </Typography>
                    ) : null}


                    <InputLabel htmlFor="province">
                        <Typography className={classes.inputLabel}>
                            Province
                        </Typography>
                    </InputLabel>
                    <MySelect
                        label=""
                        formik={formik}
                        items={provinceItems}
                        {...formik.getFieldProps("province")}
                    />
                    {formik.errors.province && formik.touched.province ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.province}
                        </Typography>
                    ) : null}

                    <InputLabel htmlFor="city">
                        <Typography className={classes.inputLabel}>
                            City
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="city"
                        autoComplete="city"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("city")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.city && formik.touched.city,
                        })}
                    />
                    {formik.errors.city && formik.touched.city ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.city}
                        </Typography>
                    ) : null}

                    <InputLabel htmlFor="place">
                        <Typography className={classes.inputLabel}>Place</Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="place"
                        autoComplete="place"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("place")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.place && formik.touched.place,
                        })}
                    />
                    {formik.errors.place && formik.touched.place ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.place}
                        </Typography>
                    ) : null}
                    <br/>
                    <br/>

                    <InputLabel htmlFor="registerDateTime">
                        <Typography className={classes.inputLabel}>Register DateTime</Typography>
                    </InputLabel>
                    <MyDateTimePicker
                        required
                        name="registerDateTime"
                        blur={() => {
                        }}
                        value={convertTimeToLocale(formik.values.registerDateTime)}
                        onChangeFunc={(d: any) => {
                            const formattedDate = d ? removeCharsAfterZ(d) : "";
                            formik.setFieldValue('registerDateTime', formattedDate);
                        }}
                    />
                    {formik.errors.registerDateTime && formik.touched.registerDateTime ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.registerDateTime}
                        </Typography>
                    ) : null}
                    <br/>
                    <br/>

                    <InputLabel htmlFor="aedBatteryType">
                        <Typography className={classes.inputLabel}>
                            Battery Type
                        </Typography>
                    </InputLabel>
                    <MySelect
                        label=""
                        formik={formik}
                        items={BatteryTypes}
                        {...formik.getFieldProps("aedBatteryType")}
                    />
                    {formik.errors.aedBatteryType && formik.touched.aedBatteryType ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.aedBatteryType}
                        </Typography>
                    ) : null}


                    <Button
                        ref={submitBtnRef}
                        type="submit"
                        hidden={true}
                    />

                </form>
            </Container>
        </div>
    );
});
export default NewAed;
