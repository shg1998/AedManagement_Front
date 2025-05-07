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
import {useMutation, useQuery} from "react-query";
import {tError, tSuccess} from "../../utils/toast";
import {styled} from "@mui/material/styles";
import MySelect from "../../components/MySelect/MySelect";
import Autocomplete from "@mui/material/Autocomplete";
import MyDateTimePicker from "../../components/DateTimePicker Jalali/DateTimePicker";
import {removeCharsAfterZ} from "../../components/CustomDateTimeFilter/DateTimeFilter";
import Aed from "../../services/Aed";
import {convertTimeToLocale} from "../../utils/time";
import {
    AedServiceType,
    CorrectiveActionGroupTypes,
    CostTypes,
    NewAedHandle,
    NewAedProps,
    NonConformityType,
    UserType
} from "./constants";
import {debounce} from "lodash";
import Users from "../../services/Users";
import NonConformity from "../../services/NonConformity";

const AedServiceSchema = Yup.object().shape({
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

const NewAedService = forwardRef<NewAedHandle, NewAedProps>(({data, closeModal}, ref) => {
    const classes = useStyles();
    const submitBtnRef = useRef<any>();
    const {postNewAedForm, editAedForm} = new Aed();
    const {getUsers} = new Users();
    const {getAll} = new NonConformity();
    const [searchUser, setSearchUser] = useState('');
    const [searchNonConformity, setSearchNonConformity] = useState('');

    const debouncedUserSearch = useRef(debounce((val) => {
        setSearchUser(val);
    }, 500)).current;

    const debouncedNonConformitySearch = useRef(debounce((val) => {
        setSearchNonConformity(val);
    }, 500)).current;

    const { data: userOptions = [], isLoading } = useQuery<UserType[]>(
        ['user-search', searchUser],
        async () => {
           const res = await getUsers(100, 0, `contains(fullName,'${searchUser}')`);
           return (res.data.data).map((r: any) => {
               return {
                   id: r.id,
                   fullName: r.fullName
               }
           });
        },
        {
            staleTime: 0,
            cacheTime: 0,
        }
    );

    const { data: nonConformityOptions = [], isLoading: isNonLoading } = useQuery<NonConformityType[]>(
        ['non-conformity-search', searchNonConformity],
        async () => {
            const res = await getAll(10, 0, `contains(title,'${searchNonConformity}')`);
            return (res.data.data).map((r: any) => {
                return {
                    id: r.id,
                    title: r.title
                }
            });
        },
        {
            staleTime: 0,
            cacheTime: 0,
        }
    );

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


    const formik = useFormik<AedServiceType>({
        initialValues: data,
        validationSchema: AedServiceSchema,
        onSubmit: async (values): Promise<any> => {
            if (values.id === '0') {
                // @ts-ignore
                delete values.id;
                // addAed(values);
            } else {
                // editAed(values);
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
                    <InputLabel htmlFor="correctiveActionGroup">
                        <Typography className={classes.inputLabel}>
                            ⚒️ Corrective Action Group
                        </Typography>
                    </InputLabel>
                    <br/>
                    <MySelect
                        label=""
                        formik={formik}
                        items={CorrectiveActionGroupTypes}
                        {...formik.getFieldProps("correctiveActionGroup")}
                    />
                    {formik.errors.correctiveActionGroup && formik.touched.correctiveActionGroup ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.correctiveActionGroup}
                        </Typography>
                    ) : null}
                    <br/>
                    <br/>
                    <InputLabel htmlFor="callDate">
                        <Typography className={classes.inputLabel}>📅 Call DateTime</Typography>
                    </InputLabel>
                    <br/>
                    <MyDateTimePicker
                        required
                        name="callDate"
                        blur={() => {
                        }}
                        value={convertTimeToLocale(formik.values.callDate)}
                        onChangeFunc={(d: any) => {
                            const formattedDate = d ? removeCharsAfterZ(d) : "";
                            formik.setFieldValue('callDate', formattedDate);
                        }}
                    />
                    {formik.errors.callDate && formik.touched.callDate ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.callDate}
                        </Typography>
                    ) : null}
                    <br/>

                    <InputLabel htmlFor="visitDate">
                        <Typography className={classes.inputLabel}>📅 Visit DateTime</Typography>
                    </InputLabel>
                    <br/>
                    <MyDateTimePicker
                        required
                        name="visitDate"
                        blur={() => {
                        }}
                        value={convertTimeToLocale(formik.values.visitDate)}
                        onChangeFunc={(d: any) => {
                            const formattedDate = d ? removeCharsAfterZ(d) : "";
                            formik.setFieldValue('visitDate', formattedDate);
                        }}
                    />
                    {formik.errors.visitDate && formik.touched.visitDate ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.visitDate}
                        </Typography>
                    ) : null}
                    <br/>

                    <InputLabel htmlFor="userId">
                        <Typography className={classes.inputLabel}>
                            👤 Expert
                        </Typography>
                    </InputLabel>
                    <Autocomplete
                        disablePortal
                        options={userOptions}
                        loading={isLoading}
                        getOptionLabel={(option) => option?.fullName ?? ""}
                        onInputChange={(_, value) => {
                            debouncedUserSearch(value);
                        }}
                        onChange={(_, newValue) => {
                            formik.setFieldValue('userId', newValue ? newValue.id : '');
                        }}
                        renderInput={(params) => (
                            <StyledTextField
                                {...params}
                                placeholder="Search expert..."
                            />
                        )}
                    />

                    <InputLabel htmlFor="nonConformityId">
                        <Typography className={classes.inputLabel}>
                            😖 Non Conformity
                        </Typography>
                    </InputLabel>
                    <Autocomplete
                        disablePortal
                        options={nonConformityOptions}
                        loading={isNonLoading}
                        getOptionLabel={(option) => option?.title ?? ""}
                        onInputChange={(_, value) => {
                            debouncedNonConformitySearch(value);
                        }}
                        onChange={(_, newValue) => {
                            formik.setFieldValue('nonConformityId', newValue ? newValue.id : '');
                        }}
                        renderInput={(params) => (
                            <StyledTextField
                                {...params}
                                placeholder="Search Non Conformity..."
                            />
                        )}
                    />

                    <InputLabel htmlFor="cost">
                        <Typography className={classes.inputLabel}>
                            💰 Cost
                        </Typography>
                    </InputLabel>
                    <br/>
                    <MySelect
                        label=""
                        formik={formik}
                        items={CostTypes}
                        {...formik.getFieldProps("cost")}
                    />
                    {formik.errors.cost && formik.touched.cost ? (
                        <Typography className={clsx(classes.errorText, "errorMessage")}>
                            {formik.errors.cost}
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
export default NewAedService;
