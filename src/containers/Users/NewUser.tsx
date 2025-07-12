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
import {tError, tSuccess} from "../../utils/ToastUtils/toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import MySelect from "../../components/MySelect/MySelect";
import {provinceItems} from "../../utils/ProvinceUtils/ProvinceUtils";
import {AddUserSchema, EditUserSchema, NewUserHandle, NewUserProps, StyledTextField, UserType} from "./constants";



const NewUser = forwardRef<NewUserHandle, NewUserProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postNewUserForm, editUserForm} = new Users();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

    const {mutate: addUser} = useMutation(postNewUserForm, {
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

    const {mutate: editUser} = useMutation(editUserForm, {
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


    const formik = useFormik<UserType>({
        initialValues: data,
        validationSchema: data.id === 0 ? AddUserSchema : EditUserSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === 0) {
                // @ts-ignore
                delete values.id;
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
        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

    const handleIsActiveChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("isActive", e.target.checked);
    }

    // const handleIsInterProvinceRepairExpertChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     formik.setFieldValue("isInterProvinceRepairExpert", e.target.checked);
    // }

    return (
        <div className={classes.BgContainer}>
            <Container className={classes.mainContainer}>
                <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
                    <InputLabel htmlFor="userName">
                        <Typography className={classes.inputLabel}>
                            🧑‍💻 Username
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        disabled={data.id !== 0}
                        margin="normal"
                        fullWidth
                        id="userName"
                        autoComplete="userName"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("userName")}
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
                            🧑 FullName
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="fullName"
                        autoComplete="fullName"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("fullName")}
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

                    <InputLabel htmlFor="email">
                        <Typography className={classes.inputLabel}>
                            📧 Email Address
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="email"
                        autoComplete="email"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("email")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.email && formik.touched.email,
                        })}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.email}
                        </Typography>
                    ) : null}

                    <InputLabel htmlFor="province">
                        <Typography className={classes.inputLabel}>🗺️ Province</Typography>
                    </InputLabel>
                    <br/>
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
                    <br/>
                    <br/>

                    <InputLabel htmlFor="password">
                        <Typography className={classes.inputLabel}>
                            🔒 Password
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        type={isVisiblePassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        sx={{mb: 4, mt: 2}}
                        {...formik.getFieldProps("password")}
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
                            ✅ Confirm Password
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
                                Is Active?
                            </Typography>
                        }
                    />

                    {/*<FormControlLabel*/}
                    {/*    className={classes.rememberContainer}*/}
                    {/*    control={*/}
                    {/*        <Checkbox*/}
                    {/*            color="primary"*/}
                    {/*            name="isInterProvinceRepairExpert"*/}
                    {/*            value={formik.values.isInterProvinceRepairExpert}*/}
                    {/*            checked={formik.values.isInterProvinceRepairExpert}*/}
                    {/*            onChange={handleIsInterProvinceRepairExpertChanged}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    label={*/}
                    {/*        <Typography className={classes.fontCustum}>*/}
                    {/*            Is Inter-Province Repair Expert ?*/}
                    {/*        </Typography>*/}
                    {/*    }*/}
                    {/*/>*/}

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
export default NewUser;
