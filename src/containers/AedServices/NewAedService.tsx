import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Container from "@mui/material/Container";
import {InputLabel, Typography, TextField, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Formik, FieldArray, getIn} from "formik";
import * as Yup from "yup";
import {useMutation, useQuery} from "react-query";
import {debounce} from "lodash";
import UploadFileIcon from '@mui/icons-material/UploadFile'
import MySelect from "../../components/MySelect/MySelect";
import Autocomplete from "@mui/material/Autocomplete";
import MyDateTimePicker from "../../components/DateTimePicker Jalali/DateTimePicker";
import {removeCharsAfterZ} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import {tError, tSuccess} from "../../utils/toast";
import AedService from "../../services/AedService";
import Users from "../../services/Users";
import NonConformity from "../../services/NonConformity";
import Part from "../../services/Part";

import {
    CorrectiveActionGroupTypes,
    CostTypes,
    NewAedHandle,
    NewAedProps,
    NonConformityType,
    PartType,
    UserType,
} from "./constants";
import {useLocation} from "react-router-dom";
import {truncateText} from "../../utils/generalUtils";

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

const AedServiceSchema = Yup.object().shape({
    userId: Yup.number()
        .typeError("⛔ Expert selection is required!")
        .required("⛔ Expert selection is required!")
        .notOneOf([0], "⛔ Please select a valid Expert."),
    nonConformityId: Yup.string().required("⛔ Non Conformity selection is required!"),
    description: Yup.string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .nullable(),
    replacementParts: Yup.array().of(
        Yup.object().shape({
            prevSerialNumber: Yup.string().required("Previous Serial Number is required"),
            newSerialNumber: Yup.string().required("New Serial Number is required"),
            prevPartId: Yup.number().notOneOf([0], "Please select a valid Previous Part"),
            newPartId: Yup.number().notOneOf([0], "Please select a valid New Part"),
        })
    ),
    attachments: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().nullable(),
            file: Yup.mixed()
                .nullable()
                .test(
                    "fileFormat",
                    "Unsupported file format. Allowed: Excel, CSV, RAR, images, PDF.",
                    (value) => {
                        if (!value) return true;
                        const allowedTypes = [
                            "application/pdf",
                            "application/vnd.ms-excel",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "application/x-rar-compressed",
                            "text/csv",
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                            "image/bmp",
                            "image/webp",
                        ];
                        if (!value) return true;
                        if (typeof value === "object" && "type" in value) {
                            return allowedTypes.includes((value as File).type);
                        }
                        return false;
                    }
                ),
        })
    ),
});

