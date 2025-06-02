import Container from "@mui/material/Container";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Checkbox, IconButton, InputAdornment, InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import {useStyles} from "../../assets/scss/timeFilterStyle";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import {useMutation} from "react-query";
import Users from "../../services/Users";
import {tError, tSuccess} from "../../utils/toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import {AdminType, NewAdminHandle, NewUserProps} from "../Admins/NewAdmin";
import MySelect from "../../components/MySelect/MySelect";
import {provinceItems} from "../../utils/ProvinceUtils";
import Account from "../../services/Account";
import {deleteItemSecure, setItemSecure} from "../../utils/AESCrypto";


const AddUserSchema = Yup.object().shape({
    prevPassword: Yup.string()
        .max(20, "⛔ Password length is too long")
        .required("⛔ Password is required"),
    newPassword: Yup.string()
        .min(8, "⛔ Password must be at least 8 characters long.")
        .max(20, "⛔ Password length is too long")
        .required("⛔ Password is required"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("newPassword")], "⛔ Password and confirmation must match.")
        .required("⛔ Password Confirm is required."),
});

const StyledTextField = styled(TextField)(({ theme }) => ({
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

export interface NewChangeUserPasswordHandle {
    sendRequest: () => void;
}

export interface NewChangeUserPasswordProps {
    closeModal: () => void;
}

export type UserChangePasswordType = {
    prevPassword: string;
    newPassword: string;
    passwordConfirm: string;
}

const UserChangePassword = forwardRef<NewChangeUserPasswordHandle, NewChangeUserPasswordProps>(({closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {changePassword} = new Account();
    const [isVisiblePrevPassword, setIsVisiblePrevPassword] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

    const {mutate: passChange} = useMutation(changePassword, {
        onSuccess: async (data) => {
            if (data?.isSuccess) {
                closeModal();
                tSuccess(data?.message);
                deleteItemSecure('mainToken');
                setItemSecure("mainToken", data.data.token);
            }
        },
        onError: async (error: any) => {
            closeModal();
            tError(error.response.data.Message);
        },
    });



    const formik = useFormik<UserChangePasswordType>({
        initialValues: {
            prevPassword: '',
            newPassword: '',
            passwordConfirm: ''
        },
        validationSchema: AddUserSchema,
        onSubmit: async (values): Promise<any> => {
            passChange(values);
        }
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

    const handleMouseDownPrevPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () =>
        setIsVisiblePassword(!isVisiblePassword);

    const handleClickShowPrevPassword = () =>
        setIsVisiblePrevPassword(!isVisiblePrevPassword);


    const handleClickShowConfirmPassword = () =>
        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

    return (
        <div className={classes.BgContainer}>
            <Container className={classes.mainContainer}>
                <form className={classes.formContainer} onSubmit={formik.handleSubmit}>

                    <InputLabel htmlFor="prevPassword">
                        <Typography className={classes.inputLabel}>
                            🔐 Previous Password
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        type={isVisiblePrevPassword ? "text" : "password"}
                        id="prevPassword"
                        autoComplete="current-prevPassword"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("prevPassword")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{marginRight: "12px"}}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPrevPassword}
                                        onMouseDown={handleMouseDownPrevPassword}
                                        edge="end"
                                    >
                                        {formik.values.prevPassword.trim().length !== 0 &&
                                        isVisiblePrevPassword ? (
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
                            formik.errors.prevPassword && formik.touched.prevPassword,
                        })}
                    />
                    {formik.errors.prevPassword && formik.touched.prevPassword ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.prevPassword}
                        </Typography>
                    ) : null}


                    <InputLabel htmlFor="newPassword">
                        <Typography className={classes.inputLabel}>
                            🔒 New Password
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        type={isVisiblePassword ? "text" : "password"}
                        id="newPassword"
                        autoComplete="current-newPassword"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("newPassword")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{marginRight: "12px"}}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formik.values.newPassword.trim().length !== 0 &&
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
                            formik.errors.newPassword && formik.touched.newPassword,
                        })}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.newPassword}
                        </Typography>
                    ) : null}


                    <InputLabel htmlFor="passwordConfirm">
                        <Typography className={classes.inputLabel}>
                            🔑 Confirm Password
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        type={isVisibleConfirmPassword ? "text" : "password"}
                        id="passwordConfirm"
                        autoComplete="current-passwordConfirm"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("passwordConfirm")}
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
export default UserChangePassword;
