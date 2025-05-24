export type NonConformityType = {
    id?: string;
    title?: string;
}

export const DEFAULT_NON_CONFORMITY_INFORMATION: NonConformityType = {
    id: '0',
    title: ''
}

export interface NewNonConformityHandle {
    sendRequest: () => void;
}