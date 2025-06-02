import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const campaign = [
    rest.get(`${getBaseUrl()}reporter/v1/table/campaign`, async (req, res, ctx) => {
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
                                version: "2023-09-26T06:43:09Z",
                                x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                                created: "2023-09-26T06:43:09Z",
                                modified: "2023-09-26T06:43:09Z",
                                spec_version: "2.1",
                                name: "test",
                                description: "test",
                                last_seen: "2023-09-26T06:45:25.400Z",
                                aliases: [
                                    "test2"
                                ],
                                objective: "test",
                                type: "campaign",
                                id: "campaign--98d1081f-e612-4a3b-9de1-9888ea2b013a",
                                first_seen: "2023-09-24T06:44:00.000Z",
                                x_short_id: "cam-02-3a067f",
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
    rest.get(`${getBaseUrl()}reporter/v1/details/campaign--98d1081f-e612-4a3b-9de1-9888ea2b013a`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            version: "2023-09-26T06:43:09Z",
                            x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                            created: "2023-09-26T06:43:09Z",
                            modified: "2023-09-26T06:43:09Z",
                            spec_version: "2.1",
                            name: "test",
                            description: "test",
                            last_seen: "2023-09-26T06:45:25.400Z",
                            aliases: [
                                "test2"
                            ],
                            objective: "test",
                            type: "campaign",
                            id: "campaign--98d1081f-e612-4a3b-9de1-9888ea2b013a",
                            first_seen: "2023-09-24T06:44:00.000Z",
                            x_short_id: "cam-02-3a067f",
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
