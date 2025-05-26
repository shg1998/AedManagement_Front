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
import RepairType from "../../services/RepairType";
import {NewRepairTypeHandle, RepairTypeType} from "./constants";



const AddRepairTypeSchema = Yup.object().shape({
    title: Yup.string()
        .required("⛔ Title is required!"),
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


interface NewRepairTypeProps {
    data: RepairTypeType;
    closeModal: () => void;
}

const NewRepairType = forwardRef<NewRepairTypeHandle, NewRepairTypeProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postNewRepairTypeForm, editRepairTypeForm} = new RepairType();

    const {mutate: addRepairType} = useMutation(postNewRepairTypeForm, {
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

    const {mutate: editRepairType} = useMutation(editRepairTypeForm, {
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


    const formik = useFormik<RepairTypeType>({
        initialValues: data,
        validationSchema: AddRepairTypeSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === '0') {
                // @ts-ignore
                delete values.id;
                addRepairType(values);
            } else {
                editRepairType(values);
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
                    <InputLabel htmlFor="title">
                        <Typography className={classes.inputLabel}>
                            📝 Title
                        </Typography>
                    </InputLabel>
                    <StyledTextField
                        margin="normal"
                        fullWidth
                        id="title"
                        autoComplete="title"
                        sx={{
                            mb: 3,
                        }}
                        {...formik.getFieldProps("title")}
                        className={clsx({
                            [classes.errorBorder]:
                            formik.errors.title && formik.touched.title,
                        })}
                    />
                    {formik.errors.title && formik.touched.title ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.title}
                        </Typography>
                    ) : null}

                    <br/>

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
export default NewRepairType;
