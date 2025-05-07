import {convertTimeToLocale2} from "../../utils/time";
import {ItemType} from "../../components/MySelect/MySelect";

export const correctiveActionOptions = [
    {label: "Repair", value: "Repair"},
    {label: "Pm", value: "Pm"},
    {label: "Recall", value: "Recall"},
    {label: "Upgrade", value: "Upgrade"},
    {label: "Training", value: "Training"}
];

export type ReplacementPartType = {
    prevSerialNumber: string;
    newSerialNumber: string;
    prevPartId: number;
    newPartId: number;
}

export type AedServiceType = {
    id: string;
    correctiveActionGroup: string;
    visitDate: string;
    callDate: string;
    description?: string;
    cost: string;
    userId: number;
    aedId: string;
    nonConformityId: string;
    replacementParts?: ReplacementPartType[]
}

export const DEFAULT_AED_SERVICE_INFORMATION: AedServiceType = {
    id: '0',
    correctiveActionGroup: 'Repair',
    visitDate: convertTimeToLocale2(Date()),
    callDate: convertTimeToLocale2(Date()),
    description: '',
    cost: 'Free',
    userId: 0,
    aedId: '',
    nonConformityId: '',
    replacementParts: []
}

export const CostTypes: ItemType[] = [
    {
        value: 'Free', title: 'Free'
    },
    {
        value: 'Guarantee', title: 'Guarantee'
    },
    {
        value: 'Sale', title: 'Sale'
    }
]

export const CorrectiveActionGroupTypes: ItemType[] = [
    {title: "Repair", value: "Repair"},
    {title: "Pm", value: "Pm"},
    {title: "Recall", value: "Recall"},
    {title: "Upgrade", value: "Upgrade"},
    {title: "Training", value: "Training"}
]

export interface NewAedHandle {
    sendRequest: () => void;
}

export interface NewAedProps {
    data: AedServiceType;
    closeModal: () => void;
}

export type UserType = {
    fullName: string;
    id: number;
}

export type NonConformityType = {
    title: string;
    id: string;
}
