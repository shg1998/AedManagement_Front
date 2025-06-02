import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const attackPattern = [
    rest.get(`${getBaseUrl()}reporter/v1/table/attack-pattern`, async (req, res, ctx) => {
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
                            type: "attack-pattern",
                            created: "2014-10-31T15:52:13.126Z",
                            external_references: [
                                {
                                    source_name: "capec",
                                    external_id: "CAPEC-98"
                                }
                            ],
                            version: "2023-08-12T05:33:14Z",
                            spec_version: "2.1",
                            id: "attack-pattern--d7b066aa-4091-4276-a142-29d5d81c3484",
                            created_by_ref: "identity--f690c992-8e7d-4b9a-9303-3312616c0220",
                            modified: "2014-10-31T15:52:13.126Z",
                            name: "Phishing",
                            x_short_id: "att-02-209135",
                            x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
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
    rest.get(`${getBaseUrl()}reporter/v1/details/attack-pattern--d7b066aa-4091-4276-a142-29d5d81c3484`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            spec_version: "2.1",
                            type: "attack-pattern",
                            x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                            x_source: "sata",
                            description: "test1",
                            x_short_id: "att-02-18b41a",
                            created: "2023-09-17T12:27:16.738Z",
                            modified: "2023-09-17T12:27:16.738Z",
                            x_pattern_abstraction_level: "Meta",
                            version: "2023-09-17T12:25:53Z",
                            name: "test1",
                            kill_chain_phases: [
                                {
                                    phase_name: "Reconnaissance",
                                    description: "test1",
                                    kill_chain_name: "test1"
                                }
                            ],
                            x_consequences_attack_motivation: [
                                "test1"
                            ],
                            id: "attack-pattern--a258d0a1-67ab-49df-a0fb-1cc3661534b2",
                            aliases: [
                                "test1"
                            ],
                            x_methods_of_attack: [
                                "test1"
                            ]
                        }
                    ,
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
