import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {IconButton, InputAdornment, InputLabel, Theme} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import {useMutation} from "react-query";
import Account from "../../services/Account";
import {useLocation, useNavigate} from "react-router-dom";
import routes from "../../routes/routes";
import {
    getCookie,

} from "../../utils/CookieHandler";
import {useAuthDispatch} from "../../context/AuthContext";
import {setItemSecure} from "../../utils/AESCrypto";
import LoginTemplate from "./LoginTemplate";
import {useThemeContext} from "../../ThemeContext";
import ReactLoading from "react-loading";
import {tError} from "../../utils/toast";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontStyle: "normal",
        fontWeight: 'bold !important',
        fontSize: "1.5rem !important",
        lineHeight: "32px",
        marginBottom: "15px !important",
        color: theme.palette.text.primary,
    },
    fontCustum: {
        fontSize: "0.9em",
    },
    footerContainer: {
        display: "flex",
    },
    footer: {
        display: "flex",
    },
    rememberContainer: {
        fontSize: "1em",
        marginRight: "-10px !important",
        color: theme.palette.text.primary,
    },
    createNewPassword: {
        marginRight: "5px !important",
        fontSize: "1em",
    },
    formContainer: {
        direction: "rtl",
        width: "94%",
    },
    inputLabel: {
        left: "auto",
        fontSize: "1em",
        marginTop: "10px !important",
        color: theme.palette.text.primary,
    },
    errorText: {
        fontSize: "1em",
        marginBottom: "15px !important",
    },
    errorBorder: {
        border: "2px solid red !important",
    },
    captcha: {
        width: "100% !important",
        borderRadius: "5px",
        maxHeight: '75px',
    }
}));

interface LoginFormValues {
    username: string;
    password: string;
}

const Login = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const {theme} = useThemeContext();

    const AuthDispatch = useAuthDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {loginUser} = new Account();
    const navigate = useNavigate();
    const location = useLocation();

    const {mutate} = useMutation(loginUser, {
        onSuccess: async (data) => {
            setIsLoading(false);
            if (data !== undefined) {
                setItemSecure("mainToken", data.data.token);
                setItemSecure("userRoleName", data.data.userRoleName);
                setItemSecure("province", data.data?.province);
                AuthDispatch({
                    type: "LOGIN_SUCCESS", payload: {
                        isAdmin: data.data.userRoleName === 'Admin',
                        isSuperAdmin: data.data.userRoleName === 'SuperAdmin',
                    }
                });
                if (location?.state?.from) {
                    navigate(location.state.from);
                } else {
                    navigate(`${routes.aeds}`);
                }
            }
        },
        onError: async (error: any) => {
            // console.log(error)
            setIsLoading(false);
            if (error.code === "ERR_NETWORK")
                tError(error?.message);
            else
                tError(error?.response?.data?.Message);
        },
    });

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("وارد کردن نام کاربری ضروری است"),
        password: Yup.string()
            .required("وارد کردن کلمه عبور ضروری است"),
    });

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: LoginSchema,

        onSubmit: async (values): Promise<any> => {
            setIsLoading(true);
            mutate({
                userName: values.username,
                password: values.password,
            });
        },
    });

    useEffect(() => {
        const booleanCookie: boolean = getCookie("remember") === "true";
        formik.setFieldValue("rememberMe", booleanCookie);

        if (
            booleanCookie &&
            getCookie("usrname") !== "" &&
            getCookie("pwd") !== ""
        ) {
            formik.setFieldValue("username", getCookie("usrname"));
            formik.setFieldValue("password", getCookie("pwd"));
        }
    }, []);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () =>
        setIsVisiblePassword(!isVisiblePassword);

    return (
        <LoginTemplate>
            <Typography className={classes.title} data-testid={"login-form"}>
                💻 Saadat AED Management
            </Typography>{" "}
            <form style={{direction: 'ltr'}} className={classes.formContainer} onSubmit={formik.handleSubmit}>
                <InputLabel htmlFor="username">
                    <Typography className={classes.inputLabel}>
                        Username
                    </Typography>
                </InputLabel>
                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    autoComplete="username"
                    sx={{
                        mb: 3,
                    }}
                    {...formik.getFieldProps("username")}
                    inputProps={{
                        sx: {
                            borderRadius: "10px",
                            fontSize: "18px",
                            paddingRight: 1,
                            height: "25px",
                            direction: "ltr",
                            textAlign: "left",
                        },
                    }}
                    className={clsx({
                        [classes.errorBorder]:
                        formik.errors.username && formik.touched.username,
                    })}
                />
                {formik.errors.username && formik.touched.username ? (
                    <Typography className={clsx(classes.errorText, "errorMessage")}>
                        {formik.errors.username}
                    </Typography>
                ) : null}
                <InputLabel htmlFor="password">
                    <Typography className={classes.inputLabel}>
                        Password
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
                            textAlign: "left",
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

                <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                        "&.Mui-disabled": {
                            background: theme.palette.themeLight.main,
                            color: theme.palette.themeLightText.main,
                        },
                        mt: 2,
                        mb: 2,
                        height: "40px",
                    }}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    {
                        isLoading ? <ReactLoading
                                delay={10}
                                type="cylon"
                                color={theme.palette.primaryColor.main}
                            /> :
                            <Typography className={clsx(classes.fontCustum)}
                                        sx={{fontWeight: 'bold', textTransform: 'none'}}>
                                {" 🔑 "}
                                Login
                            </Typography>
                    }
                </Button>
            </form>
        </LoginTemplate>
    );
};
export default Login;
