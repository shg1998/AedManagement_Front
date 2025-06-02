import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const attck = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x--att&ck`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 3,
                        page: 1,
                        size: 3,
                        items: [
                            {
                                modified: "2022-10-24T15:09:07.609Z",
                                name: "Scheduled Task/Job",
                                description: "Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code. On Android and iOS, APIs and libraries exist to facilitate scheduling tasks to execute at a specified date, time, or interval.\n\nOn Android, the `WorkManager` API allows asynchronous tasks to be scheduled with the system. `WorkManager` was introduced to unify task scheduling on Android, using `JobScheduler`, `GcmNetworkManager`, and `AlarmManager` internally. `WorkManager` offers a lot of flexibility for scheduling, including periodically, one time, or constraint-based (e.g. only when the device is charging).(Citation: Android WorkManager)\n\nOn iOS, the `NSBackgroundActivityScheduler` API allows asynchronous tasks to be scheduled with the system. The tasks can be scheduled to be repeating or non-repeating, however, the system chooses when the tasks will be executed. The app can choose the interval for repeating tasks, or the delay between scheduling and execution for one-time tasks.(Citation: Apple NSBackgroundActivityScheduler)",
                                created: "2020-11-04T16:43:31.619Z",
                                x_short_id: "att-02-0b461c",
                                type: "attack-pattern",
                                id: "attack-pattern--00290ac5-551e-44aa-bbd8-c4b913488a6d",
                                mitre_id: "T1603",
                                kill_chain_phases_name: [
                                    "execution",
                                    "persistence"
                                ],
                                x_labels: [
                                    {
                                        name: "fff",
                                        description: null,
                                        importance: 2,
                                        count: 1,
                                        is_automated: false,
                                        assignable: true,
                                        unassignable: true,
                                        assigners: [
                                            {
                                                username: "admin",
                                                first_name: "Leila",
                                                last_name: "Fathi",
                                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                modified: "2022-11-24T15:09:07.609Z",
                                name: "Scheduled test",
                                description: "Adversaries test to facilitate initial or recurring execution of malicious code. On Android and iOS, APIs and libraries exist to facilitate scheduling tasks to execute at a specified date, time, or interval.\n\nOn Android, the `WorkManager` API allows asynchronous tasks to be scheduled with the system. `WorkManager` was introduced to unify task scheduling on Android, using `JobScheduler`, `GcmNetworkManager`, and `AlarmManager` internally. `WorkManager` offers a lot of flexibility for scheduling, including periodically, one time, or constraint-based (e.g. only when the device is charging).(Citation: Android WorkManager)\n\nOn iOS, the `NSBackgroundActivityScheduler` API allows asynchronous tasks to be scheduled with the system. The tasks can be scheduled to be repeating or non-repeating, however, the system chooses when the tasks will be executed. The app can choose the interval for repeating tasks, or the delay between scheduling and execution for one-time tasks.(Citation: Apple NSBackgroundActivityScheduler)",
                                created: "2021-11-04T16:43:31.619Z",
                                x_short_id: "att-02-0b451c",
                                type: "attack-pattern",
                                id: "attack-pattern--00290ac5-551e-44aa-bbd8-c4b913488a7d",
                                mitre_id: "T1604",
                                kill_chain_phases_name: [],
                                x_labels: [
                                    {
                                        name: "fff",
                                        description: null,
                                        importance: 2,
                                        count: 1,
                                        is_automated: false,
                                        assignable: true,
                                        unassignable: true,
                                        assigners: [
                                            {
                                                username: "admin",
                                                first_name: "Leila",
                                                last_name: "Fathi",
                                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                modified: "2022-09-24T15:09:07.609Z",
                                name: "test Task/Job",
                                description: "test may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code. On Android and iOS, APIs and libraries exist to facilitate scheduling tasks to execute at a specified date, time, or interval.\n\nOn Android, the `WorkManager` API allows asynchronous tasks to be scheduled with the system. `WorkManager` was introduced to unify task scheduling on Android, using `JobScheduler`, `GcmNetworkManager`, and `AlarmManager` internally. `WorkManager` offers a lot of flexibility for scheduling, including periodically, one time, or constraint-based (e.g. only when the device is charging).(Citation: Android WorkManager)\n\nOn iOS, the `NSBackgroundActivityScheduler` API allows asynchronous tasks to be scheduled with the system. The tasks can be scheduled to be repeating or non-repeating, however, the system chooses when the tasks will be executed. The app can choose the interval for repeating tasks, or the delay between scheduling and execution for one-time tasks.(Citation: Apple NSBackgroundActivityScheduler)",
                                created: "2022-11-04T16:43:31.619Z",
                                x_short_id: "att-02-0b401c",
                                type: "attack-pattern",
                                id: "attack-pattern--00290ac5-551e-44aa-bbd8-c4b913488a5d",
                                mitre_id: "T1605",
                                kill_chain_phases_name: null,
                                x_labels: [
                                    {
                                        name: "fff",
                                        description: null,
                                        importance: 2,
                                        count: 1,
                                        is_automated: false,
                                        assignable: true,
                                        unassignable: true,
                                        assigners: [
                                            {
                                                username: "admin",
                                                first_name: "Leila",
                                                last_name: "Fathi",
                                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/details/related/attack-pattern--00290ac5-551e-44aa-bbd8-c4b913488a6d`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1, page: 1, size: 1, items: [
                            {
                                id: "intrusion-set--c93fccb1-e8e8-42cf-ae33-2ad1d183913a", relationship_type: "uses", x_direction: "ingoing",
                                x_short_id: "int-02-0d2fef", x_source: "att&ck",
                                name: "Lazarus Group", type: "intrusion-set"
                            },
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
