import Container from "@mui/material/Container";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Box, Collapse, InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import {useStyles} from "../../assets/scss/timeFilterStyle";
import {FieldArray, Formik, getIn, useFormik} from "formik";
import Button from "@mui/material/Button";
import {useMutation} from "react-query";
import {tError, tSuccess} from "../../utils/ToastUtils/toast";
import MySelect from "../../components/MySelect/MySelect";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyDateTimePicker from "../../components/DateTimePicker Jalali/DateTimePicker";
import {removeCharsAfterZ} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import Aed from "../../services/Aed";
import {convertTimeToLocale} from "../../utils/TimeUtils/time";
import MapComponent from "../../components/map/MapComponent";
import {
    AddAedSchema,
    AedType,
    BatteryTypes,
    StyledTextField,
    NewAedProps,
    NewAedHandle,
    DEFAULT_AED_INFORMATION
} from "./constants";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {truncateText} from "../../utils/General/generalUtils";
import Attachment from "../../services/Attachment";


const NewAed = forwardRef<NewAedHandle, NewAedProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postNewAedForm, editAedForm} = new Aed();
    const {downloadAttachment} = new Attachment();
    const [openMapSection, setOpenMapSection] = useState(false);
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


    useImperativeHandle(ref, () => ({
        sendRequest,
    }));

    const sendRequest = () => {
        submitBtnRef.current.click();
    }

    const handleDownloadClicked = (id: any) => {
        downloadAttachment(id).then();
    }

    return (
        <div className={classes.BgContainer}>
            <Container className={classes.mainContainer}>
                <Formik
                    initialValues={data || DEFAULT_AED_INFORMATION}
                    validationSchema={AddAedSchema}
                    onSubmit={async (values): Promise<any> => {
                        if (values.id === '0') {
                            // @ts-ignore
                            delete values.id;
                            addAed(values);
                        } else {
                            editAed(values);
                        }
                    }}
                >
                    {(formik) => (
                        <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
                            <InputLabel htmlFor="serialNumber">
                                <Typography className={classes.inputLabel}>
                                    🔢 Serial Number*
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

                            <br/>

                            <InputLabel htmlFor="registerDateTime">
                                <Typography className={classes.inputLabel}>📅 Register DateTime*</Typography>
                            </InputLabel>
                            <br/>
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

                            <InputLabel htmlFor="aedBatteryType">
                                <Typography className={classes.inputLabel}>
                                    🔋 Battery Type
                                </Typography>
                            </InputLabel>
                            <br/>
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

                            <br/>
                            <br/>

                            <InputLabel htmlFor="place">
                                <Typography className={classes.inputLabel}>📍 Place Name*</Typography>
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

                            <InputLabel htmlFor="address">
                                <Typography className={classes.inputLabel}>
                                    🗺️ Location Address*
                                </Typography>
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="address"
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{mb: 3}}
                                {...formik.getFieldProps("address")}
                            />
                            {formik.errors.address && formik.touched.address && (
                                <Typography className={classes.errorText}>
                                    {formik.errors.address}
                                </Typography>
                            )}

                            <InputLabel>
                                <Typography>📎 Attachments (Optional)</Typography>
                            </InputLabel>
                            <br/>
                            <FieldArray
                                name="attachments"
                                render={(arrayHelpers) => (
                                    <div>
                                        {formik.values.attachments && formik.values.attachments.length > 0 ? (
                                            formik.values.attachments.map((attachment, index) => {
                                                const nameTouched = getIn(formik.touched, `attachments.${index}.name`);
                                                const nameError = getIn(formik.errors, `attachments.${index}.name`);

                                                const fileTouched = getIn(formik.touched, `attachments.${index}.file`);
                                                const fileError = getIn(formik.errors, `attachments.${index}.file`);

                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            marginBottom: 20,
                                                            padding: 10,
                                                            border: "1px solid #ccc",
                                                            borderRadius: 8,
                                                        }}
                                                    >
                                                        <StyledTextField
                                                            fullWidth
                                                            label="Name (optional)"
                                                            name={`attachments.${index}.fileName`}
                                                            value={formik.values.attachments![index]?.fileName || ""}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            error={Boolean(nameTouched && nameError)}
                                                            helperText={nameTouched && nameError}
                                                            margin="normal"
                                                        />

                                                        <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                                            {
                                                                (formik.values.attachments![index]?.id)
                                                                    ? (
                                                                        <Button sx={{textTransform: "none"}}
                                                                                onClick={() => handleDownloadClicked(formik.values.attachments![index]?.id)}
                                                                                variant="contained"
                                                                                component="span"
                                                                                startIcon={<DownloadIcon/>}>
                                                                            Download File
                                                                        </Button>
                                                                    ) : (
                                                                        <label htmlFor={`attachment-file-${index}`}>
                                                                            <Button sx={{textTransform: "none"}}
                                                                                    variant="contained"
                                                                                    component="span"
                                                                                    startIcon={<UploadFileIcon/>}>
                                                                                Upload File
                                                                            </Button>
                                                                        </label>
                                                                    )
                                                            }

                                                            <input
                                                                id={`attachment-file-${index}`}
                                                                name={`attachments.${index}.file`}
                                                                type="file"
                                                                accept=".xls,.xlsx,.csv,.rar,image/*,application/pdf"
                                                                onChange={(event) => {
                                                                    const file = event.currentTarget.files?.[0];
                                                                    formik.setFieldValue(`attachments.${index}.file`, file);

                                                                    if (!formik.values.attachments![index]?.fileName && file)
                                                                        formik.setFieldValue(`attachments.${index}.fileName`, file.name);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                style={{display: "none"}}
                                                            />

                                                            <Typography variant="body2" style={{
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                maxWidth: 150
                                                            }}>
                                                                {formik.values.attachments![index]?.fileName
                                                                    ? truncateText(formik.values.attachments![index]?.fileName, 50)
                                                                    : "No file chosen"}
                                                            </Typography>
                                                        </div>
                                                        {fileTouched && fileError && (
                                                            <Typography color="error" variant="caption">
                                                                {fileError}
                                                            </Typography>
                                                        )}

                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => {
                                                                arrayHelpers.remove(index)
                                                            }}
                                                            style={{
                                                                marginTop: 22,
                                                                textTransform: "none",
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            - Remove
                                                        </Button>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <Typography>⚠️ No attachments added.</Typography>
                                        )}

                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => arrayHelpers.push({name: "", file: null})}
                                            style={{marginTop: 16, fontSize: '0.9rem', textTransform: "none"}}
                                        >
                                            + Add Attachment
                                        </Button>
                                    </div>
                                )}
                            />

                            <Box sx={{mt: 2, mb: 2, borderTop: '1px solid #ccc', pt: 2}}>
                                <Button
                                    variant="text"
                                    onClick={() => setOpenMapSection((prev) => !prev)}
                                    endIcon={
                                        <ExpandMoreIcon
                                            sx={{
                                                transform: openMapSection ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        />
                                    }
                                    sx={{textTransform: 'none', fontWeight: 'bold', fontSize: '1.1rem'}}
                                >
                                    📌 Location*
                                </Button>

                                <Collapse in={openMapSection} timeout="auto" unmountOnExit>
                                    <Box sx={{height: '100%', mt: 2}}>
                                        <MapComponent setAddr={(text) => {
                                            if (data.id === '0' && data.address?.trim() === '')
                                                formik.setFieldValue("address", text)
                                        }}
                                                      city={data.city}
                                                      setCity={(data: any) => formik.setFieldValue("city", data)}
                                                      provin={data.province}
                                                      setPosition={(data: any) => formik.setFieldValue("position", data)}
                                                      initialPosition={data.position}
                                        />
                                    </Box>
                                </Collapse>
                            </Box>

                            <Button
                                ref={submitBtnRef}
                                type="submit"
                                hidden={true}
                            />

                        </form>
                    )}
                </Formik>
            </Container>
        </div>
);
});
export default NewAed;
