import {convertTimeToLocale2} from "../../utils/TimeUtils/time";
import {ItemType} from "../../components/MySelect/MySelect";
import * as Yup from "yup";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {AttachmentType} from "../AedServices/constants";

export const DEFAULT_AED_INFORMATION: AedType = {
    id: '0',
    serialNumber: '',
    province: 'Tehran',
    city: 'تهران',
    address: '',
    place: '',
    registerDateTime: convertTimeToLocale2(Date()),
    aedBatteryType: 'Chargeable',
    position: [35.6892, 51.389],
    attachments: [],
    isActive: true
}

export const testOptions = [
    {label: "No Wifi", value: "NoWifi"},
    {label: "Passed", value: "Pass"},
    {label: "Failed", value: "Fail"},
    {label: "Disconnected", value: "Disconnected"}
];

export
const BatteryTypes: ItemType[] = [
    {
        value: 'NonChargeable', title: 'Non Chargeable'
    },
    {
        value: 'Chargeable', title: 'Chargeable'
    }
]

export const AddAedSchema = Yup.object().shape({
    serialNumber: Yup.string()
        .required("⛔ Serial Number is required!"),

    address: Yup.string()
        .required("⛔ Address is required!"),

    place: Yup.string()
        .required("⛔ Place is required!"),

    registerDateTime: Yup.string()
        .required("⛔ Register DateTime is required!")
        .test("is-valid-date", "⛔ Invalid date format.", (value: any) => {
            return value && !isNaN(Date.parse(value));
        }),
    position: Yup.array()
        .of(Yup.number())
        .length(2, "⛔ Position must include latitude and longitude")
        .required("⛔ Selecting a position on the map is required"),
    attachments: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().nullable(),
            file: Yup.mixed()
                .nullable()
                .test(
                    "fileFormat",
                    "⛔ Unsupported file format. Allowed: Excel, CSV, RAR, images, PDF.",
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


export const StyledTextField = styled(TextField)(({theme}) => ({
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

export interface NewAedHandle {
    sendRequest: () => void;
}

export type AedType = {
    id: string;
    serialNumber: string;
    province: string;
    city: string;
    address: string;
    place: string;
    registerDateTime: string;
    aedBatteryType: string;
    position?: [number, number] | null;
    attachments? : AttachmentType[],
    isActive: boolean,
}

export interface NewAedProps {
    data: AedType;
    closeModal: () => void;
}