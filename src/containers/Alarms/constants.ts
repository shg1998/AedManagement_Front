
export const alarmTypeOptions = [
    {label: "🔌 AED Disconnected", value: "AedDisconnected"},
    {label: "❌ SelfTest Failed", value: "AedSelfTestFail"},
    {label: "🔋 AED Battery", value: "AedBattery"}
];

export type AlarmDetailsProps = {
    alarmId: string;
}