import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const organization = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x-organization`, async (req, res, ctx) => {
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
                                id: "x-organization--34feaed8-ad95-4f8f-8892-92e948754eba",
                                modified: "2023-07-31T12:29:50Z",
                                name: "Saderat-1",
                                created: "2023-07-31T12:29:50Z",
                                description: "description",
                                x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                                x_short_id: "org-02-dcec77",
                                x_is_active: true,
                                location_count: 1,
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
    rest.get(`${getBaseUrl()}reporter/v1/details/x-organization--34feaed8-ad95-4f8f-8892-92e948754eba`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            x_source: "sata",
                            modified: "2023-08-19T08:18:44Z",
                            x_labels: [],
                            domain: "_",
                            country: "_",
                            address: "_",
                            x_short_id: "org-02-057c1a",
                            x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                            reference: "_",
                            description: "test",
                            x_is_active: true,
                            x_emails: [],
                            contacts: [
                                "identity--ff6a9565-6a08-42ad-841c-a827fe85f06c",
                                "identity--fe1a9177-42cd-4a03-a8cb-ef7435e7ac09"
                            ],
                            spec_version: "2.1",
                            postal_code: "_",
                            created: "2023-08-19T08:18:44Z",
                            version: "2023-08-19T08:18:44Z",
                            type: "x-organization",
                            id: "x-organization--2ee6859b-b615-4e86-8e93-fac487263303",
                            name: "test01",
                            x_telephones: [
                                "02154223168"
                            ],
                            city: "_"
                        }
                    ,
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