const NewAedService = forwardRef<NewAedHandle, NewAedProps>(({data, closeModal}, ref) => {
    const submitBtnRef = useRef<any>();
    const {postNewAedServiceForm, editAedServiceForm} = new AedService();
    const {getUsers} = new Users();
    const {getAll} = new NonConformity();
    const {getAllParts} = new Part();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const aedId = searchParams.get('id');

    const [searchUser, setSearchUser] = useState("");
    const [searchNonConformity, setSearchNonConformity] = useState("");
    const [user, setUser] = useState(data.user ?? {});
    const [nonConformity, setNonConformity] = useState(data.nonConformity ?? {});

    const debouncedUserSearch = React.useRef(
        debounce((val) => {
            setSearchUser(val);
        }, 500)
    ).current;

    const debouncedNonConformitySearch = React.useRef(
        debounce((val) => {
            setSearchNonConformity(val);
        }, 500)
    ).current;

    const {data: userOptions = [], isLoading} = useQuery<UserType[]>(
        ["user-search", searchUser],
        async () => {
            const res = await getUsers(100, 0, `contains(fullName,'${searchUser}')`);
            return res.data.data.map((r: any) => ({
                id: r.id,
                fullName: r.fullName,
            }));
        },
        {staleTime: 0, cacheTime: 0}
    );

    const {data: nonConformityOptions = [], isLoading: isNonLoading} = useQuery<NonConformityType[]>(
        ["non-conformity-search", searchNonConformity],
        async () => {
            const res = await getAll(10, 0, `contains(title,'${searchNonConformity}')`);
            return res.data.data.map((r: any) => ({
                id: r.id,
                title: r.title,
            }));
        },
        {staleTime: 0, cacheTime: 0}
    );

    const {data: partOptions = [], isLoading: isPartLoading} = useQuery<PartType[]>(
        ["parts-search"],
        async () => {
            const res = await getAllParts(20, 0);
            return res.data.data.map((r: any) => ({
                id: r.id,
                name: r.name,
                partNumber: r.partNumber,
            }));
        },
        {staleTime: 0, cacheTime: 0}
    );

    const {mutate: addAedService} = useMutation(postNewAedServiceForm, {
        onSuccess: (data) => {
            if (data?.isSuccess) {
                closeModal();
                tSuccess(data?.data);
            }
        },
        onError: (error: any) => {
            closeModal();
            tError(error.response.data.Message);
        },
    });

    const {mutate: editAedService} = useMutation(editAedServiceForm, {
        onSuccess: (data) => {
            if (data?.isSuccess) {
                closeModal();
                tSuccess(data?.data);
            }
        },
        onError: (error: any) => {
            closeModal();
            tError(error.response.data.Message);
        },
    });

    useImperativeHandle(ref, () => ({
        sendRequest,
    }));

    const sendRequest = () => {
        submitBtnRef.current.click();
    };


    return (
        <Container>
            <Formik
                initialValues={{
                    ...data,
                    replacementParts: data?.replacementParts ?? [],
                    aedId: aedId
                }}
                validationSchema={AedServiceSchema}
                onSubmit={async (values) => {
                    if (values.id === "0") {
                        // @ts-ignore
                        delete values.id;
                        console.log(values)
                        addAedService(values);
                    } else {
                        editAedService(values);
                    }
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {/* Corrective Action Group */}
                        <br/>
                        <InputLabel htmlFor="correctiveActionGroup">
                            <Typography>⚒️ Corrective Action Group</Typography>
                        </InputLabel>
                        <MySelect
                            label=""
                            formik={formik}
                            items={CorrectiveActionGroupTypes}
                            {...formik.getFieldProps("correctiveActionGroup")}
                        />
                        {formik.errors.correctiveActionGroup && formik.touched.correctiveActionGroup && (
                            <Typography color="error" variant="caption">
                                {formik.errors.correctiveActionGroup}
                            </Typography>
                        )}

                        <br/>
                        <br/>
                        {/* Call Date */}
                        <InputLabel htmlFor="callDate">
                            <Typography>📅 Call DateTime</Typography>
                        </InputLabel>
                        <MyDateTimePicker
                            required
                            name="callDate"
                            value={formik.values.callDate}
                            onChangeFunc={(d: any) => {
                                const formattedDate = d ? removeCharsAfterZ(d) : "";
                                formik.setFieldValue("callDate", formattedDate);
                            }}
                            blur={() => {
                            }}
                        />
                        {formik.errors.callDate && formik.touched.callDate && (
                            <Typography color="error" variant="caption">
                                {formik.errors.callDate}
                            </Typography>
                        )}
                        <br/>
                        {/* Visit Date */}
                        <InputLabel htmlFor="visitDate">
                            <Typography>📅 Visit DateTime</Typography>
                        </InputLabel>
                        <MyDateTimePicker
                            required
                            name="visitDate"
                            value={formik.values.visitDate}
                            onChangeFunc={(d: any) => {
                                const formattedDate = d ? removeCharsAfterZ(d) : "";
                                formik.setFieldValue("visitDate", formattedDate);
                            }}
                            blur={() => {
                            }}
                        />
                        {formik.errors.visitDate && formik.touched.visitDate && (
                            <Typography color="error" variant="caption">
                                {formik.errors.visitDate}
                            </Typography>
                        )}
                        <br/>
                        {/* Expert */}
                        <InputLabel htmlFor="userId">
                            <Typography>👤 Expert</Typography>
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            options={userOptions}
                            loading={isLoading}
                            value={user}
                            getOptionLabel={(option) => option?.fullName ?? ""}
                            onInputChange={(_, value) => {
                                debouncedUserSearch(value);
                            }}
                            onChange={(_, newValue) => {
                                formik.setFieldValue("userId", newValue ? newValue.id : 0);
                                setUser(newValue);
                            }}
                            renderInput={(params) => <StyledTextField {...params} placeholder="Search expert..."/>}
                        />
                        {formik.errors.userId && formik.touched.userId && (
                            <Typography color="error" variant="caption">
                                {formik.errors.userId}
                            </Typography>
                        )}

                        {/* Non Conformity */}
                        <InputLabel htmlFor="nonConformityId">
                            <Typography>😖 Non Conformity</Typography>
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            options={nonConformityOptions}
                            loading={isNonLoading}
                            value={nonConformity}
                            getOptionLabel={(option) => option?.title ?? ""}
                            onInputChange={(_, value) => {
                                debouncedNonConformitySearch(value);
                            }}
                            onChange={(_, newValue) => {
                                formik.setFieldValue("nonConformityId", newValue ? newValue.id : "");
                                setNonConformity(newValue);
                            }}
                            renderInput={(params) => <StyledTextField {...params}
                                                                      placeholder="Search Non Conformity..."/>}
                        />
                        {formik.errors.nonConformityId && formik.touched.nonConformityId && (
                            <Typography color="error" variant="caption">
                                {formik.errors.nonConformityId}
                            </Typography>
                        )}

                        {/* Cost */}
                        <InputLabel htmlFor="cost">
                            <Typography>💰 Cost</Typography>
                        </InputLabel>
                        <MySelect
                            label=""
                            formik={formik}
                            items={CostTypes}
                            {...formik.getFieldProps("cost")}
                        />
                        {formik.errors.cost && formik.touched.cost && (
                            <Typography color="error" variant="caption">
                                {formik.errors.cost}
                            </Typography>
                        )}

                        <br/>
                        <br/>

                        {/* Description */}
                        <InputLabel htmlFor="description">
                            <Typography>📝 Description</Typography>
                        </InputLabel>
                        <StyledTextField
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter description..."
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        <InputLabel>
                            <Typography>⚙️ Replacement Parts</Typography>
                        </InputLabel>
                        <br/>
                        {/* Replacement Parts - FieldArray */}
                        <FieldArray
                            name="replacementParts"
                            render={(arrayHelpers) => (
                                <div>
                                    {formik.values.replacementParts && formik.values.replacementParts.length > 0 ? (
                                        formik.values.replacementParts.map((part, index) => {
                                            const prevSerialTouched = getIn(formik.touched, `replacementParts.${index}.prevSerialNumber`);
                                            const prevSerialError = getIn(formik.errors, `replacementParts.${index}.prevSerialNumber`);

                                            const newSerialTouched = getIn(formik.touched, `replacementParts.${index}.newSerialNumber`);
                                            const newSerialError = getIn(formik.errors, `replacementParts.${index}.newSerialNumber`);

                                            const prevPartIdTouched = getIn(formik.touched, `replacementParts.${index}.prevPartId`);
                                            const prevPartIdError = getIn(formik.errors, `replacementParts.${index}.prevPartId`);

                                            const newPartIdTouched = getIn(formik.touched, `replacementParts.${index}.newPartId`);
                                            const newPartIdError = getIn(formik.errors, `replacementParts.${index}.newPartId`);

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
                                                        label="Previous Serial Number"
                                                        name={`replacementParts.${index}.prevSerialNumber`}
                                                        value={formik.values.replacementParts[index].prevSerialNumber || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={Boolean(prevSerialTouched && prevSerialError)}
                                                        helperText={prevSerialTouched && prevSerialError}
                                                        margin="normal"
                                                    />

                                                    <StyledTextField
                                                        fullWidth
                                                        label="New Serial Number"
                                                        name={`replacementParts.${index}.newSerialNumber`}
                                                        value={formik.values.replacementParts[index].newSerialNumber || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={Boolean(newSerialTouched && newSerialError)}
                                                        helperText={newSerialTouched && newSerialError}
                                                        margin="normal"
                                                    />

                                                    <InputLabel>Previous Part</InputLabel>
                                                    <MySelect
                                                        label=""
                                                        formik={formik}
                                                        items={partOptions.map((p) => ({
                                                            value: p.id,
                                                            label: p.name,
                                                            id: p.id,
                                                            title: p.name
                                                        }))}
                                                        {...formik.getFieldProps(`replacementParts.${index}.prevPartId`)}
                                                    />
                                                    {prevPartIdTouched && prevPartIdError && (
                                                        <Typography color="error" variant="caption">
                                                            {prevPartIdError}
                                                        </Typography>
                                                    )}

                                                    <InputLabel>New Part</InputLabel>
                                                    <MySelect
                                                        label=""
                                                        formik={formik}
                                                        items={partOptions.map((p) => ({
                                                            value: p.id,
                                                            label: p.name,
                                                            id: p.id,
                                                            title: p.name
                                                        }))}
                                                        {...formik.getFieldProps(`replacementParts.${index}.newPartId`)}
                                                    />
                                                    {newPartIdTouched && newPartIdError && (
                                                        <Typography color="error" variant="caption">
                                                            {newPartIdError}
                                                        </Typography>
                                                    )}

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        style={{
                                                            marginTop: 8,
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
                                        <Typography>⚠️ No replacement parts added.</Typography>
                                    )}

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                prevSerialNumber: "",
                                                newSerialNumber: "",
                                                prevPartId: 0,
                                                newPartId: 0,
                                            })
                                        }
                                        style={{
                                            marginTop: 16,
                                            fontSize: '0.9rem',
                                            textTransform: "none"
                                        }}
                                    >
                                        + Add Replacement Part
                                    </Button>
                                </div>
                            )}
                        />
                        <br/><br/>
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
                                                        <label htmlFor={`attachment-file-${index}`}>
                                                            <Button sx={{textTransform: "none",}} variant="contained"
                                                                    component="span"
                                                                    startIcon={<UploadFileIcon/>}>
                                                                Upload File
                                                            </Button>
                                                        </label>

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
                                                        onClick={() => arrayHelpers.remove(index)}
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

                        <Button ref={submitBtnRef} type="submit" hidden/>
                    </form>
                )}
            </Formik>
        </Container>
    );
});

export default NewAedService;
