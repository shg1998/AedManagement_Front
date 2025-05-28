
export type AedSelfTestDetailsType = {
    algorithmVersion?: string;
    batteryRemain?: string;
    highVoltageBoardVersion?: string;
    internalTestResult?: string;
    motherBoardVersion?: string;
    saeBoardVersion?: string;
    sentTime?: string;
    shockCount?: number;
}

export type AedSelfTestDetailsPropsType = {
    data?: AedSelfTestDetailsType;
}
