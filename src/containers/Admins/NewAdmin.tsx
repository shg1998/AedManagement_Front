import Container from "@mui/material/Container";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useStyles} from "../../assets/scss/timeFilterStyle";
import {Checkbox, IconButton, InputAdornment, InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import {useMutation} from "react-query";
import Users from "../../services/Users";
import {tError, tSuccess, tWarn} from "../../utils/toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import {MessageTypes} from "../../utils/messageTypes";

export const DEFAULT_USER_INFORMATION: AdminType = {
    id: 0,
    userName: "",
    fullName: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
    isActive: false
};

export type AdminType = {
    id: number;
    userName: string;
    fullName: string;
    mobile: string;
    password: string;
    passwordConfirm: string;
    isActive: boolean;
};

export interface NewUserProps {
    data: AdminType;
    closeModal: () => void;
}

const AddAdminSchema = Yup.object().shape({
    userName: Yup.string().required("وارد کردن نام کاربری ضروری است"),
    fullName: Yup.string().required("وارد کردن نام و نام خانوادگی ضروری است"),
    password: Yup.string()
        .min(8, "کلمه عبور می‌بایست حداقل 8 کاراکتر باشد")
        .max(20, "کلمه عبور وارد شده طولانی است")
        .required("وارد کردن کلمه عبور ضروری است"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "کلمه عبور و تکرار آن باید یکسان باشند")
        .required("وارد کردن تکرار کلمه عبور ضروری است"),
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شده و 11 رقم باشد")
        .required("وارد کردن شماره موبایل ضروری است"),
});

const EditAdminSchema = Yup.object().shape({
    userName: Yup.string().required("وارد کردن نام کاربری ضروری است"),
    fullName: Yup.string().required("وارد کردن نام و نام خانوادگی ضروری است"),
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شده و 11 رقم باشد")
        .required("وارد کردن شماره موبایل ضروری است"),
});

export interface NewAdminHandle {
    sendRequest: () => void;
}

const NewAdmin = forwardRef<NewAdminHandle, NewUserProps>(({data, closeModal}, ref) => {
    const {postNewUserForm, editUserForm} = new Users();
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

    const {mutate: addUser} = useMutation(postNewUserForm, {
        onSuccess: async (data) => {
            if (data?.messageType === "success") {
                closeModal();
                tSuccess(data?.message);
            }
        },
        onError: async (error: any) => {
            console.log(error);
            closeModal();
            tError(error.response.data.message);
        },
    });

    const {mutate: editUser} = useMutation(editUserForm, {
        onSuccess: async (data) => {
            if (data?.messageType === MessageTypes[MessageTypes.success].toString()) {
                closeModal();
                tSuccess(data?.message);
            } else if (data?.messageType === MessageTypes[MessageTypes.warning].toString()) {
                closeModal();
                tWarn(data?.message);
            }
        },
        onError: async (error: any) => {
            console.log(error);
            closeModal();
            tError(error.response.data.message);
        },
    });


    const formik = useFormik<AdminType>({
        initialValues: data,
        validationSchema: data.id === 0 ? AddAdminSchema : EditAdminSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === 0) {
                // @ts-ignore
                delete values.id;
                // @ts-ignore
                delete values.isActive;
                addUser(values);
            } else
                editUser(values);
        },
    });

    useImperativeHandle(ref, () => ({
        sendRequest,
    }));

    const sendRequest = () => {
        submitBtnRef.current.click();
    }

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () =>
        setIsVisiblePassword(!isVisiblePassword);

    const handleClickShowConfirmPassword = () =>
        setIsVisibleConfirmPassword(!isVisiblePassword);

    const handleIsActiveChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("isActive", e.target.checked);
    }

    return (
        <div className={classes.BgContainer}>
            <Container className={classes.mainContainer}>
                <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
                    <InputLabel htmlFor="userName">
                        <Typography className={classes.inputLabel}>
                            نام کاربری
                        </Typography>
                    </InputLabel>
                    <TextField
                        disabled={data.id !== 0}
                        margin="normal"
                        fullWidth
                        id="userName"
                        autoComplete="userName"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("userName")}
                        inputProps={{
                            sx: {
                                borderRadius: "10px",
                                fontSize: "18px",
                                paddingRight: 1,
                                height: "25px",
                                direction: "ltr",
                                textAlign: "right",
                            },
                        }}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.userName && formik.touched.userName,
                        })}
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.userName}
                        </Typography>
                    ) : null}


                    <InputLabel htmlFor="fullName">
                        <Typography className={classes.inputLabel}>
                            نام و نام خانوادگی
                        </Typography>
                    </InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="fullName"
                        autoComplete="fullName"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("fullName")}
                        inputProps={{
                            sx: {
                                borderRadius: "10px",
                                fontSize: "18px",
                                paddingRight: 1,
                                height: "25px",
                                direction: "ltr",
                                textAlign: "right",
                            },
                        }}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.fullName && formik.touched.fullName,
                        })}
                    />
                    {formik.errors.fullName && formik.touched.fullName ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.fullName}
                        </Typography>
                    ) : null}

                    <InputLabel htmlFor="mobile">
                        <Typography className={classes.inputLabel}>
                            شماره همراه
                        </Typography>
                    </InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="mobile"
                        autoComplete="mobile"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("mobile")}
                        inputProps={{
                            sx: {
                                borderRadius: "10px",
                                fontSize: "18px",
                                paddingRight: 1,
                                height: "25px",
                                direction: "ltr",
                                textAlign: "right",
                            },
                        }}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.mobile && formik.touched.mobile,
                        })}
                    />
                    {formik.errors.mobile && formik.touched.mobile ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.mobile}
                        </Typography>
                    ) : null}

                    <InputLabel htmlFor="password">
                        <Typography className={classes.inputLabel}>
                            رمز عبور
                        </Typography>
                    </InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth
                        type={isVisiblePassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("password")}
                        inputProps={{
                            sx: {
                                fontSize: "18px",
                                paddingRight: 1,
                                height: "25px",
                                direction: "ltr",
                                textAlign: "right",
                                borderRadius: '100px'
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{marginRight: "12px"}}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formik.values.password.trim().length !== 0 &&
                                        isVisiblePassword ? (
                                            <Visibility/>
                                        ) : (
                                            <VisibilityOff/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.password && formik.touched.password,
                        })}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.password}
                        </Typography>
                    ) : null}


                    <InputLabel htmlFor="passwordConfirm">
                        <Typography className={classes.inputLabel}>
                            ورود مجدد رمز عبور
                        </Typography>
                    </InputLabel>
                    <TextField
                        margin="normal"
                        fullWidth
                        type={isVisibleConfirmPassword ? "text" : "password"}
                        id="passwordConfirm"
                        autoComplete="current-passwordConfirm"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("passwordConfirm")}
                        inputProps={{
                            sx: {
                                fontSize: "18px",
                                paddingRight: 1,
                                height: "25px",
                                direction: "ltr",
                                textAlign: "right",
                                borderRadius: '100px'
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{marginRight: "12px"}}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formik.values.passwordConfirm.trim().length !== 0 &&
                                        isVisibleConfirmPassword ? (
                                            <Visibility/>
                                        ) : (
                                            <VisibilityOff/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.passwordConfirm && formik.touched.passwordConfirm,
                        })}
                    />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.passwordConfirm}
                        </Typography>
                    ) : null}

                    {
                    data.id !== 0 && (
                        <FormControlLabel
                            className={classes.rememberContainer}
                            control={
                                <Checkbox
                                    color="primary"
                                    name="isActive"
                                    value={formik.values.isActive}
                                    checked={formik.values.isActive}
                                    onChange={handleIsActiveChanged}
                                />
                            }
                            label={
                                <Typography className={classes.fontCustum}>
                                    فعال؟
                                </Typography>
                            }
                        />
                    )
                }

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
export default NewAdmin;
