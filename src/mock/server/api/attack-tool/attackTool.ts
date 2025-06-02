import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const attackTool = [
    rest.get(`${getBaseUrl()}reporter/v1/table/tool`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 10,
                        filter_fields: [],
                        items: [
                            {
                                description: "malware_sample_description--779",
                                x_organization: "x-organization--c8770f87-4195-4e9e-97c7-d05a59e6d3e7",
                                x_short_id: "too-02-4bd816",
                                version: "2023-07-29T06:44:56Z",
                                aliases: [
                                    "alias--696",
                                    "alias--786",
                                    "alias--527"
                                ],
                                kill_chain_phases: [
                                    {
                                        phase_name: "phase_name--223",
                                        kill_chain_name: "kill_chain_name--890"
                                    },
                                    {
                                        kill_chain_name: "kill_chain_name--460",
                                        phase_name: "phase_name--576"
                                    }
                                ],
                                type: "tool",
                                name: "tool_name--604",
                                tool_version: "19.3.2",
                                spec_version: "2.1",
                                created: "2009-04-15T20:12:39+04:30",
                                id: "tool--fa5e8e56-403c-47d7-a01c-88e7c354d92b",
                                modified: "2009-01-26T01:12:39+03:30",
                                tool_types: [
                                    "exploitation",
                                    "unknown",
                                    "information-gathering",
                                    "remote-access",
                                    "exploitation",
                                    "vulnerability-scanning",
                                    "credential-exploitation"
                                ],
                                x_source: "sata",
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
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/details/tool--fa5e8e56-403c-47d7-a01c-88e7c354d92b`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            created: "2014-02-21T14:12:39+03:30",
                            x_short_id: "too-02-44628c",
                            kill_chain_phases: [
                                {
                                    phase_name: "phase_name--206",
                                    kill_chain_name: "kill_chain_name--863"
                                },
                                {
                                    kill_chain_name: "kill_chain_name--750",
                                    phase_name: "phase_name--287"
                                },
                                {
                                    phase_name: "phase_name--912",
                                    kill_chain_name: "kill_chain_name--422"
                                }
                            ],
                            tool_version: "1.7.3",
                            type: "tool",
                            spec_version: "2.1",
                            version: "2023-07-29T06:44:56Z",
                            description: "malware_sample_description--314",
                            modified: "1956-07-18T11:12:39+03:30",
                            tool_types: [
                                "remote-access",
                                "exploitation",
                                "remote-access"
                            ],
                            x_organization: "x-organization--bef3cc67-77d0-4ac4-9d7a-7873d17435df",
                            aliases: [
                                "alias--422",
                                "alias--727"
                            ],
                            id: "tool--f9d20014-19b9-4ae6-be36-236a8256dad1",
                            name: "tool_name--441",
                            x_source: "sata"
                        }
                    ,
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
