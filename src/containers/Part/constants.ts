export type PartType = {
    id?: number;
    name: string;
    partNumber: string;
}

export interface NewPartHandle {
    sendRequest: () => void;
}

export const DEFAULT_PART_INFORMATION: PartType = {
    id: 0,
    name: '',
    partNumber: ''
}