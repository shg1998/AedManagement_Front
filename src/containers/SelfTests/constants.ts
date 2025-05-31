
export type AedSelfTestDetailsType = {
    algorithmVersion?: string;
    batteryRemain?: string;
    highVoltageBoardVersion?: string;
    internalTestResult?: string;
    motherBoardVersion?: string;
    saeBoardVersion?: string;
    sentTime?: string;
    shockCount?: number;
    serialNumber?: string;
    lat?: number;
    long?: number;
    address?: string;
    place?: string;
}

export type AedSelfTestDetailsPropsType = {
    data?: AedSelfTestDetailsType;
}
