import * as Yup from "yup";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export type UserType = {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    isActive: boolean;
    province: string;
    isInterProvinceRepairExpert: boolean;
};

export const DEFAULT_USER_INFORMATION: UserType = {
    id: 0,
    userName: "",
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    isActive: true,
    province: 'Tehran',
    isInterProvinceRepairExpert: false,
};

export interface NewUserHandle {
    sendRequest: () => void;
}

export interface NewUserProps {
    data: UserType;
    closeModal: () => void;
}

export const AddUserSchema = Yup.object().shape({
    userName: Yup.string().required("⛔ Username is required!"),
    fullName: Yup.string().required("⛔ FullName is required!"),
    password: Yup.string()
        .min(8, "⛔ Password must be at least 8 characters long.")
        .max(20, "⛔ Password length is too long")
        .required("⛔ Password is required"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "⛔ Password and confirmation must match.")
        .required("⛔ Password Confirm is required."),
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "⛔ Email address is invalid."
        )
        .required("⛔ Email address is required"),

});

export const EditUserSchema = Yup.object().shape({
    userName: Yup.string().required("⛔ Username is required!"),
    fullName: Yup.string().required("⛔ FullName is required!"),
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "⛔ Email address is invalid."
        )
        .required("⛔ Email address is required"),
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
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
