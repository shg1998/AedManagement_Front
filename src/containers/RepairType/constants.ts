export type RepairTypeType = {
    id?: string;
    title?: string;
}

export const DEFAULT_REPAIR_TYPE_INFORMATION: RepairTypeType = {
    id: '0',
    title: ''
}

export interface NewRepairTypeHandle {
    sendRequest: () => void;
}