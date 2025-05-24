import Container from "@mui/material/Container";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
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
import NonConformity from "../../services/NonConformity";
import {NewPartHandle, PartType} from "./constants";
import Part from "../../services/Part";



const AddPartSchema = Yup.object().shape({
    name: Yup.string()
        .required("⛔ Name is required!"),
    partNumber: Yup.string()
        .required("⛔ Part Number is required!"),
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


interface NewPartProps {
    data: PartType;
    closeModal: () => void;
}

const NewPart = forwardRef<NewPartHandle, NewPartProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postPart, editPart} = new Part();

    const {mutate: addPart} = useMutation(postPart, {
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

    const {mutate: editPartCmd} = useMutation(editPart, {
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


    const formik = useFormik<PartType>({
        initialValues: data,
        validationSchema: AddPartSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === 0) {
                // @ts-ignore
                delete values.id;
                addPart(values);
            } else {
                editPartCmd(values);
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
                    <InputLabel htmlFor="name">
                        <Typography className={classes.inputLabel}>
                            📝 Name
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="name"
                        autoComplete="name"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("name")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.name && formik.touched.name,
                        })}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.name}
                        </Typography>
                    ) : null}

                    <br/>

                    <InputLabel htmlFor="partNumber">
                        <Typography className={classes.inputLabel}>
                            🔢 Part Number
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="partNumber"
                        autoComplete="partNumber"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("partNumber")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.partNumber && formik.touched.partNumber,
                        })}
                    />
                    {formik.errors.partNumber && formik.touched.partNumber ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.partNumber}
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
export default NewPart;
