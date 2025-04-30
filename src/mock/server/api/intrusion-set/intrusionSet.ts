import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const intrusionSet = [
    rest.get(`${getBaseUrl()}reporter/v1/table/intrusion-set`, async (req, res, ctx) => {
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
                                spec_version: "2.1",
                                type: "intrusion-set",
                                id: "intrusion-set--da1065ce-972c-4605-8755-9cd1074e3b5a",
                                created: "2015-05-15T09:12:16.432Z",
                                version: "2023-09-20T08:35:37Z",
                                modified: "2015-05-15T09:12:16.432Z",
                                name: "APT1",
                                description: "APT1 is a single organization of operators that has conducted a cyber espionage campaign against a broad range of victims since at least 2006.",
                                resource_level: "government",
                                first_seen: "2006-06-01T18:13:15.684Z",
                                primary_motivation: "organizational-gain",
                                aliases: [
                                    "Comment Crew",
                                    "Comment Group",
                                    "Shady Rat"
                                ],
                                x_short_id: "int-02-678e37",
                                x_organization: "x-organization--c4ce4be4-5090-4b56-80aa-07458533fb5b",
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
    rest.get(`${getBaseUrl()}reporter/v1/details/intrusion-set--da1065ce-972c-4605-8755-9cd1074e3b5a`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            spec_version: "2.1",
                            type: "intrusion-set",
                            id: "intrusion-set--da1065ce-972c-4605-8755-9cd1074e3b5a",
                            x_source: "sata",
                            version: "2023-09-20T08:35:37Z",
                            first_seen: "2006-06-01T18:13:15.684Z",
                            x_short_id: "int-02-678e37",
                            x_organization: "x-organization--c4ce4be4-5090-4b56-80aa-07458533fb5b",
                            created: "2015-05-15T09:12:16.432Z",
                            name: "APT1",
                            description: "APT1 is a single organization of operators that has conducted a cyber espionage campaign against a broad range of victims since at least 2006.",
                            aliases: [
                                "Comment Crew",
                                "Comment Group",
                                "Shady Rat"
                            ],
                            modified: "2015-05-15T09:12:16.432Z",
                            resource_level: "government",
                            primary_motivation: "organizational-gain"
                        }
                    ,
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
